
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "Pendente" | "Em Execução" | "Concluída" | "Cancelada";
type Prioridade = "Baixa" | "Média" | "Alta" | "Crítica";

type Atividade = {
  id: string;
  titulo: string;
  equipe: string;
  responsavel: string;
  setor: string;
  prioridade: Prioridade;
  prazo: string;
  status: Status;
  observacoes: string;
  dataSolicitacao: string;
  alterado: boolean;
};

const STORAGE_KEY = "capim_gestao_equipes_unificado_v1";

const equipes = [
  "Manutenção Elétrica",
  "Refrigeração",
  "Climatização",
  "Hidráulica",
  "Limpeza",
  "Limpeza e Conservação",
  "Predial",
  "Segurança Patrimonial",
];

const setores = [
  "Praça de Alimentação",
  "Corredor Norte",
  "Corredor Sul",
  "Subestação Elétrica",
  "Casa de Máquinas",
  "Estacionamento",
  "Sanitários",
  "Cobertura Sul",
  "Outros",
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

const atividadesIniciais: Atividade[] = [
  {
    id: "OS-001",
    titulo: "Inspeção de pressão e troca de filtro do Chiller 02",
    equipe: "Refrigeração",
    responsavel: "Juliana Costa",
    setor: "Casa de Máquinas",
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
    responsavel: "Marcos Silva",
    setor: "Corredor Norte",
    prioridade: "Média",
    prazo: "2026-11-14T18:30",
    status: "Pendente",
    observacoes: "Isolar área durante uso de escada",
    dataSolicitacao: "2026-11-11T10:15",
    alterado: false,
  },
  {
    id: "OS-003",
    titulo: "Higienização após reparo hidráulico - Sanitário L1",
    equipe: "Limpeza",
    responsavel: "Ana Souza",
    setor: "Sanitários",
    prioridade: "Alta",
    prazo: "2026-11-13T21:00",
    status: "Concluída",
    observacoes: "Sinalizar piso molhado",
    dataSolicitacao: "2026-11-12T14:20",
    alterado: false,
  },
  {
    id: "OS-004",
    titulo: "Reassentamento de porcelanato próximo à Praça de Alimentação",
    equipe: "Predial",
    responsavel: "Equipe Predial",
    setor: "Praça de Alimentação",
    prioridade: "Crítica",
    prazo: "2026-11-14T08:00",
    status: "Pendente",
    observacoes: "Executar antes da abertura ao público",
    dataSolicitacao: "2026-11-13T08:00",
    alterado: false,
  },
  {
    id: "OS-201",
    titulo: "Revisão preventiva do quadro elétrico central",
    equipe: "Manutenção Elétrica",
    responsavel: "Marcos Silva",
    setor: "Subestação Elétrica",
    prioridade: "Alta",
    prazo: "2026-11-14T14:00",
    status: "Em Execução",
    observacoes: "Atividade preventiva",
    dataSolicitacao: "2026-11-14T08:00",
    alterado: false,
  },
  {
    id: "OS-202",
    titulo: "Higienização intensiva pós-horário de almoço",
    equipe: "Limpeza e Conservação",
    responsavel: "Ana Souza",
    setor: "Praça de Alimentação",
    prioridade: "Média",
    prazo: "2026-11-14T15:30",
    status: "Pendente",
    observacoes: "Reforçar equipe de limpeza",
    dataSolicitacao: "2026-11-14T09:00",
    alterado: false,
  },
  {
    id: "OS-203",
    titulo: "Calibração de sensores de temperatura do Chiller 02",
    equipe: "Climatização",
    responsavel: "Juliana Costa",
    setor: "Casa de Máquinas",
    prioridade: "Alta",
    prazo: "2026-11-14T11:00",
    status: "Concluída",
    observacoes: "Verificação dos sensores",
    dataSolicitacao: "2026-11-13T10:00",
    alterado: false,
  },
  {
    id: "OS-204",
    titulo: "Inspeção de hidrantes e extintores do piso térreo",
    equipe: "Segurança Patrimonial",
    responsavel: "Carlos Oliveira",
    setor: "Corredor Norte",
    prioridade: "Alta",
    prazo: "2026-11-15T09:00",
    status: "Pendente",
    observacoes: "Inspeção preventiva",
    dataSolicitacao: "2026-11-14T09:30",
    alterado: false,
  },
];

function formatarData(data: string) {
  if (!data) return "—";

  const valor = new Date(data);

  if (Number.isNaN(valor.getTime())) {
    return data;
  }

  return valor.toLocaleString("pt-BR", {
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

function corStatus(status: Status) {
  switch (status) {
    case "Pendente":
      return "pendente";
    case "Em Execução":
      return "execucao";
    case "Concluída":
      return "concluida";
    case "Cancelada":
      return "cancelada";
  }
}

export default function EquipesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>(
    atividadesIniciais
  );

  const [carregado, setCarregado] = useState(false);
  const [agora, setAgora] = useState<number | null>(null);

  const [filtroEquipe, setFiltroEquipe] = useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas");

  const [titulo, setTitulo] = useState("");
  const [equipe, setEquipe] = useState(equipes[0]);
  const [responsavel, setResponsavel] = useState("");
  const [setor, setSetor] = useState(setores[0]);
  const [prioridade, setPrioridade] = useState<Prioridade>("Média");
  const [prazo, setPrazo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    setAgora(Date.now());

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

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(atividades)
      );
    }
  }, [atividades, carregado]);

  const filtradas = useMemo(() => {
    return atividades
      .filter((atividade) => {
        const equipeValida =
          filtroEquipe === "Todas" ||
          atividade.equipe === filtroEquipe;

        const statusValido =
          filtroStatus === "Todos" ||
          atividade.status === filtroStatus;

        const prioridadeValida =
          filtroPrioridade === "Todas" ||
          atividade.prioridade === filtroPrioridade;

        return equipeValida && statusValido && prioridadeValida;
      })
      .sort((a, b) => numeroOS(a.id) - numeroOS(b.id));
  }, [
    atividades,
    filtroEquipe,
    filtroStatus,
    filtroPrioridade,
  ]);

  const totalPendentes = atividades.filter(
    (a) => a.status === "Pendente"
  ).length;

  const totalExecucao = atividades.filter(
    (a) => a.status === "Em Execução"
  ).length;

  const totalConcluidas = atividades.filter(
    (a) => a.status === "Concluída"
  ).length;

  const totalCanceladas = atividades.filter(
    (a) => a.status === "Cancelada"
  ).length;

  function criarAtividade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !titulo.trim() ||
      !responsavel.trim() ||
      !prazo
    ) {
      return;
    }

    const proximo =
      Math.max(
        0,
        ...atividades.map((a) => numeroOS(a.id))
      ) + 1;

    const dataAtual = new Date();

    const dataLocal = new Date(
      dataAtual.getTime() -
        dataAtual.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

    const nova: Atividade = {
      id: `OS-${String(proximo).padStart(3, "0")}`,
      titulo: titulo.trim(),
      equipe,
      responsavel: responsavel.trim(),
      setor,
      prioridade,
      prazo,
      status: "Pendente",
      observacoes: observacoes.trim(),
      dataSolicitacao: dataLocal,
      alterado: false,
    };

    setAtividades((lista) => [...lista, nova]);

    setAgora(Date.now());
    setTitulo("");
    setResponsavel("");
    setPrazo("");
    setObservacoes("");
    setPrioridade("Média");
  }

  function alterarStatus(id: string, novoStatus: Status) {
    setAtividades((lista) =>
      lista.map((atividade) =>
        atividade.id === id
          ? {
              ...atividade,
              status: novoStatus,
              alterado: true,
            }
          : atividade
      )
    );
  }

  function avancarStatus(id: string) {
    const ordem: Status[] = [
      "Pendente",
      "Em Execução",
      "Concluída",
      "Cancelada",
    ];

    setAtividades((lista) =>
      lista.map((atividade) => {
        if (atividade.id !== id) {
          return atividade;
        }

        const indice = ordem.indexOf(atividade.status);
        const proximo = ordem[(indice + 1) % ordem.length];

        return {
          ...atividade,
          status: proximo,
          alterado: true,
        };
      })
    );
  }

  return (
    <main className="equipes-page">
      <div className="equipes-container">
        <header className="equipes-header">
          <div>
            <span className="equipes-subtitulo">
              CAPIM GESTÃO · OPERAÇÕES
            </span>

            <h1>Equipes e Atividades Operacionais</h1>

            <p>
              Distribuição de ordens de serviço,
              atribuição de responsáveis e acompanhamento
              das atividades do shopping.
            </p>
          </div>

          <Link href="/painel" className="botao-voltar">
            ← Voltar ao Painel
          </Link>
        </header>

        <section className="indicadores">
          <article className="indicador">
            <span>Total de Ordens</span>
            <strong>{atividades.length}</strong>
          </article>

          <article className="indicador">
            <span>Pendentes</span>
            <strong className="texto-amarelo">
              {totalPendentes}
            </strong>
          </article>

          <article className="indicador">
            <span>Em Execução</span>
            <strong className="texto-azul">
              {totalExecucao}
            </strong>
          </article>

          <article className="indicador">
            <span>Concluídas</span>
            <strong className="texto-verde">
              {totalConcluidas}
            </strong>
          </article>

          <article className="indicador">
            <span>Canceladas</span>
            <strong className="texto-vermelho">
              {totalCanceladas}
            </strong>
          </article>
        </section>

        <div className="conteudo-equipes">
          <section className="painel-formulario">
            <h2>Atribuir Nova Atividade</h2>

            <p className="descricao-formulario">
              Cadastre uma ordem de serviço e defina
              quem será responsável pela execução.
            </p>

            <form onSubmit={criarAtividade}>
              <label>
                Descrição da Ordem de Serviço *

                <input
                  required
                  type="text"
                  placeholder="Ex.: Manutenção na escada rolante"
                  value={titulo}
                  onChange={(e) =>
                    setTitulo(e.target.value)
                  }
                />
              </label>

              <label>
                Equipe Responsável *

                <select
                  value={equipe}
                  onChange={(e) =>
                    setEquipe(e.target.value)
                  }
                >
                  {equipes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Colaborador Designado *

                <input
                  required
                  type="text"
                  placeholder="Nome do técnico ou operador"
                  value={responsavel}
                  onChange={(e) =>
                    setResponsavel(e.target.value)
                  }
                />
              </label>

              <div className="linha-formulario">
                <label>
                  Setor

                  <select
                    value={setor}
                    onChange={(e) =>
                      setSetor(e.target.value)
                    }
                  >
                    {setores.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Prioridade

                  <select
                    value={prioridade}
                    onChange={(e) =>
                      setPrioridade(
                        e.target.value as Prioridade
                      )
                    }
                  >
                    {prioridades.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

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

              <label>
                Instruções Operacionais

                <textarea
                  rows={3}
                  placeholder="Local exato, equipamentos ou observações..."
                  value={observacoes}
                  onChange={(e) =>
                    setObservacoes(e.target.value)
                  }
                />
              </label>

              <button type="submit" className="botao-criar">
                + Criar Ordem de Serviço
              </button>
            </form>
          </section>

          <section className="painel-atividades">
            <div className="atividades-cabecalho">
              <div>
                <h2>Ordens de Serviço</h2>
                <p>
                  {filtradas.length} atividade(s)
                  encontrada(s)
                </p>
              </div>
            </div>

            <div className="filtros">
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

                {equipes.map((item) => (
                  <option key={item} value={item}>
                    {item}
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
                  Todas as Prioridades
                </option>

                {prioridades.map((item) => (
                  <option key={item} value={item}>
                    {item}
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

                {statusOpcoes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="lista-atividades">
              {filtradas.length === 0 && (
                <p className="mensagem-vazia">
                  Nenhuma ordem de serviço encontrada
                  para os filtros selecionados.
                </p>
              )}

              {filtradas.map((atividade) => {
                const atrasada =
                  agora !== null &&
                  atividade.status !== "Concluída" &&
                  atividade.status !== "Cancelada" &&
                  new Date(atividade.prazo).getTime() <
                    agora;

                return (
                  <article
                    key={atividade.id}
                    className={`cartao-atividade ${
                      atividade.status === "Cancelada"
                        ? "atividade-cancelada"
                        : ""
                    }`}
                  >
                    <div className="atividade-topo">
                      <span className="codigo-os">
                        {atividade.id}
                      </span>

                      <span
                        className={`badge-status ${corStatus(
                          atividade.status
                        )}`}
                      >
                        {atividade.status}
                      </span>
                    </div>

                    <h3>{atividade.titulo}</h3>

                    <div className="atividade-informacoes">
                      <p>
                        <strong>Equipe:</strong>{" "}
                        {atividade.equipe}
                      </p>

                      <p>
                        <strong>Responsável:</strong>{" "}
                        {atividade.responsavel || "Não informado"}
                      </p>

                      <p>
                        <strong>Setor:</strong>{" "}
                        {atividade.setor || "Não informado"}
                      </p>

                      <p>
                        <strong>Prioridade:</strong>{" "}
                        <span
                          className={
                            atividade.prioridade === "Crítica"
                              ? "prioridade-critica"
                              : ""
                          }
                        >
                          {atividade.prioridade}
                        </span>
                      </p>

                      <p>
                        <strong>Prazo:</strong>{" "}
                        <span
                          className={
                            atrasada ? "prazo-atrasado" : ""
                          }
                        >
                          {formatarData(atividade.prazo)}
                        </span>
                      </p>

                      {atrasada && (
                        <p className="prazo-atrasado">
                          Prazo excedido
                        </p>
                      )}

                      {atividade.observacoes && (
                        <p>
                          <strong>Observações:</strong>{" "}
                          {atividade.observacoes}
                        </p>
                      )}

                      <p className="data-solicitacao">
                        Solicitado em:{" "}
                        {formatarData(
                          atividade.dataSolicitacao
                        )}
                      </p>
                    </div>

                    <div className="atividade-acoes">
                      <label>
                        Alterar status

                        <select
                          value={atividade.status}
                          onChange={(e) =>
                            alterarStatus(
                              atividade.id,
                              e.target.value as Status
                            )
                          }
                        >
                          {statusOpcoes.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          avancarStatus(atividade.id)
                        }
                      >
                        Atualizar status ↻
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .equipes-page {
          min-height: 100vh;
          background: #f8f5ee;
          color: #292114;
          padding: 35px 5% 80px;
          font-family: "Segoe UI", Arial, sans-serif;
        }

        .equipes-page * {
          box-sizing: border-box;
        }

        .equipes-container {
          max-width: 1450px;
          margin: 0 auto;
        }

        .equipes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding-bottom: 25px;
          border-bottom: 1px solid #e2d9c8;
        }

        .equipes-subtitulo {
          color: #b4903d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .equipes-header h1 {
          margin: 10px 0;
          font-family: Georgia, serif;
          font-size: clamp(25px, 3vw, 34px);
          color: #78581e;
        }

        .equipes-header p {
          margin: 0;
          font-size: 14px;
          color: #6b5e4c;
          line-height: 1.6;
        }

        .botao-voltar {
          display: inline-block;
          background: #fff;
          border: 1px solid #e2d9c8;
          border-radius: 30px;
          padding: 12px 18px;
          color: #78581e;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        .botao-voltar:hover {
          background: #f3ead6;
        }

        .indicadores {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 15px;
          margin: 30px 0;
        }

        .indicador {
          background: #fff;
          border: 1px solid #e2d9c8;
          border-radius: 15px;
          padding: 22px;
          box-shadow: 0 4px 15px #382a100a;
        }

        .indicador span {
          display: block;
          color: #6b5e4c;
          font-size: 13px;
          font-weight: 600;
          min-height: 35px;
        }

        .indicador strong {
          display: block;
          margin-top: 8px;
          font-size: 32px;
          color: #78581e;
        }

        .indicador .texto-amarelo {
          color: #92400e;
        }

        .indicador .texto-azul {
          color: #075985;
        }

        .indicador .texto-verde {
          color: #166534;
        }

        .indicador .texto-vermelho {
          color: #991b1b;
        }

        .conteudo-equipes {
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(0, 1.8fr);
          align-items: start;
          gap: 25px;
        }

        .painel-formulario,
        .painel-atividades {
          background: #fff;
          border: 1px solid #e2d9c8;
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 8px 25px #44310f0f;
          min-width: 0;
        }

        .painel-formulario h2,
        .painel-atividades h2 {
          margin: 0 0 10px;
          color: #78581e;
          font-family: Georgia, serif;
          font-size: 21px;
        }

        .descricao-formulario {
          color: #6b5e4c;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 22px;
        }

        .painel-formulario form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .painel-formulario label,
        .atividade-acoes label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          font-size: 13px;
          font-weight: 700;
        }

        .painel-formulario input,
        .painel-formulario select,
        .painel-formulario textarea,
        .filtros select,
        .atividade-acoes select {
          width: 100%;
          min-width: 0;
          border: 1px solid #d8cdbb;
          border-radius: 9px;
          background: #fcfbf9;
          padding: 11px 12px;
          color: #292114;
          font: inherit;
          font-size: 13px;
        }

        .painel-formulario input:focus,
        .painel-formulario select:focus,
        .painel-formulario textarea:focus {
          outline: 2px solid #b4903d;
          outline-offset: 1px;
        }

        .linha-formulario {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .botao-criar {
          margin-top: 8px;
          padding: 14px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(90deg, #b4903d, #8c6a26);
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .botao-criar:hover {
          background: #78581e;
        }

        .atividades-cabecalho {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .atividades-cabecalho p {
          color: #6b5e4c;
          font-size: 13px;
          margin: 0;
        }

        .filtros {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 22px;
        }

        .lista-atividades {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .cartao-atividade {
          background: #fcfbf9;
          border: 1px solid #e2d9c8;
          border-radius: 14px;
          padding: 19px;
          transition: box-shadow 0.2s ease;
        }

        .cartao-atividade:hover {
          box-shadow: 0 5px 16px #44310f12;
        }

        .atividade-cancelada {
          opacity: 0.7;
        }

        .atividade-topo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .codigo-os {
          font-size: 12px;
          font-weight: 800;
          color: #8c6a26;
        }

        .badge-status {
          display: inline-block;
          border-radius: 30px;
          padding: 6px 11px;
          font-size: 11px;
          font-weight: 800;
        }

        .badge-status.pendente {
          background: #fef3c7;
          color: #92400e;
        }

        .badge-status.execucao {
          background: #e0f2fe;
          color: #075985;
        }

        .badge-status.concluida {
          background: #dcfce7;
          color: #166534;
        }

        .badge-status.cancelada {
          background: #fee2e2;
          color: #991b1b;
        }

        .cartao-atividade h3 {
          margin: 0 0 15px;
          color: #292114;
          font-size: 16px;
          line-height: 1.5;
        }

        .atividade-cancelada h3 {
          text-decoration: line-through;
        }

        .atividade-informacoes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 14px;
          margin-bottom: 18px;
        }

        .atividade-informacoes p {
          margin: 0;
          color: #6b5e4c;
          font-size: 13px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .atividade-informacoes strong {
          color: #292114;
        }

        .prioridade-critica,
        .prazo-atrasado {
          color: #b91c1c !important;
          font-weight: 700;
        }

        .data-solicitacao {
          font-size: 11px !important;
        }

        .atividade-acoes {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 12px;
          flex-wrap: wrap;
          border-top: 1px solid #e2d9c8;
          padding-top: 15px;
        }

        .atividade-acoes label {
          flex: 1;
          min-width: 140px;
          color: #6b5e4c;
        }

        .atividade-acoes button {
          border: 0;
          border-radius: 30px;
          padding: 11px 15px;
          background: #f3ead6;
          color: #78581e;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .atividade-acoes button:hover {
          background: #e5d4ad;
        }

        .mensagem-vazia {
          text-align: center;
          padding: 35px;
          color: #6b5e4c;
          font-size: 14px;
        }

        @media (max-width: 1100px) {
          .conteudo-equipes {
            grid-template-columns: 1fr;
          }

          .indicadores {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 700px) {
          .equipes-page {
            padding: 25px 15px 60px;
          }

          .indicadores {
            grid-template-columns: repeat(2, 1fr);
          }

          .filtros {
            grid-template-columns: 1fr;
          }

          .atividade-informacoes {
            grid-template-columns: 1fr;
          }

          .linha-formulario {
            grid-template-columns: 1fr;
          }

          .painel-formulario,
          .painel-atividades {
            padding: 18px;
          }
        }
      `}</style>
    </main>
  );
}
