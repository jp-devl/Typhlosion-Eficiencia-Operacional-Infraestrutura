
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Status = "Pendente" | "Em andamento" | "Resolvido";
type Prioridade = "Baixa" | "Média" | "Alta";

type Ocorrencia = {
  id: number;
  titulo: string;
  local: string;
  categoria: string;
  prioridade: Prioridade;
  status: Status;
  responsavel: string;
  data: string;
  descricao: string;
};

const iniciais: Ocorrencia[] = [
  {
    id: 1,
    titulo: "Luminária com defeito",
    local: "Praça de Alimentação",
    categoria: "Elétrica",
    prioridade: "Média",
    status: "Pendente",
    responsavel: "Equipe de Manutenção",
    data: "14/11/2026",
    descricao: "Luminária apagada na área de circulação.",
  },
  {
    id: 2,
    titulo: "Ar-condicionado sem refrigeração",
    local: "Corredor Norte",
    categoria: "Climatização",
    prioridade: "Alta",
    status: "Em andamento",
    responsavel: "Equipe Técnica",
    data: "14/11/2026",
    descricao: "Temperatura acima do esperado no corredor.",
  },
  {
    id: 3,
    titulo: "Vazamento em torneira",
    local: "Banheiro do Térreo",
    categoria: "Hidráulica",
    prioridade: "Média",
    status: "Resolvido",
    responsavel: "Equipe Hidráulica",
    data: "13/11/2026",
    descricao: "Torneira apresentava vazamento contínuo.",
  },
  {
    id: 4,
    titulo: "Piso danificado",
    local: "Entrada Principal",
    categoria: "Estrutura",
    prioridade: "Alta",
    status: "Pendente",
    responsavel: "Equipe de Manutenção",
    data: "14/11/2026",
    descricao: "Piso necessita de reparo preventivo.",
  },
];

const cores: Record<Status, string> = {
  Pendente: "#b45309",
  "Em andamento": "#2563eb",
  Resolvido: "#15803d",
};

const estiloCampo = {
  width: "100%",
  padding: "12px",
  border: "1px solid #e2d9c8",
  borderRadius: "10px",
  background: "#fff",
  color: "#292114",
} as const;

export default function InfraestruturaPage() {
  const [ocorrencias, setOcorrencias] = useState(iniciais);
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);

  const [titulo, setTitulo] = useState("");
  const [local, setLocal] = useState("");
  const [categoria, setCategoria] = useState("Elétrica");
  const [prioridade, setPrioridade] = useState<Prioridade>("Média");
  const [descricao, setDescricao] = useState("");

  const total = ocorrencias.length;
  const pendentes = ocorrencias.filter(
    (o) => o.status === "Pendente"
  ).length;
  const andamento = ocorrencias.filter(
    (o) => o.status === "Em andamento"
  ).length;
  const resolvidas = ocorrencias.filter(
    (o) => o.status === "Resolvido"
  ).length;

  const filtradas = useMemo(() => {
    return ocorrencias.filter((o) => {
      const correspondeStatus =
        filtro === "Todos" || o.status === filtro;

      const termo = busca.toLowerCase();

      const correspondeBusca =
        o.titulo.toLowerCase().includes(termo) ||
        o.local.toLowerCase().includes(termo) ||
        o.categoria.toLowerCase().includes(termo);

      return correspondeStatus && correspondeBusca;
    });
  }, [ocorrencias, filtro, busca]);

  function registrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!titulo.trim() || !local.trim()) return;

    const nova: Ocorrencia = {
      id: Date.now(),
      titulo: titulo.trim(),
      local: local.trim(),
      categoria,
      prioridade,
      status: "Pendente",
      responsavel: "Aguardando atribuição",
      data: new Date().toLocaleDateString("pt-BR"),
      descricao: descricao.trim() || "Sem descrição adicional.",
    };

    setOcorrencias((anteriores) => [nova, ...anteriores]);
    setTitulo("");
    setLocal("");
    setCategoria("Elétrica");
    setPrioridade("Média");
    setDescricao("");
    setFiltro("Todos");
    setBusca("");
    setModalAberto(false);
  }

  function atualizarStatus(id: number, status: Status) {
    setOcorrencias((anteriores) =>
      anteriores.map((o) =>
        o.id === id ? { ...o, status } : o
      )
    );

    setSelecionada((atual) =>
      atual?.id === id ? { ...atual, status } : atual
    );
  }

  return (
    <main className="infra-page">
      <div className="infra-container">
        <header className="infra-header">
          <div>
            <p className="infra-eyebrow">CAPIM GESTÃO • OPERAÇÕES</p>
            <h1>Gestão de Infraestrutura</h1>
            <p>
              Acompanhamento de manutenção e ocorrências do shopping.
            </p>
          </div>

          <Link href="/painel" className="infra-back">
            ← Voltar ao painel
          </Link>
        </header>

        <section className="infra-stats">
          {[
            { titulo: "Total de ocorrências", valor: total, cor: "#78581e" },
            { titulo: "Pendentes", valor: pendentes, cor: "#b45309" },
            { titulo: "Em andamento", valor: andamento, cor: "#2563eb" },
            { titulo: "Resolvidas", valor: resolvidas, cor: "#15803d" },
          ].map((item) => (
            <article className="infra-stat" key={item.titulo}>
              <span>{item.titulo}</span>
              <strong style={{ color: item.cor }}>{item.valor}</strong>
            </article>
          ))}
        </section>

        <section className="infra-panel">
          <div className="infra-panel-top">
            <div>
              <h2>Ocorrências registradas</h2>
              <p>Consulte e acompanhe as solicitações de manutenção.</p>
            </div>

            <button
              className="infra-primary"
              onClick={() => setModalAberto(true)}
            >
              + Nova ocorrência
            </button>
          </div>

          <div className="infra-filters">
            <input
              aria-label="Buscar ocorrências"
              placeholder="Buscar problema, local ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <select
              aria-label="Filtrar por status"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="Todos">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Resolvido">Resolvido</option>
            </select>
          </div>

          <div className="infra-list">
            {filtradas.length === 0 ? (
              <p>Nenhuma ocorrência encontrada.</p>
            ) : (
              filtradas.map((o) => (
                <article className="infra-item" key={o.id}>
                  <div className="infra-item-main">
                    <div className="infra-item-heading">
                      <h3>{o.titulo}</h3>
                      <span
                        className="infra-status"
                        style={{
                          color: cores[o.status],
                          backgroundColor: `${cores[o.status]}15`,
                        }}
                      >
                        {o.status}
                      </span>
                    </div>

                    <p>📍 {o.local}</p>
                    <div className="infra-meta">
                      <span>{o.categoria}</span>
                      <span>Prioridade: {o.prioridade}</span>
                      <span>{o.data}</span>
                    </div>
                  </div>

                  <button
                    className="infra-details"
                    onClick={() => setSelecionada(o)}
                  >
                    Ver detalhes
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {modalAberto && (
        <div className="infra-overlay" onClick={() => setModalAberto(false)}>
          <div
            className="infra-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Nova ocorrência"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Registrar ocorrência</h2>
            <p>Informe os dados do problema identificado.</p>

            <form onSubmit={registrar}>
              <label>
                Título do problema
                <input
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  style={estiloCampo}
                  placeholder="Ex.: Iluminação danificada"
                />
              </label>

              <label>
                Localização
                <input
                  required
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  style={estiloCampo}
                  placeholder="Ex.: Corredor principal"
                />
              </label>

              <label>
                Categoria
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={estiloCampo}
                >
                  <option>Elétrica</option>
                  <option>Hidráulica</option>
                  <option>Climatização</option>
                  <option>Estrutura</option>
                  <option>Limpeza</option>
                  <option>Outros</option>
                </select>
              </label>

              <label>
                Prioridade
                <select
                  value={prioridade}
                  onChange={(e) =>
                    setPrioridade(e.target.value as Prioridade)
                  }
                  style={estiloCampo}
                >
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </label>

              <label>
                Descrição
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  style={{ ...estiloCampo, minHeight: 80 }}
                  placeholder="Descreva o problema..."
                />
              </label>

              <div className="infra-actions">
                <button
                  type="button"
                  className="infra-secondary"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="infra-primary">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selecionada && (
        <div className="infra-overlay" onClick={() => setSelecionada(null)}>
          <div
            className="infra-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Detalhes da ocorrência"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selecionada.titulo}</h2>
            <p>{selecionada.descricao}</p>

            <div className="infra-info">
              <p><strong>Local:</strong> {selecionada.local}</p>
              <p><strong>Categoria:</strong> {selecionada.categoria}</p>
              <p><strong>Prioridade:</strong> {selecionada.prioridade}</p>
              <p><strong>Responsável:</strong> {selecionada.responsavel}</p>
              <p><strong>Data:</strong> {selecionada.data}</p>
            </div>

            <label>
              <strong>Status da ocorrência</strong>
              <select
                value={selecionada.status}
                onChange={(e) =>
                  atualizarStatus(
                    selecionada.id,
                    e.target.value as Status
                  )
                }
                style={{ ...estiloCampo, marginTop: 8 }}
              >
                <option>Pendente</option>
                <option>Em andamento</option>
                <option>Resolvido</option>
              </select>
            </label>

            <div className="infra-actions">
              <button
                className="infra-primary"
                onClick={() => setSelecionada(null)}
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body:has(.infra-page) {
          display: block;
          padding: 0;
          background: #f5f1e9;
        }

        .infra-page {
          min-height: 100vh;
          width: 100%;
          background: #f5f1e9;
          padding: 38px 24px 70px;
          color: #292114;
        }

        .infra-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .infra-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .infra-eyebrow {
          color: #b4903d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .infra-header h1 {
          font-size: clamp(26px, 4vw, 38px);
          color: #78581e;
          margin-bottom: 8px;
        }

        .infra-header p,
        .infra-panel-top p {
          color: #786b59;
          font-size: 14px;
        }

        .infra-back {
          color: #78581e;
          text-decoration: none;
          font-weight: 700;
          white-space: nowrap;
        }

        .infra-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 25px;
        }

        .infra-stat {
          background: white;
          border: 1px solid #e2d9c8;
          border-radius: 16px;
          padding: 23px;
          box-shadow: 0 5px 18px #49380e0a;
        }

        .infra-stat span {
          display: block;
          font-size: 13px;
          color: #786b59;
          margin-bottom: 12px;
        }

        .infra-stat strong {
          font-size: 36px;
        }

        .infra-panel {
          background: white;
          border: 1px solid #e2d9c8;
          border-radius: 18px;
          padding: 26px;
          box-shadow: 0 8px 25px #49380e0a;
        }

        .infra-panel-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .infra-panel-top h2 {
          color: #78581e;
          margin-bottom: 6px;
        }

        .infra-primary {
          background: linear-gradient(90deg, #b4903d, #8c6a26);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px 18px;
          font-weight: 700;
          cursor: pointer;
        }

        .infra-secondary {
          background: #f3ead6;
          color: #78581e;
          border: none;
          border-radius: 10px;
          padding: 12px 18px;
          cursor: pointer;
        }

        .infra-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .infra-filters input,
        .infra-filters select {
          padding: 12px 14px;
          border: 1px solid #e2d9c8;
          border-radius: 10px;
          background: #fcfbf9;
          color: #292114;
        }

        .infra-filters input {
          flex: 1;
          min-width: 0;
        }

        .infra-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid #eee6d8;
        }

        .infra-item:last-child {
          border-bottom: none;
        }

        .infra-item-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .infra-item h3 {
          font-size: 16px;
          color: #292114;
        }

        .infra-item-main > p {
          color: #786b59;
          font-size: 13px;
          margin-bottom: 9px;
        }

        .infra-status {
          font-size: 12px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 999px;
        }

        .infra-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          color: #8b7b66;
          font-size: 12px;
        }

        .infra-details {
          border: 1px solid #b4903d;
          background: white;
          color: #78581e;
          border-radius: 9px;
          padding: 10px 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .infra-overlay {
          position: fixed;
          inset: 0;
          background: #1d170fc2;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .infra-modal {
          width: 100%;
          max-width: 490px;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 25px 70px #0004;
        }

        .infra-modal h2 {
          color: #78581e;
          margin-bottom: 10px;
        }

        .infra-modal > p {
          color: #786b59;
          margin-bottom: 22px;
          line-height: 1.5;
        }

        .infra-modal form {
          display: grid;
          gap: 14px;
        }

        .infra-modal label {
          display: block;
          color: #51432f;
          font-size: 13px;
          font-weight: 700;
        }

        .infra-modal label input,
        .infra-modal label select,
        .infra-modal label textarea {
          display: block;
          margin-top: 6px;
          font-weight: 400;
        }

        .infra-info {
          display: grid;
          gap: 12px;
          padding: 18px;
          background: #faf7f0;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .infra-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        @media (max-width: 800px) {
          .infra-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .infra-header,
          .infra-panel-top {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 550px) {
          .infra-page {
            padding: 20px 12px 40px;
          }

          .infra-panel {
            padding: 18px;
          }

          .infra-filters,
          .infra-item {
            flex-direction: column;
            align-items: stretch;
          }

          .infra-stats {
            gap: 10px;
          }

          .infra-stat {
            padding: 16px;
          }

          .infra-stat strong {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}
