"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

interface Ocorrencia {
    id: string;
    titulo: string;
    setor: string;
    categoria: string;
    prioridade: "Baixa" | "Média" | "Alta" | "Crítica";
    status: "Aberta" | "Em Andamento" | "Resolvida";
    descricao: string;
    dataRegistro: string;
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

const STORAGE_KEY = "capim_gestao_ocorrencias";

const ocorrenciasIniciais: Ocorrencia[] = [
    {
        id: "OC-101",
        titulo: "Oscilação de temperatura no Chiller 02",
        setor: "Casa de Máquinas",
        categoria: "Climatização",
        prioridade: "Crítica",
        status: "Em Andamento",
        descricao: "Sensor acusando elevação térmica acima do padrão no setor norte.",
        dataRegistro: "14/11/2026 08:40",
    },
    {
        id: "OC-102",
        titulo: "Lâmpada LED queimada no corredor principal",
        setor: "Corredor Norte",
        categoria: "Elétrica",
        prioridade: "Baixa",
        status: "Aberta",
        descricao: "Luminária próxima à loja âncora apresentando falha intermitente.",
        dataRegistro: "14/11/2026 09:15",
    },
    {
        id: "OC-103",
        titulo: "Vazamento leve em torneira temporizada",
        setor: "Sanitários",
        categoria: "Hidráulica",
        prioridade: "Média",
        status: "Resolvida",
        descricao: "Válvula substituída pela equipe de manutenção predial.",
        dataRegistro: "13/11/2026 17:30",
    },
];

export default function GestaoOcorrencias() {
    const [listaOcorrencias, setListaOcorrencias] = useState<Ocorrencia[]>([]);
    const [titulo, setTitulo] = useState("");
    const [setor, setSetor] = useState("Praça de Alimentação");
    const [categoria, setCategoria] = useState("Elétrica");
    const [prioridade, setPrioridade] = useState<Ocorrencia["prioridade"]>("Média");
    const [descricao, setDescricao] = useState("");
    const [filtroStatus, setFiltroStatus] = useState<string>("Todas");

    useEffect(() => {
        const salvas = localStorage.getItem(STORAGE_KEY);
        if (salvas) {
            setListaOcorrencias(JSON.parse(salvas));
        } else {
            setListaOcorrencias(ocorrenciasIniciais);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrenciasIniciais));
        }
    }, []);

    function salvarNoStorage(novaLista: Ocorrencia[]) {
        setListaOcorrencias(novaLista);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    }

    function registrarOcorrencia(evento: FormEvent) {
        evento.preventDefault();
        if (!titulo.trim()) return;

        const novaOcorrencia: Ocorrencia = {
            id: `OC-${Math.floor(104 + Math.random() * 895)}`,
            titulo: titulo.trim(),
            setor,
            categoria,
            prioridade,
            status: "Aberta",
            descricao: descricao.trim() || "Sem observações adicionais.",
            dataRegistro: new Date().toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        salvarNoStorage([novaOcorrencia, ...listaOcorrencias]);
        setTitulo("");
        setDescricao("");
    }

    function alternarStatus(id: string) {
        const ordemStatus: Ocorrencia["status"][] = ["Aberta", "Em Andamento", "Resolvida"];
        const atualizada = listaOcorrencias.map((item) => {
            if (item.id !== id) return item;
            const proximoIndice = (ordemStatus.indexOf(item.status) + 1) % ordemStatus.length;
            return { ...item, status: ordemStatus[proximoIndice] };
        });
        salvarNoStorage(atualizada);
    }

    const ocorrenciasFiltradas =
        filtroStatus === "Todas"
            ? listaOcorrencias
            : listaOcorrencias.filter((item) => item.status === filtroStatus);

    const totalAbertas = listaOcorrencias.filter((o) => o.status !== "Resolvida").length;
    const totalCriticas = listaOcorrencias.filter(
        (o) => o.prioridade === "Crítica" && o.status !== "Resolvida"
    ).length;
    const totalResolvidas = listaOcorrencias.filter((o) => o.status === "Resolvida").length;

    function obterCorPrioridade(nivel: Ocorrencia["prioridade"]) {
        if (nivel === "Crítica") return { bg: "#fee2e2", text: "#991b1b" };
        if (nivel === "Alta") return { bg: "#ffedd5", text: "#9a3412" };
        if (nivel === "Média") return { bg: "#fef3c7", text: "#92400e" };
        return { bg: "#e0f2fe", text: "#075985" };
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
            {/* CABEÇALHO DO MÓDULO (SEM REPETIÇÃO + LOGO OFICIAL) */}
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
                            Gestão de Ocorrências
                        </h1>
                        <p style={{ margin: "4px 0 0", color: cores.textoSecundario, fontSize: "14px" }}>
                            Registro, classificação e acompanhamento de chamados operacionais
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
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                        marginBottom: "35px",
                    }}
                >
                    <article style={{ background: cores.branco, border: `1px solid ${cores.borda}`, borderRadius: "16px", padding: "22px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: cores.textoSecundario }}>CHAMADOS ATIVOS</span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: cores.marrom, marginTop: "6px" }}>{totalAbertas}</p>
                    </article>

                    <article style={{ background: cores.branco, border: `1px solid ${cores.borda}`, borderRadius: "16px", padding: "22px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#991b1b" }}>PRIORIDADE CRÍTICA</span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#991b1b", marginTop: "6px" }}>{totalCriticas}</p>
                    </article>

                    <article style={{ background: cores.branco, border: `1px solid ${cores.borda}`, borderRadius: "16px", padding: "22px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#166534" }}>OCORRÊNCIAS RESOLVIDAS</span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#166534", marginTop: "6px" }}>{totalResolvidas}</p>
                    </article>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "30px",
                        alignItems: "start",
                    }}
                >
                    <section
                        style={{
                            background: cores.branco,
                            border: `1px solid ${cores.borda}`,
                            borderRadius: "18px",
                            padding: "28px",
                            boxShadow: "0 8px 25px rgba(68, 49, 15, 0.06)",
                        }}
                    >
                        <h2 style={{ fontSize: "20px", color: cores.marrom, fontFamily: "Georgia, serif", marginBottom: "18px" }}>
                            Registrar Nova Ocorrência
                        </h2>

                        <form onSubmit={registrarOcorrencia} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <label htmlFor="titulo" style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                    Título do Problema *
                                </label>
                                <input
                                    id="titulo"
                                    type="text"
                                    required
                                    placeholder="Ex: Vazamento próximo à Praça de Alimentação"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${cores.borda}`, background: "#fcfbf9" }}
                                />
                            </div>

                            <div>
                                <label htmlFor="setor" style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                    Setor / Localização
                                </label>
                                <select
                                    id="setor"
                                    value={setor}
                                    onChange={(e) => setSetor(e.target.value)}
                                    style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${cores.borda}`, background: "#fcfbf9" }}
                                >
                                    <option value="Praça de Alimentação">Praça de Alimentação</option>
                                    <option value="Corredor Norte">Corredor Norte</option>
                                    <option value="Corredor Sul">Corredor Sul</option>
                                    <option value="Estacionamento">Estacionamento</option>
                                    <option value="Sanitários">Sanitários</option>
                                    <option value="Casa de Máquinas">Casa de Máquinas</option>
                                </select>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label htmlFor="categoria" style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                        Categoria
                                    </label>
                                    <select
                                        id="categoria"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${cores.borda}`, background: "#fcfbf9" }}
                                    >
                                        <option value="Elétrica">Elétrica</option>
                                        <option value="Hidráulica">Hidráulica</option>
                                        <option value="Climatização">Climatização</option>
                                        <option value="Limpeza">Limpeza</option>
                                        <option value="Segurança">Segurança</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="prioridade" style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                        Prioridade
                                    </label>
                                    <select
                                        id="prioridade"
                                        value={prioridade}
                                        onChange={(e) => setPrioridade(e.target.value as Ocorrencia["prioridade"])}
                                        style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${cores.borda}`, background: "#fcfbf9" }}
                                    >
                                        <option value="Baixa">Baixa</option>
                                        <option value="Média">Média</option>
                                        <option value="Alta">Alta</option>
                                        <option value="Crítica">Crítica</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="descricao" style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                    Detalhes Operacionais
                                </label>
                                <textarea
                                    id="descricao"
                                    rows={3}
                                    placeholder="Descreva informações úteis para a equipe de manutenção..."
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${cores.borda}`, background: "#fcfbf9", fontFamily: "inherit" }}
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
                                Registrar Ocorrência
                            </button>
                        </form>
                    </section>
                    {/* LISTA DE CHAMADOS */}
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
                                Ocorrências Registradas ({ocorrenciasFiltradas.length})
                            </h2>

                            <select
                                aria-label="Filtrar ocorrências por status"
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
                                <option value="Todas">Todas</option>
                                <option value="Aberta">Abertas</option>
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Resolvida">Resolvidas</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {ocorrenciasFiltradas.map((item) => {
                                const badge = obterCorPrioridade(item.prioridade);
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
                                                {item.prioridade}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: "16px", color: cores.texto, marginBottom: "6px" }}>
                                            {item.titulo}
                                        </h3>

                                        <p style={{ fontSize: "13px", color: cores.textoSecundario, marginBottom: "14px" }}>
                                            {item.descricao}
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
                                            <span>Registrado em {item.dataRegistro}</span>

                                            <button
                                                type="button"
                                                onClick={() => alternarStatus(item.id)}
                                                title="Clique para avançar o status"
                                                style={{
                                                    background: item.status === "Resolvida" ? "#dcfce7" : cores.bege,
                                                    color: item.status === "Resolvida" ? "#166534" : cores.marrom,
                                                    border: "none",
                                                    padding: "6px 12px",
                                                    borderRadius: "999px",
                                                    fontWeight: "bold",
                                                    cursor: "pointer",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Status: {item.status} ↻
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
