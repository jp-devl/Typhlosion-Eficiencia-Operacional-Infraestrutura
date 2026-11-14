
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Link from "next/link";

type Pavimento = "terreo" | "alimentacao";
type Condicao = "Normal" | "Atenção" | "Crítico";
type Andamento = "Pendente" | "Em andamento" | "Concluída";
type Disponibilidade = "Disponível" | "Ocupado" | "Ausente";

type Ocorrencia = {
  id: string;
  titulo: string;
  local: string;
  setor: string;
  categoria: string;
  condicao: Condicao;
  andamento: Andamento;
  descricao: string;
  providencias: string[];
  funcionario: string;
  funcionarioId: string;
  equipe: string;
  disponibilidade: Disponibilidade;
  horario: string;
  pavimento: Pavimento;
  x: number;
  y: number;
};

const cores = {
  dourado: "#b4903d",
  douradoEscuro: "#78581e",
  douradoClaro: "#f3ead6",
  creme: "#f8f3e9",
  marrom: "#292114",
  textoSuave: "#6b5e4c",
  borda: "#e2d9c8",
  branco: "#ffffff",
};

const coresCondicao: Record<Condicao, string> = {
  Normal: "#32986a",
  Atenção: "#d6a13e",
  Crítico: "#dc6b48",
};

const dadosIniciais: Ocorrencia[] = [
  {
    id: "OC-001",
    titulo: "Verificação de iluminação",
    local: "Corredor principal",
    setor: "Setor 01",
    categoria: "Manutenção",
    condicao: "Atenção",
    andamento: "Em andamento",
    descricao:
      "Foi identificada uma luminária com funcionamento irregular no corredor.",
    providencias: [
      "Inspecionar a luminária.",
      "Verificar a instalação elétrica.",
      "Confirmar o funcionamento após a manutenção.",
    ],
    funcionario: "Marcos Silva",
    funcionarioId: "FUNC-012",
    equipe: "Manutenção",
    disponibilidade: "Ocupado",
    horario: "09h15",
    pavimento: "terreo",
    x: 45,
    y: 42,
  },
  {
    id: "OC-002",
    titulo: "Limpeza concluída",
    local: "Área de circulação",
    setor: "Setor 02",
    categoria: "Limpeza",
    condicao: "Normal",
    andamento: "Concluída",
    descricao:
      "O setor foi higienizado e encontra-se em boas condições.",
    providencias: [
      "Manter a rotina de inspeção.",
      "Realizar a próxima limpeza conforme a programação.",
    ],
    funcionario: "Ana Souza",
    funcionarioId: "FUNC-024",
    equipe: "Limpeza",
    disponibilidade: "Disponível",
    horario: "08h30",
    pavimento: "terreo",
    x: 65,
    y: 62,
  },
  {
    id: "OC-003",
    titulo: "Limpeza prioritária",
    local: "Corredor próximo à Riachuelo",
    setor: "Setor 03",
    categoria: "Limpeza",
    condicao: "Crítico",
    andamento: "Pendente",
    descricao:
      "Foi identificado acúmulo elevado de sujeira no corredor. O local necessita de atendimento prioritário.",
    providencias: [
      "Sinalizar a área, se necessário.",
      "Realizar limpeza completa do corredor.",
      "Verificar as lixeiras da região.",
      "Inspecionar o local após a limpeza.",
    ],
    funcionario: "Carlos Oliveira",
    funcionarioId: "FUNC-017",
    equipe: "Limpeza",
    disponibilidade: "Disponível",
    horario: "10h00",
    pavimento: "terreo",
    x: 55,
    y: 53,
  },
  {
    id: "OC-004",
    titulo: "Inspeção de equipamento",
    local: "Praça de Alimentação",
    setor: "Setor 04",
    categoria: "Infraestrutura",
    condicao: "Atenção",
    andamento: "Pendente",
    descricao:
      "Equipamento da área comum aguardando inspeção técnica.",
    providencias: [
      "Verificar as condições do equipamento.",
      "Registrar o resultado da inspeção.",
      "Solicitar manutenção caso seja necessário.",
    ],
    funcionario: "Juliana Costa",
    funcionarioId: "FUNC-031",
    equipe: "Infraestrutura",
    disponibilidade: "Disponível",
    horario: "11h00",
    pavimento: "alimentacao",
    x: 52,
    y: 48,
  },
  {
    id: "OC-005",
    titulo: "Área verificada",
    local: "Circulação da Praça de Alimentação",
    setor: "Setor 05",
    categoria: "Limpeza",
    condicao: "Normal",
    andamento: "Concluída",
    descricao:
      "Área inspecionada e sem irregularidades identificadas.",
    providencias: [
      "Continuar o acompanhamento de rotina.",
    ],
    funcionario: "Fernanda Lima",
    funcionarioId: "FUNC-036",
    equipe: "Limpeza",
    disponibilidade: "Disponível",
    horario: "09h40",
    pavimento: "alimentacao",
    x: 68,
    y: 60,
  },
];

const cartao: CSSProperties = {
  background: cores.branco,
  border: `1px solid ${cores.borda}`,
  borderRadius: 18,
  padding: 22,
  boxShadow: "0 8px 24px rgba(90, 65, 20, 0.07)",
  minWidth: 0,
};

const botao: CSSProperties = {
  background: cores.douradoClaro,
  color: cores.douradoEscuro,
  border: `1px solid ${cores.borda}`,
  borderRadius: 10,
  padding: "10px 15px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

const campo: CSSProperties = {
  width: "100%",
  background: cores.branco,
  color: cores.marrom,
  border: `1px solid ${cores.borda}`,
  borderRadius: 10,
  padding: "11px 12px",
  fontSize: 14,
};

export default function PlantaPage() {
  const [ocorrencias, setOcorrencias] =
    useState<Ocorrencia[]>(dadosIniciais);

  const [pavimento, setPavimento] =
    useState<Pavimento>("terreo");

  const [selecionada, setSelecionada] =
    useState<string | null>("OC-001");

  const [filtroCondicao, setFiltroCondicao] =
    useState("Todas");

  const [filtroEquipe, setFiltroEquipe] =
    useState("Todas");

  const [zoom, setZoom] = useState(1);
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  const [arrastando, setArrastando] = useState(false);

  const mapaRef = useRef<HTMLDivElement>(null);
  const inicioArraste = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mapa = mapaRef.current;

    if (!mapa) return;

    function controlarRoda(event: WheelEvent) {
      event.preventDefault();

      setZoom((atual) =>
        Math.max(
          1,
          Math.min(
            4,
            Number(
              (
                atual +
                (event.deltaY < 0 ? 0.25 : -0.25)
              ).toFixed(2)
            )
          )
        )
      );
    }

    mapa.addEventListener("wheel", controlarRoda, {
      passive: false,
    });

    return () => {
      mapa.removeEventListener("wheel", controlarRoda);
    };
  }, []);

  const visiveis = ocorrencias.filter(
    (ocorrencia) =>
      ocorrencia.pavimento === pavimento &&
      (filtroCondicao === "Todas" ||
        ocorrencia.condicao === filtroCondicao) &&
      (filtroEquipe === "Todas" ||
        ocorrencia.equipe === filtroEquipe)
  );

  const detalhes = visiveis.find(
    (ocorrencia) => ocorrencia.id === selecionada
  );

  const totalNormal = visiveis.filter(
    (ocorrencia) => ocorrencia.condicao === "Normal"
  ).length;

  const totalAtencao = visiveis.filter(
    (ocorrencia) => ocorrencia.condicao === "Atenção"
  ).length;

  const totalCritico = visiveis.filter(
    (ocorrencia) => ocorrencia.condicao === "Crítico"
  ).length;

  const equipes = Array.from(
    new Set(ocorrencias.map((ocorrencia) => ocorrencia.equipe))
  );

  function restaurarMapa() {
    setZoom(1);
    setPosicao({ x: 0, y: 0 });
  }

  function mudarPavimento(novo: Pavimento) {
    setPavimento(novo);
    setSelecionada(null);
    restaurarMapa();
  }

  function aumentarZoom() {
    setZoom((atual) =>
      Math.min(4, Number((atual + 0.25).toFixed(2)))
    );
  }

  function diminuirZoom() {
    setZoom((atual) =>
      Math.max(1, Number((atual - 0.25).toFixed(2)))
    );
  }

  function iniciarArraste(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (event.button !== 0) return;

    setArrastando(true);

    inicioArraste.current = {
      x: event.clientX - posicao.x,
      y: event.clientY - posicao.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moverMapa(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!arrastando) return;

    setPosicao({
      x: event.clientX - inicioArraste.current.x,
      y: event.clientY - inicioArraste.current.y,
    });
  }

  function pararArraste() {
    setArrastando(false);
  }

  function atualizarAndamento(
    id: string,
    novo: Andamento
  ) {
    setOcorrencias((anteriores) =>
      anteriores.map((ocorrencia) => {
        if (ocorrencia.id !== id) return ocorrencia;

        return {
          ...ocorrencia,
          andamento: novo,
          disponibilidade:
            novo === "Em andamento"
              ? "Ocupado"
              : "Disponível",
        };
      })
    );
  }

  const imagemMapa =
    pavimento === "terreo"
      ? "/images/planta-terreo.png"
      : "/images/planta-praca-alimentacao.png";

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "none",
        minHeight: "100vh",
        alignSelf: "stretch",
        boxSizing: "border-box",
        background: "#f8f5ee",
        color: cores.marrom,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        padding: "35px 6%",
      }}
    >
      <style>{`
        .planta-resumo {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .planta-conteudo {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }

        .planta-filtros {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        @media (max-width: 1000px) {
          .planta-conteudo {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 700px) {
          .planta-resumo {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .planta-filtros {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

      {/* CABEÇALHO PADRONIZADO COM LOGO OFICIAL */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          paddingBottom: "25px",
          borderBottom: `1px solid ${cores.borda}`,
          marginBottom: "35px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
          <img
            src="/images/logo-capim-dourado.jpg"
            alt="Logo Capim Dourado Shopping"
            style={{
              height: "52px",
              width: "auto",
              mixBlendMode: "multiply",
            }}
          />

          <div
            style={{
              borderLeft: `2px solid ${cores.borda}`,
              paddingLeft: "18px",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                margin: 0,
                color: cores.douradoEscuro,
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
              }}
            >
              Planta Interativa do Shopping
            </h1>
            <p style={{ margin: "4px 0 0", color: cores.textoSuave, fontSize: "14px" }}>
              Visualize os setores, pavimentos e acompanhe as ocorrências operacionais
            </p>
          </div>
        </div>

        <Link
          href="/painel"
          style={{
            background: cores.branco,
            color: cores.douradoEscuro,
            border: `1px solid ${cores.borda}`,
            padding: "10px 18px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          ← Voltar ao Painel
        </Link>
      </header>

      <div
        style={{
          width: "100%",
          maxWidth: 1250,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >


        {/* RESUMO */}

        <div className="planta-resumo">
          {[
            {
              titulo: "Ocorrências",
              valor: visiveis.length,
              cor: cores.dourado,
            },
            {
              titulo: "Normal",
              valor: totalNormal,
              cor: coresCondicao.Normal,
            },
            {
              titulo: "Atenção",
              valor: totalAtencao,
              cor: coresCondicao.Atenção,
            },
            {
              titulo: "Crítico",
              valor: totalCritico,
              cor: coresCondicao.Crítico,
            },
          ].map((item) => (
            <div
              key={item.titulo}
              style={{
                ...cartao,
                borderTop: `4px solid ${item.cor}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: cores.textoSuave,
                  fontWeight: 600,
                }}
              >
                {item.titulo}
              </p>

              <strong
                style={{
                  display: "block",
                  fontSize: 32,
                  marginTop: 8,
                  color: item.cor,
                }}
              >
                {item.valor}
              </strong>
            </div>
          ))}
        </div>

        {/* PAVIMENTOS */}

        <section
          style={{
            ...cartao,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 17,
              margin: "0 0 15px",
              color: cores.douradoEscuro,
            }}
          >
            Selecione o pavimento
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {[
              {
                id: "terreo" as Pavimento,
                nome: "Térreo",
              },
              {
                id: "alimentacao" as Pavimento,
                nome: "Praça de Alimentação",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => mudarPavimento(item.id)}
                style={{
                  ...botao,
                  background:
                    pavimento === item.id
                      ? cores.dourado
                      : cores.douradoClaro,
                  color:
                    pavimento === item.id
                      ? cores.branco
                      : cores.douradoEscuro,
                  borderColor:
                    pavimento === item.id
                      ? cores.dourado
                      : cores.borda,
                }}
              >
                {item.nome}
              </button>
            ))}
          </div>
        </section>

        {/* FILTROS */}

        <section
          style={{
            ...cartao,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 17,
              color: cores.douradoEscuro,
              margin: "0 0 15px",
            }}
          >
            Filtros operacionais
          </h2>

          <div className="planta-filtros">
            <label
              style={{
                display: "grid",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Condição do setor

              <select
                value={filtroCondicao}
                onChange={(event) => {
                  setFiltroCondicao(event.target.value);
                  setSelecionada(null);
                }}
                style={campo}
              >
                <option value="Todas">
                  Todas as condições
                </option>
                <option value="Normal">Normal</option>
                <option value="Atenção">Atenção</option>
                <option value="Crítico">Crítico</option>
              </select>
            </label>

            <label
              style={{
                display: "grid",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Equipe responsável

              <select
                value={filtroEquipe}
                onChange={(event) => {
                  setFiltroEquipe(event.target.value);
                  setSelecionada(null);
                }}
                style={campo}
              >
                <option value="Todas">
                  Todas as equipes
                </option>

                {equipes.map((equipe) => (
                  <option key={equipe} value={equipe}>
                    {equipe}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {/* MAPA E RELATÓRIO */}

        <div className="planta-conteudo">
          <section style={cartao}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 18,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 19,
                    color: cores.douradoEscuro,
                  }}
                >
                  Mapa do Shopping
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: cores.textoSuave,
                    fontSize: 13,
                  }}
                >
                  Clique nos marcadores para visualizar
                  os relatórios.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={diminuirZoom}
                  style={botao}
                  aria-label="Diminuir zoom"
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={aumentarZoom}
                  style={botao}
                  aria-label="Aumentar zoom"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={restaurarMapa}
                  style={botao}
                >
                  Restaurar
                </button>
              </div>
            </div>

            {/* LEGENDA */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 15,
                color: cores.textoSuave,
                fontSize: 12,
              }}
            >
              {(
                ["Normal", "Atenção", "Crítico"] as Condicao[]
              ).map((condicao) => (
                <span
                  key={condicao}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: coresCondicao[condicao],
                    }}
                  />
                  {condicao}
                </span>
              ))}
            </div>

            {/* PLANTA INTERATIVA */}

            <div
              ref={mapaRef}
              onPointerDown={iniciarArraste}
              onPointerMove={moverMapa}
              onPointerUp={pararArraste}
              onPointerCancel={pararArraste}
              onLostPointerCapture={pararArraste}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: 15,
                background: "#eee6d6",
                border: `1px solid ${cores.borda}`,
                cursor: arrastando ? "grabbing" : "grab",
                touchAction: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `translate(${posicao.x}px, ${posicao.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: arrastando
                    ? "none"
                    : "transform 0.12s ease",
                }}
              >
                <img
                  src={imagemMapa}
                  alt={
                    pavimento === "terreo"
                      ? "Planta do térreo do shopping"
                      : "Planta da praça de alimentação"
                  }
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />

                {visiveis.map((ocorrencia) => (
                  <button
                    key={ocorrencia.id}
                    type="button"
                    title={`${ocorrencia.local} — ${ocorrencia.condicao}`}
                    aria-label={`Visualizar relatório de ${ocorrencia.local}`}
                    onPointerDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelecionada(ocorrencia.id);
                    }}
                    style={{
                      position: "absolute",
                      left: `${ocorrencia.x}%`,
                      top: `${ocorrencia.y}%`,

                      // Mantém o marcador com tamanho
                      // visual constante durante o zoom.
                      transform: `translate(-50%, -50%) scale(${1 / zoom})`,

                      width:
                        selecionada === ocorrencia.id
                          ? 34
                          : 27,
                      height:
                        selecionada === ocorrencia.id
                          ? 34
                          : 27,
                      borderRadius: "50%",
                      background:
                        coresCondicao[ocorrencia.condicao],
                      border:
                        selecionada === ocorrencia.id
                          ? `4px solid ${cores.douradoEscuro}`
                          : "3px solid white",
                      boxShadow:
                        "0 3px 12px rgba(0,0,0,0.35)",
                      cursor: "pointer",
                      zIndex:
                        selecionada === ocorrencia.id
                          ? 2
                          : 1,
                    }}
                  />
                ))}
              </div>
            </div>

            <p
              style={{
                color: cores.textoSuave,
                fontSize: 12,
                margin: "14px 0 0",
              }}
            >
              Zoom: {Math.round(zoom * 100)}% • Use a roda
              do mouse para ampliar e arraste para mover
              o mapa.
            </p>

            {/* OCORRÊNCIAS */}

            <div
              style={{
                marginTop: 22,
                borderTop: `1px solid ${cores.borda}`,
                paddingTop: 20,
              }}
            >
              <h3
                style={{
                  color: cores.douradoEscuro,
                  fontSize: 16,
                  margin: "0 0 13px",
                }}
              >
                Ocorrências deste pavimento
              </h3>

              {visiveis.length === 0 ? (
                <p
                  style={{
                    color: cores.textoSuave,
                    fontSize: 14,
                  }}
                >
                  Nenhuma ocorrência encontrada com os
                  filtros selecionados.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: 10,
                  }}
                >
                  {visiveis.map((ocorrencia) => (
                    <button
                      key={ocorrencia.id}
                      type="button"
                      onClick={() =>
                        setSelecionada(ocorrencia.id)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        textAlign: "left",
                        padding: 13,
                        borderRadius: 11,
                        background:
                          selecionada === ocorrencia.id
                            ? cores.douradoClaro
                            : cores.creme,
                        border:
                          selecionada === ocorrencia.id
                            ? `1px solid ${cores.dourado}`
                            : `1px solid ${cores.borda}`,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: 13,
                          height: 13,
                          flexShrink: 0,
                          borderRadius: "50%",
                          background:
                            coresCondicao[
                            ocorrencia.condicao
                            ],
                        }}
                      />

                      <span
                        style={{
                          display: "grid",
                          gap: 4,
                        }}
                      >
                        <strong
                          style={{
                            color: cores.marrom,
                            fontSize: 13,
                          }}
                        >
                          {ocorrencia.titulo}
                        </strong>

                        <span
                          style={{
                            color: cores.textoSuave,
                            fontSize: 12,
                          }}
                        >
                          {ocorrencia.local} •{" "}
                          {ocorrencia.id}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* RELATÓRIO OPERACIONAL */}

          <aside style={cartao}>
            <h2
              style={{
                color: cores.douradoEscuro,
                fontSize: 19,
                margin: "0 0 18px",
              }}
            >
              Relatório Operacional
            </h2>

            {!detalhes ? (
              <div
                style={{
                  padding: "35px 15px",
                  textAlign: "center",
                  color: cores.textoSuave,
                  background: cores.creme,
                  borderRadius: 13,
                }}
              >
                Selecione um marcador no mapa para
                visualizar as informações do setor.
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: cores.creme,
                    border: `1px solid ${cores.borda}`,
                    borderRadius: 13,
                    padding: 17,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: cores.douradoEscuro,
                    }}
                  >
                    {detalhes.id} • {detalhes.setor}
                  </span>

                  <h3
                    style={{
                      color: cores.marrom,
                      fontSize: 20,
                      margin: "9px 0",
                    }}
                  >
                    {detalhes.titulo}
                  </h3>

                  <p
                    style={{
                      color: cores.textoSuave,
                      fontSize: 14,
                      margin: "0 0 14px",
                    }}
                  >
                    {detalhes.local}
                  </p>

                  <span
                    style={{
                      display: "inline-block",
                      background:
                        coresCondicao[detalhes.condicao],
                      color: "#ffffff",
                      padding: "7px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {detalhes.condicao}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 15,
                  }}
                >
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: cores.douradoEscuro,
                        marginBottom: 7,
                      }}
                    >
                      Condição identificada
                    </strong>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: cores.textoSuave,
                      }}
                    >
                      {detalhes.descricao}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: `1px solid ${cores.borda}`,
                      paddingTop: 16,
                    }}
                  >
                    <strong
                      style={{
                        color: cores.douradoEscuro,
                        fontSize: 13,
                      }}
                    >
                      Providências necessárias
                    </strong>

                    <ul
                      style={{
                        paddingLeft: 20,
                        margin: "12px 0 0",
                        color: cores.textoSuave,
                        lineHeight: 1.8,
                        fontSize: 14,
                      }}
                    >
                      {detalhes.providencias.map(
                        (providencia, indice) => (
                          <li key={indice}>
                            {providencia}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div
                    style={{
                      borderTop: `1px solid ${cores.borda}`,
                      paddingTop: 16,
                    }}
                  >
                    <strong
                      style={{
                        color: cores.douradoEscuro,
                        fontSize: 13,
                      }}
                    >
                      Funcionário responsável
                    </strong>

                    <div
                      style={{
                        background: cores.creme,
                        border: `1px solid ${cores.borda}`,
                        borderRadius: 12,
                        padding: 15,
                        marginTop: 12,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          color: cores.marrom,
                          fontSize: 15,
                        }}
                      >
                        {detalhes.funcionario}
                      </strong>

                      <p
                        style={{
                          margin: "7px 0",
                          color: cores.textoSuave,
                          fontSize: 13,
                        }}
                      >
                        Matrícula:{" "}
                        {detalhes.funcionarioId}
                      </p>

                      <p
                        style={{
                          margin: "7px 0",
                          color: cores.textoSuave,
                          fontSize: 13,
                        }}
                      >
                        Equipe: {detalhes.equipe}
                      </p>

                      <p
                        style={{
                          margin: "7px 0 0",
                          color: cores.textoSuave,
                          fontSize: 13,
                        }}
                      >
                        Disponibilidade:{" "}
                        <strong>
                          {detalhes.disponibilidade}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: `1px solid ${cores.borda}`,
                      paddingTop: 16,
                    }}
                  >
                    <label
                      style={{
                        display: "grid",
                        gap: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: cores.douradoEscuro,
                      }}
                    >
                      Andamento da atividade

                      <select
                        value={detalhes.andamento}
                        onChange={(event) =>
                          atualizarAndamento(
                            detalhes.id,
                            event.target.value as Andamento
                          )
                        }
                        style={campo}
                      >
                        <option value="Pendente">
                          Pendente
                        </option>
                        <option value="Em andamento">
                          Em andamento
                        </option>
                        <option value="Concluída">
                          Concluída
                        </option>
                      </select>
                    </label>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      paddingTop: 12,
                    }}
                  >
                    <div
                      style={{
                        background: cores.creme,
                        borderRadius: 11,
                        padding: 13,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: cores.textoSuave,
                        }}
                      >
                        Categoria
                      </span>

                      <strong
                        style={{
                          display: "block",
                          marginTop: 6,
                          fontSize: 13,
                          color: cores.marrom,
                        }}
                      >
                        {detalhes.categoria}
                      </strong>
                    </div>

                    <div
                      style={{
                        background: cores.creme,
                        borderRadius: 11,
                        padding: 13,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: cores.textoSuave,
                        }}
                      >
                        Horário
                      </span>

                      <strong
                        style={{
                          display: "block",
                          marginTop: 6,
                          fontSize: 13,
                          color: cores.marrom,
                        }}
                      >
                        {detalhes.horario}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* RODAPÉ */}

        <footer
          style={{
            textAlign: "center",
            marginTop: 32,
            padding: 18,
            color: cores.douradoEscuro,
            fontSize: 12,
          }}
        >
          Capim Gestão • Equipe Typhlosion •
          HackaRun 2026
        </footer>
      </div>
    </main>
  );
}
