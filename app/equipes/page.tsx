"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

type StatusAtividade = "Pendente" | "Em Execução" | "Concluída" | "Cancelada";

interface AtividadeEquipe {
    id: string;
    titulo: string;
    equipe: string;
    responsavel: string;
    setor: string;
    prazo: string;
    status: StatusAtividade;
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

const STORAGE_KEY = "capim_gestao_equipes_atividades";

const atividadesIniciais: AtividadeEquipe[] = [
    {
        id: "OS-201",
        titulo: "Revisão preventiva do quadro elétrico central",
        equipe: "Manutenção Elétrica",
        responsavel: "Marcos Silva",
        setor: "Subestação Elétrica",
        prazo: "Hoje, 14:00",
        status: "Em Execução",
    },
    {
        id: "OS-202",
        titulo: "Higienização intensiva pós-horário de almoço",
        equipe: "Limpeza e Conservação",
        responsavel: "Ana Souza",
        setor: "Praça de Alimentação",
        prazo: "Hoje, 15:30",
        status: "Pendente",
    },
    {
        id: "OS-203",
        titulo: "Calibração de sensores de temperatura do Chiller 02",
        equipe: "Climatização",
        responsavel: "Juliana Costa",
        setor: "Casa de Máquinas",
        prazo: "Hoje, 11:00",
        status: "Concluída",
    },
    {
        id: "OS-204",
        titulo: "Inspeção de hidrantes e extintores do piso térreo",
        equipe: "Segurança Patrimonial",
        responsavel: "Carlos Oliveira",
        setor: "Corredor Norte",
        prazo: "Amanhã, 09:00",
        status: "Pendente",
    },
];

export default function EquipesAtividadesPage() {
    const [atividades, setAtividades] = useState<AtividadeEquipe[]>([]);
    const [titulo, setTitulo] = useState("");
    const [equipe, setEquipe] = useState("Manutenção Elétrica");
    const [responsavel, setResponsavel] = useState("");
    const [setor, setSetor] = useState("Praça de Alimentação");
    const [prazo, setPrazo] = useState("Hoje, 16:00");
    const [filtroEquipe, setFiltroEquipe] = useState("Todas");
    const [filtroStatus, setFiltroStatus] = useState("Todos");

    useEffect(() => {
        const salvas = localStorage.getItem(STORAGE_KEY);
        if (salvas) {
            setAtividades(JSON.parse(salvas));
        } else {
            setAtividades(atividadesIniciais);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(atividadesIniciais));
        }
    }, []);

    function salvarAtividades(novaLista: AtividadeEquipe[]) {
        setAtividades(novaLista);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    }

    function criarAtividade(e: FormEvent) {
        e.preventDefault();
        if (!titulo.trim() || !responsavel.trim()) return;

        const nova: AtividadeEquipe = {
            id: `OS-${Math.floor(205 + Math.random() * 790)}`,
            titulo: titulo.trim(),
            equipe,
            responsavel: responsavel.trim(),
            setor,
            prazo: prazo.trim() || "Hoje, 18:00",
            status: "Pendente",
        };

        salvarAtividades([nova, ...atividades]);
        setTitulo("");
        setResponsavel("");
    }

    function avancarStatus(id: string) {
        const ordem: StatusAtividade[] = ["Pendente", "Em Execução", "Concluída", "Cancelada"];
        const atualizada = atividades.map((item) => {
            if (item.id !== id) return item;
            const proximo = ordem[(ordem.indexOf(item.status) + 1) % ordem.length];
            return { ...item, status: proximo };
        });
        salvarAtividades(atualizada);
    }

    const filtradas = atividades.filter((item) => {
        const okEquipe = filtroEquipe === "Todas" || item.equipe === filtroEquipe;
        const okStatus = filtroStatus === "Todos" || item.status === filtroStatus;
        return okEquipe && okStatus;
    });

    const totalPendentes = atividades.filter((a) => a.status === "Pendente").length;
    const totalExecucao = atividades.filter((a) => a.status === "Em Execução").length;
    const totalConcluidas = atividades.filter((a) => a.status === "Concluída").length;

    function estiloBadgeStatus(status: StatusAtividade) {
        if (status === "Pendente") return { bg: "#fef3c7", text: "#92400e" };
        if (status === "Em Execução") return { bg: "#e0f2fe", text: "#075985" };
        if (status === "Concluída") return { bg: "#dcfce7", text: "#166534" };
        return { bg: "#fee2e2", text: "#991b1b" };
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
                                fontWeight: "bold",
                            }}
                        >
                            Equipes e Atividades
                        </h1>
                        <p style={{ margin: "4px 0 0", color: cores.textoSecundario, fontSize: "14px" }}>
                            Distribuição de ordens de serviço, atribuição de equipes e acompanhamento em campo
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
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#92400e" }}>
                            ATIVIDADES PENDENTES
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#92400e", marginTop: "6px" }}>
                            {totalPendentes}
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
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#075985" }}>
                            EM EXECUÇÃO
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#075985", marginTop: "6px" }}>
                            {totalExecucao}
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
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#166534" }}>
                            CONCLUÍDAS
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#166534", marginTop: "6px" }}>
                            {totalConcluidas}
                        </p>
                    </article>
                </div>
                {/* GRADE PRINCIPAL: FORMULÁRIO + TABELA DE ATIVIDADES */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(310px, 1fr) minmax(0, 1.8fr)",
                        gap: "30px",
                        alignItems: "start",
                    }}
                >
                    {/* FORMULÁRIO DE ATRIBUIÇÃO */}
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
                            Atribuir Nova Atividade
                        </h2>

                        <form
                            onSubmit={criarAtividade}
                            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
                        >
                            <div>
                                <label
                                    htmlFor="titulo"
                                    style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                                >
                                    Descrição da Ordem de Serviço *
                                </label>
                                <input
                                    id="titulo"
                                    type="text"
                                    required
                                    placeholder="Ex: Manutenção na escada rolante norte"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
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
                                    htmlFor="equipe"
                                    style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                                >
                                    Equipe Responsável
                                </label>
                                <select
                                    id="equipe"
                                    value={equipe}
                                    onChange={(e) => setEquipe(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "11px 14px",
                                        borderRadius: "10px",
                                        border: `1px solid ${cores.borda}`,
                                        background: "#fcfbf9",
                                    }}
                                >
                                    <option value="Manutenção Elétrica">Manutenção Elétrica</option>
                                    <option value="Climatização">Climatização</option>
                                    <option value="Hidráulica">Hidráulica</option>
                                    <option value="Limpeza e Conservação">Limpeza e Conservação</option>
                                    <option value="Segurança Patrimonial">Segurança Patrimonial</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="responsavel"
                                    style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                                >
                                    Colaborador Designado *
                                </label>
                                <input
                                    id="responsavel"
                                    type="text"
                                    required
                                    placeholder="Nome do técnico ou operador"
                                    value={responsavel}
                                    onChange={(e) => setResponsavel(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "11px 14px",
                                        borderRadius: "10px",
                                        border: `1px solid ${cores.borda}`,
                                        background: "#fcfbf9",
                                    }}
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label
                                        htmlFor="setor"
                                        style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                                    >
                                        Setor
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
                                        <option value="Praça de Alimentação">Praça de Alimentação</option>
                                        <option value="Corredor Norte">Corredor Norte</option>
                                        <option value="Corredor Sul">Corredor Sul</option>
                                        <option value="Subestação Elétrica">Subestação Elétrica</option>
                                        <option value="Casa de Máquinas">Casa de Máquinas</option>
                                        <option value="Estacionamento">Estacionamento</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="prazo"
                                        style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}
                                    >
                                        Prazo Estimado
                                    </label>
                                    <input
                                        id="prazo"
                                        type="text"
                                        value={prazo}
                                        onChange={(e) => setPrazo(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "11px 14px",
                                            borderRadius: "10px",
                                            border: `1px solid ${cores.borda}`,
                                            background: "#fcfbf9",
                                        }}
                                    />
                                </div>
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
                                Criar Ordem de Serviço
                            </button>
                        </form>
                    </section>
          {/* LISTA DE ATIVIDADES ATRIBUÍDAS */}
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
                Ordens de Serviço ({filtradas.length})
              </h2>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <select
                  aria-label="Filtrar por equipe"
                  value={filtroEquipe}
                  onChange={(e) => setFiltroEquipe(e.target.value)}
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
                  <option value="Todas">Todas as equipes</option>
                  <option value="Manutenção Elétrica">Manutenção Elétrica</option>
                  <option value="Climatização">Climatização</option>
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Limpeza e Conservação">Limpeza e Conservação</option>
                  <option value="Segurança Patrimonial">Segurança Patrimonial</option>
                </select>

                <select
                  aria-label="Filtrar por status"
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
                  <option value="Todos">Todos os status</option>
                  <option value="Pendente">Pendentes</option>
                  <option value="Em Execução">Em Execução</option>
                  <option value="Concluída">Concluídas</option>
                  <option value="Cancelada">Canceladas</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filtradas.map((item) => {
                const badge = estiloBadgeStatus(item.status);
                const cancelada = item.status === "Cancelada";

                return (
                  <article
                    key={item.id}
                    style={{
                      border: `1px solid ${cores.borda}`,
                      borderRadius: "14px",
                      padding: "18px",
                      background: cancelada ? "#f5f5f4" : "#fcfbf9",
                      opacity: cancelada ? 0.72 : 1,
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
                        {item.id} · {item.equipe} · {item.setor}
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

                    <h3
                      style={{
                        fontSize: "16px",
                        color: cores.texto,
                        marginBottom: "6px",
                        textDecoration: cancelada ? "line-through" : "none",
                      }}
                    >
                      {item.titulo}
                    </h3>

                    <p style={{ fontSize: "13px", color: cores.textoSecundario, marginBottom: "14px" }}>
                      Responsável: <strong>{item.responsavel}</strong> · Prazo: {item.prazo}
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
                      <span>Atribuído pela supervisão</span>

                      <button
                        type="button"
                        onClick={() => avancarStatus(item.id)}
                        title="Clique para atualizar o andamento da OS"
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
                        Atualizar status ↻
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
