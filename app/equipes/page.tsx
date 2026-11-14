
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

type Status =
  | "Pendente"
  | "Em Execução"
  | "Concluída"
  | "Cancelada";

type Prioridade = "Baixa" | "Média" | "Alta" | "Crítica";

type Equipe =
  | "Manutenção Elétrica"
  | "Refrigeração"
  | "Limpeza"
  | "Predial";

type Atividade = {
  id: string;
  titulo: string;
  equipe: Equipe;
  prioridade: Prioridade;
  prazo: string;
  status: Status;
  observacoes: string;
  dataSolicitacao: string;
  alterado: boolean;
};

const STORAGE_KEY = "capim_gestao_atividades_v8";

const equipes: Equipe[] = [
  "Manutenção Elétrica",
  "Refrigeração",
  "Limpeza",
  "Predial",
];

const prioridades: Prioridade[] = [
  "Baixa",
  "Média",
  "Alta",
  "Crítica",
];

const statusOpcoes: Status[] = [
  "Pendente",
  "Em Execução",
  "Concluída",
  "Cancelada",
];

const iniciais: Atividade[] = [
  {
    id: "OS-001",
    titulo: "Inspeção de pressão e troca de filtro do Chiller 02",
    equipe: "Refrigeração",
    prioridade: "Alta",
    prazo: "2026-11-14T14:00",
    status: "Em Execução",
    observacoes: "Casa de máquinas - Cobertura Sul",
    dataSolicitacao: "2026-11-10T09:30",
    alterado: false,
  },
  {
    id: "OS-002",
    titulo: "Troca de reatores LED no Corredor Norte (Piso L2)",
    equipe: "Manutenção Elétrica",
    prioridade: "Média",
    prazo: "2026-11-14T18:30",
    status: "Pendente",
    observacoes: "Isolar área durante uso de escada",
    dataSolicitacao: "2026-11-11T10:15",
    alterado: false,
  },
  {
    id: "OS-003",
    titulo:
      "Higienização e secagem após reparo hidráulico - Sanitário L1",
    equipe: "Limpeza",
    prioridade: "Alta",
    prazo: "2026-11-13T21:00",
    status: "Concluída",
    observacoes: "Sinalizar piso molhado",
    dataSolicitacao: "2026-11-12T14:20",
    alterado: false,
  },
  {
    id: "OS-004",
    titulo:
      "Reassentamento de porcelanato próximo à Praça de Alimentação",
    equipe: "Predial",
    prioridade: "Crítica",
    prazo: "2026-11-14T08:00",
    status: "Pendente",
    observacoes: "Executar antes da abertura ao público",
    dataSolicitacao: "2026-11-13T08:00",
    alterado: false,
  },
];

function formatarPrazo(data: string) {
  if (!data) return "—";

  const valor = new Date(data);

  return Number.isNaN(valor.getTime())
    ? data
    : valor.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function numeroOS(id: string) {
  return Number(id.match(/\d+/)?.[0] ?? 0);
}

export default function EquipesPage() {
  // CORREÇÃO: horário obtido após a montagem da página.
  const [agora, setAgora] = useState<number | null>(null);

  const [atividades, setAtividades] =
    useState<Atividade[]>(iniciais);

  const [carregado, setCarregado] = useState(false);
  const [modal, setModal] = useState(false);

  const [filtroEquipe, setFiltroEquipe] = useState("Todas");
  const [filtroPrioridade, setFiltroPrioridade] =
    useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const [titulo, setTitulo] = useState("");
  const [equipe, setEquipe] = useState<Equipe | "">("");
  const [prioridade, setPrioridade] =
    useState<Prioridade>("Média");
  const [prazo, setPrazo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // CORREÇÃO DO ERRO DO NEXT.JS
  useEffect(() => {
    setAgora(Date.now());
  }, []);

  // Recupera as atividades salvas no navegador.
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);

      if (salvo) {
        const dados: unknown = JSON.parse(salvo);

        if (Array.isArray(dados)) {
          setAtividades(dados as Atividade[]);
        }
      }
    } catch {
      // Mantém as atividades de exemplo.
    }

    setCarregado(true);
  }, []);

  // Salva as alterações no navegador.
  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(atividades)
      );
    }
  }, [atividades, carregado]);

  // Aplica os filtros.
  const filtradas = useMemo(
    () =>
      atividades
        .filter(
          (a) =>
            (filtroEquipe === "Todas" ||
              a.equipe === filtroEquipe) &&
            (filtroPrioridade === "Todas" ||
              a.prioridade === filtroPrioridade) &&
            (filtroStatus === "Todos" ||
              a.status === filtroStatus)
        )
        .sort(
          (a, b) => numeroOS(a.id) - numeroOS(b.id)
        ),
    [
      atividades,
      filtroEquipe,
      filtroPrioridade,
      filtroStatus,
    ]
  );

  // Indicadores da página.
  const kpis = [
    {
      nome: "Total de Ordens de Serviço",
      total: atividades.length,
    },
    ...statusOpcoes.map((s) => ({
      nome:
        s === "Em Execução"
          ? "Em Execução"
          : s === "Concluída"
            ? "Concluídas"
            : s === "Cancelada"
              ? "Canceladas"
              : "Pendentes",
      total: atividades.filter(
        (a) => a.status === s
      ).length,
    })),
  ];

  function alterarStatus(id: string, status: Status) {
    setAtividades((lista) =>
      lista.map((a) =>
        a.id === id
          ? { ...a, status, alterado: true }
          : a
      )
    );
  }

  function criarOS(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!titulo.trim() || !equipe || !prazo) {
      return;
    }

    const proximo =
      Math.max(
        0,
        ...atividades.map((a) => numeroOS(a.id))
      ) + 1;

    const agoraLocal = new Date();

    const dataLocal = new Date(
      agoraLocal.getTime() -
        agoraLocal.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

    setAtividades((lista) => [
      ...lista,
      {
        id: `OS-${String(proximo).padStart(3, "0")}`,
        titulo: titulo.trim(),
        equipe,
        prioridade,
        prazo,
        status: "Pendente",
        observacoes: observacoes.trim(),
        dataSolicitacao: dataLocal,
        alterado: false,
      },
    ]);

    setAgora(Date.now());
    setModal(false);
    setTitulo("");
    setEquipe("");
    setPrioridade("Média");
    setPrazo("");
    setObservacoes("");
  }

  return (
    <main className="equipes-page">
      <div className="equipes-wrap">
        <header className="equipes-heading">
          <div>
            <h1>Equipes e Atividades Operacionais</h1>

            <p>
              Distribuição de ordens de serviço,
              atribuição de responsabilidades e controle
              de execução.
            </p>
          </div>

          <button
            type="button"
            className="eq-primary"
            onClick={() => setModal(true)}
          >
            + Nova Ordem de Serviço
          </button>
        </header>

        {/* INDICADORES */}

        <section
          className="eq-kpis"
          aria-label="Resumo de atividades"
        >
          {kpis.map((k) => (
            <article
              className="eq-kpi"
              key={k.nome}
            >
              <span>{k.nome}</span>
              <strong>{k.total}</strong>
            </article>
          ))}
        </section>

        {/* QUADRO DE ATIVIDADES */}

        <section className="eq-panel">
          <div className="eq-filters">
            <h2>Quadro de Ordens de Serviço</h2>

            <div className="eq-filter-controls">
              <select
                aria-label="Filtrar por equipe"
                value={filtroEquipe}
                onChange={(e) =>
                  setFiltroEquipe(e.target.value)
                }
              >
                <option value="Todas">
                  Todas as Equipes
                </option>

                {equipes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filtrar por prioridade"
                value={filtroPrioridade}
                onChange={(e) =>
                  setFiltroPrioridade(e.target.value)
                }
              >
                <option value="Todas">
                  Todas as Urgências
                </option>

                {prioridades.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filtrar por status"
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(e.target.value)
                }
              >
                <option value="Todos">
                  Todos os Status
                </option>

                {statusOpcoes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="eq-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    OS / Descrição da Atividade
                  </th>
                  <th>Equipe Responsável</th>
                  <th>Prioridade</th>
                  <th>Prazo Limite</th>
                  <th>Status (Andamento)</th>
                </tr>
              </thead>

              <tbody>
                {filtradas.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="eq-empty"
                    >
                      Nenhuma ordem de serviço
                      encontrada para os filtros
                      selecionados.
                    </td>
                  </tr>
                )}

                {filtradas.map((a) => {
                  // CORREÇÃO: não utiliza new Date()
                  // durante a renderização.
                  const atrasada =
                    agora !== null &&
                    a.status !== "Cancelada" &&
                    a.status !== "Concluída" &&
                    new Date(a.prazo).getTime() <
                      agora;

                  return (
                    <tr
                      key={a.id}
                      className={
                        a.status === "Cancelada"
                          ? "eq-cancelada"
                          : ""
                      }
                    >
                      <td>
                        <strong>{a.id}</strong>
                        {" — "}
                        {a.titulo}

                        <small>
                          Solicitado em:{" "}
                          {formatarPrazo(
                            a.dataSolicitacao
                          )}
                        </small>

                        {a.observacoes && (
                          <small>
                            {a.observacoes}
                          </small>
                        )}
                      </td>

                      <td>
                        <span className="eq-team">
                          {a.equipe}
                        </span>
                      </td>

                      <td>{a.prioridade}</td>

                      <td
                        className={
                          atrasada
                            ? "eq-atrasada"
                            : ""
                        }
                      >
                        {formatarPrazo(a.prazo)}

                        {atrasada && (
                          <small>
                            Prazo excedido
                          </small>
                        )}
                      </td>

                      <td>
                        <select
                          className={`eq-status eq-${a.status.replaceAll(" ", "")} ${
                            a.alterado
                              ? "eq-alterado"
                              : ""
                          }`}
                          aria-label={`Alterar status da ordem ${a.id}`}
                          value={a.status}
                          onChange={(e) =>
                            alterarStatus(
                              a.id,
                              e.target.value as Status
                            )
                          }
                        >
                          {statusOpcoes.map((s) => (
                            <option
                              key={s}
                              value={s}
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* JANELA DE CADASTRO */}

      {modal && (
        <div
          className="eq-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModal(false);
            }
          }}
        >
          <section
            className="eq-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eq-modal-title"
          >
            <div className="eq-modal-header">
              <h2 id="eq-modal-title">
                Criar Nova Ordem de Serviço
              </h2>

              <button
                type="button"
                aria-label="Fechar janela"
                onClick={() =>
                  setModal(false)
                }
              >
                ×
              </button>
            </div>

            <form
              onSubmit={criarOS}
              className="eq-form"
            >
              <label>
                Descrição da Atividade /
                Ordem de Serviço *

                <input
                  required
                  value={titulo}
                  onChange={(e) =>
                    setTitulo(e.target.value)
                  }
                  placeholder="Ex.: Substituir disjuntor no Piso L2"
                />
              </label>

              <label>
                Equipe Responsável *

                <select
                  required
                  value={equipe}
                  onChange={(e) =>
                    setEquipe(
                      e.target.value as Equipe
                    )
                  }
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecione a equipe...
                  </option>

                  {equipes.map((v) => (
                    <option
                      key={v}
                      value={v}
                    >
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <div className="eq-form-row">
                <label>
                  Prioridade *

                  <select
                    value={prioridade}
                    onChange={(e) =>
                      setPrioridade(
                        e.target.value as Prioridade
                      )
                    }
                  >
                    {prioridades.map((v) => (
                      <option
                        key={v}
                        value={v}
                      >
                        {v}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Prazo Limite *

                  <input
                    required
                    type="datetime-local"
                    value={prazo}
                    onChange={(e) =>
                      setPrazo(e.target.value)
                    }
                  />
                </label>
              </div>

              <label>
                Instruções Operacionais

                <textarea
                  rows={3}
                  value={observacoes}
                  onChange={(e) =>
                    setObservacoes(
                      e.target.value
                    )
                  }
                  placeholder="Local exato, EPIs necessários ou detalhes técnicos..."
                />
              </label>

              <div className="eq-modal-footer">
                <button
                  type="button"
                  className="eq-secondary"
                  onClick={() =>
                    setModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  className="eq-primary"
                  type="submit"
                >
                  Atribuir Ordem de Serviço
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* ESTILOS DA PÁGINA */}

      <style jsx global>{`
        .equipes-page {
          min-height: 100vh;
          background: #fdfbf7;
          color: #2c251e;
          padding: 40px 24px 80px;
          font-family: Arial, sans-serif;
        }

        .equipes-page * {
          box-sizing: border-box;
        }

        .equipes-wrap {
          max-width: 1280px;
          margin: 0 auto;
        }

        .equipes-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .equipes-heading h1 {
          font-size: clamp(23px, 3vw, 32px);
          color: #78581e;
          margin: 0 0 9px;
        }

        .equipes-heading p {
          color: #73675c;
          margin: 0;
        }

        .eq-primary {
          border: 0;
          border-radius: 9px;
          background: #96712f;
          color: white;
          font-weight: 700;
          padding: 13px 19px;
          cursor: pointer;
        }

        .eq-primary:hover {
          background: #78581e;
        }

        .eq-kpis {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 28px;
        }

        .eq-kpi {
          background: #fff;
          border: 1px solid #e6dfd1;
          border-radius: 12px;
          padding: 21px 17px;
          box-shadow: 0 3px 12px #37250b0a;
        }

        .eq-kpi span {
          display: block;
          color: #73675c;
          font-size: 13px;
          min-height: 38px;
        }

        .eq-kpi strong {
          display: block;
          font-size: 32px;
          color: #78581e;
          margin-top: 9px;
        }

        .eq-panel {
          background: #fff;
          border: 1px solid #e6dfd1;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 18px #37250b0a;
        }

        .eq-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          flex-wrap: wrap;
          padding: 22px;
          border-bottom: 1px solid #e6dfd1;
        }

        .eq-filters h2 {
          font-size: 19px;
          margin: 0;
        }

        .eq-filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .eq-filter-controls select,
        .eq-form input,
        .eq-form select,
        .eq-form textarea {
          border: 1px solid #d8cdbb;
          border-radius: 8px;
          background: #fff;
          color: #2c251e;
          padding: 10px 12px;
          font: inherit;
        }

        .eq-table-scroll {
          overflow-x: auto;
        }

        .eq-panel table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
          font-size: 14px;
        }

        .eq-panel th {
          background: #f7f3eb;
          color: #65512f;
          text-align: left;
          font-size: 12px;
          padding: 17px;
        }

        .eq-panel td {
          padding: 18px 17px;
          border-top: 1px solid #eee8df;
          vertical-align: middle;
        }

        .eq-panel td:first-child {
          min-width: 290px;
        }

        .eq-panel td small {
          display: block;
          color: #73675c;
          font-size: 12px;
          margin-top: 6px;
        }

        .eq-team {
          background: #f7f3eb;
          border: 1px solid #e6dfd1;
          border-radius: 7px;
          padding: 7px 9px;
          display: inline-block;
          white-space: nowrap;
        }

        .eq-panel td.eq-atrasada,
        .eq-panel td.eq-atrasada small {
          color: #b91c1c;
        }

        .eq-cancelada {
          opacity: 0.68;
        }

        .eq-status {
          border: 1px solid transparent;
          border-radius: 7px;
          padding: 9px 8px;
          font-weight: 600;
          max-width: 155px;
          cursor: pointer;
        }

        .eq-Pendente {
          background: #fef3c7;
          color: #92400e;
        }

        .eq-EmExecução {
          background: #e0f2fe;
          color: #075985;
        }

        .eq-Concluída {
          background: #dcfce7;
          color: #166534;
        }

        .eq-Cancelada {
          background: #fee2e2;
          color: #991b1b;
        }

        .eq-alterado {
          outline: 2px solid #b4903d;
        }

        .eq-empty {
          text-align: center;
          padding: 35px !important;
          color: #73675c;
        }

        .eq-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: grid;
          place-items: center;
          background: #1f1a148c;
          padding: 18px;
        }

        .eq-modal {
          width: min(100%, 600px);
          max-height: 90vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 20px 80px #0005;
        }

        .eq-modal-header {
          padding: 21px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e6dfd1;
        }

        .eq-modal-header h2 {
          font-size: 21px;
          margin: 0;
        }

        .eq-modal-header button {
          background: transparent;
          border: 0;
          font-size: 30px;
          cursor: pointer;
          color: #73675c;
        }

        .eq-form {
          padding: 24px;
          display: grid;
          gap: 19px;
        }

        .eq-form label {
          display: grid;
          gap: 7px;
          font-size: 13px;
          font-weight: 700;
        }

        .eq-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .eq-form input,
        .eq-form select,
        .eq-form textarea {
          width: 100%;
          font-weight: 400;
        }

        .eq-modal-footer {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }

        .eq-secondary {
          background: #f7f3eb;
          border: 1px solid #e6dfd1;
          color: #5a4b34;
          border-radius: 9px;
          padding: 12px 18px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .eq-kpis {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .equipes-page {
            padding: 25px 14px;
          }

          .eq-kpis {
            grid-template-columns: 1fr 1fr;
          }

          .eq-form-row {
            grid-template-columns: 1fr;
          }

          .eq-filter-controls select {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
