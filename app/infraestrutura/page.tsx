"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

interface Equipamento {
  id: string;
  nome: string;
  setor: string;
  categoria: string;
  status: "Operacional" | "Em Manutenção" | "Inoperante";
  ultimaInspecao: string;
  observacao: string;
}

const cores = {
  dourado: "#b4903d",
  douradoEscuro: "#8c6a26",
  marrom: "#78581e",
  texto: "#292114",
  textoSecundario: "#6b5e4c",
  bege: "#f3ead6",
  fundo: "#f8f5ee",
  borda: "#e2d9c8",
  branco: "#ffffff",
};

const STORAGE_KEY = "capim_gestao_infraestrutura";

const equipamentosIniciais: Equipamento[] = [
  {
    id: "EQ-01",
    nome: "Chiller Central 01 (CAG)",
    setor: "Casa de Máquinas",
    categoria: "Climatização",
    status: "Operacional",
    ultimaInspecao: "14/11/2026",
    observacao: "Pressão e temperatura operando dentro da faixa nominal.",
  },
  {
    id: "EQ-02",
    nome: "Escada Rolante — Acesso Norte",
    setor: "Corredor Norte",
    categoria: "Transporte Vertical",
    status: "Em Manutenção",
    ultimaInspecao: "14/11/2026",
    observacao: "Troca preventiva de corrimão e lubrificação de corrente.",
  },
  {
    id: "EQ-03",
    nome: "Grupo Gerador Diesel 750 kVA",
    setor: "Subestação Elétrica",
    categoria: "Energia",
    status: "Operacional",
    ultimaInspecao: "13/11/2026",
    observacao: "Teste de transferência automática concluído sem falhas.",
  },
  {
    id: "EQ-04",
    nome: "Bomba de Recalque Hidráulico 02",
    setor: "Estacionamento",
    categoria: "Hidráulica",
    status: "Inoperante",
    ultimaInspecao: "14/11/2026",
    observacao: "Aguardando substituição de selo mecânico pela equipe técnica.",
  },
];

export default function GestaoInfraestrutura() {
  const [listaEquipamentos, setListaEquipamentos] = useState<Equipamento[]>([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("Casa de Máquinas");
  const [categoria, setCategoria] = useState("Climatização");
  const [status, setStatus] = useState<Equipamento["status"]>("Operacional");
  const [observacao, setObservacao] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");

  useEffect(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) {
      setListaEquipamentos(JSON.parse(salvos));
    } else {
      setListaEquipamentos(equipamentosIniciais);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentosIniciais));
    }
  }, []);

  function salvarNoStorage(novaLista: Equipamento[]) {
    setListaEquipamentos(novaLista);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  }

  function cadastrarEquipamento(evento: FormEvent) {
    evento.preventDefault();
    if (!nome.trim()) return;

    const novoEquipamento: Equipamento = {
      id: `EQ-${Math.floor(10 + Math.random() * 89)}`,
      nome: nome.trim(),
      setor,
      categoria,
      status,
      ultimaInspecao: new Date().toLocaleDateString("pt-BR"),
      observacao: observacao.trim() || "Equipamento cadastrado e sem pendências.",
    };

    salvarNoStorage([novoEquipamento, ...listaEquipamentos]);
    setNome("");
    setObservacao("");
  }

  function alternarStatus(id: string) {
    const ordemStatus: Equipamento["status"][] = [
      "Operacional",
      "Em Manutenção",
      "Inoperante",
    ];
    const atualizada = listaEquipamentos.map((item) => {
      if (item.id !== id) return item;
      const proximoIndice = (ordemStatus.indexOf(item.status) + 1) % ordemStatus.length;
      return { ...item, status: ordemStatus[proximoIndice] };
    });
    salvarNoStorage(atualizada);
  }

  const equipamentosFiltrados =
    filtroStatus === "Todos"
      ? listaEquipamentos
      : listaEquipamentos.filter((item) => item.status === filtroStatus);

  const totalOperacionais = listaEquipamentos.filter((e) => e.status === "Operacional").length;
  const totalManutencao = listaEquipamentos.filter((e) => e.status === "Em Manutenção").length;
  const totalInoperantes = listaEquipamentos.filter((e) => e.status === "Inoperante").length;

  function obterCorStatus(estado: Equipamento["status"]) {
    if (estado === "Inoperante") return { bg: "#fee2e2", text: "#991b1b" };
    if (estado === "Em Manutenção") return { bg: "#fef3c7", text: "#92400e" };
    return { bg: "#dcfce7", text: "#166534" };
  }
  return (
    <main
      style={{
        width: "100%",
        maxWidth: "none",
        minHeight: "100vh",
        boxSizing: "border-box",
        margin: 0,
        padding: "35px 6%",
        background: cores.fundo,
        color: cores.texto,
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* CABEÇALHO DO MÓDULO */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          paddingBottom: "25px",
          borderBottom: `1px solid ${cores.borda}`,
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
                color: cores.marrom,
                fontFamily: "Georgia, serif",
              }}
            >
              Gestão de Infraestrutura
            </h1>
            <p style={{ margin: "4px 0 0", color: cores.textoSecundario, fontSize: "14px" }}>
              Cadastro, monitoramento e status operacional dos equipamentos do shopping
            </p>
          </div>
        </div>

        <Link
          href="/painel"
          style={{
            background: cores.branco,
            color: cores.marrom,
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

      <section style={{ maxWidth: "1250px", margin: "40px auto 0" }}>
        {/* RESUMO DE INDICADORES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <article
            style={{
              background: cores.branco,
              border: `1px solid ${cores.borda}`,
              borderRadius: "16px",
              padding: "22px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#166534" }}>
              EQUIPAMENTOS OPERACIONAIS
            </span>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#166534", marginTop: "6px" }}>
              {totalOperacionais}
            </p>
          </article>

          <article
            style={{
              background: cores.branco,
              border: `1px solid ${cores.borda}`,
              borderRadius: "16px",
              padding: "22px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#92400e" }}>
              EM MANUTENÇÃO
            </span>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#92400e", marginTop: "6px" }}>
              {totalManutencao}
            </p>
          </article>

          <article
            style={{
              background: cores.branco,
              border: `1px solid ${cores.borda}`,
              borderRadius: "16px",
              padding: "22px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#991b1b" }}>
              ALERTAS / INOPERANTES
            </span>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#991b1b", marginTop: "6px" }}>
              {totalInoperantes}
            </p>
          </article>
        </div>
        {/* GRADE PRINCIPAL: FORMULÁRIO + LISTA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* FORMULÁRIO DE CADASTRO */}
          <section
            style={{
              background: cores.branco,
              border: `1px solid ${cores.borda}`,
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 8px 25px rgba(68, 49, 15, 0.06)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                color: cores.marrom,
                fontFamily: "Georgia, serif",
                marginBottom: "18px",
              }}
            >
              Cadastrar Equipamento
            </h2>

            <form
              onSubmit={cadastrarEquipamento}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  htmlFor="nome"
                  style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                >
                  Nome do Equipamento / Ativo *
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  placeholder="Ex: Elevador Panorâmico 01"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${cores.borda}`,
                    background: "#fcfbf9",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="setor"
                  style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                >
                  Setor de Instalação
                </label>
                <select
                  id="setor"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${cores.borda}`,
                    background: "#fcfbf9",
                  }}
                >
                  <option value="Casa de Máquinas">Casa de Máquinas</option>
                  <option value="Subestação Elétrica">Subestação Elétrica</option>
                  <option value="Praça de Alimentação">Praça de Alimentação</option>
                  <option value="Corredor Norte">Corredor Norte</option>
                  <option value="Corredor Sul">Corredor Sul</option>
                  <option value="Estacionamento">Estacionamento</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label
                    htmlFor="categoria"
                    style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                  >
                    Sistema
                  </label>
                  <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${cores.borda}`,
                      background: "#fcfbf9",
                    }}
                  >
                    <option value="Climatização">Climatização</option>
                    <option value="Energia">Energia</option>
                    <option value="Transporte Vertical">Transporte Vertical</option>
                    <option value="Hidráulica">Hidráulica</option>
                    <option value="Segurança e Incêndio">Segurança e Incêndio</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                  >
                    Condição Atual
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Equipamento["status"])}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${cores.borda}`,
                      background: "#fcfbf9",
                    }}
                  >
                    <option value="Operacional">Operacional</option>
                    <option value="Em Manutenção">Em Manutenção</option>
                    <option value="Inoperante">Inoperante</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="observacao"
                  style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                >
                  Observações Técnicas
                </label>
                <textarea
                  id="observacao"
                  rows={3}
                  placeholder="Informe capacidade, modelo ou notas de inspeção..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${cores.borda}`,
                    background: "#fcfbf9",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "6px",
                  padding: "13px",
                  borderRadius: "999px",
                  border: "none",
                  background: `linear-gradient(90deg, ${cores.dourado} 0%, ${cores.douradoEscuro} 100%)`,
                  color: cores.branco,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Cadastrar Equipamento
              </button>
            </form>
          </section>
          {/* LISTA DE EQUIPAMENTOS */}
          <section
            style={{
              background: cores.branco,
              border: `1px solid ${cores.borda}`,
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 8px 25px rgba(68, 49, 15, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "20px", color: cores.marrom, fontFamily: "Georgia, serif" }}>
                Equipamentos Monitorados ({equipamentosFiltrados.length})
              </h2>

              <select
                aria-label="Filtrar equipamentos por condição"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: `1px solid ${cores.borda}`,
                  background: cores.fundo,
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: cores.marrom,
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Operacional">Operacionais</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Inoperante">Inoperantes</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {equipamentosFiltrados.map((item) => {
                const badge = obterCorStatus(item.status);
                return (
                  <article
                    key={item.id}
                    style={{
                      border: `1px solid ${cores.borda}`,
                      borderRadius: "14px",
                      padding: "18px",
                      background: "#fcfbf9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: "bold", color: cores.douradoEscuro }}>
                        {item.id} · {item.setor} · {item.categoria}
                      </span>

                      <span
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "16px", color: cores.texto, marginBottom: "6px" }}>
                      {item.nome}
                    </h3>

                    <p style={{ fontSize: "13px", color: cores.textoSecundario, marginBottom: "14px" }}>
                      {item.observacao}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: `1px solid ${cores.borda}`,
                        paddingTop: "10px",
                        fontSize: "12px",
                        color: cores.textoSecundario,
                      }}
                    >
                      <span>Última inspeção: {item.ultimaInspecao}</span>

                      <button
                        type="button"
                        onClick={() => alternarStatus(item.id)}
                        title="Clique para alterar a condição do equipamento"
                        style={{
                          background: cores.bege,
                          color: cores.marrom,
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Alterar condição ↻
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      {/* RODAPÉ PADRÃO */}
      <footer
        style={{
          maxWidth: "1250px",
          margin: "80px auto 0",
          padding: "20px 0",
          borderTop: `1px solid ${cores.borda}`,
          color: cores.textoSecundario,
          fontSize: "13px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span>Capim Gestão · Capim Dourado Shopping</span>
        <span>Protótipo demonstrativo · Equipe Typhlosion</span>
      </footer>
    </main>
  );
}
