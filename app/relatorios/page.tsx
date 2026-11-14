"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface RegistroHistorico {
    id: string;
    tipo: "Ocorrência" | "Infraestrutura" | "Equipe";
    titulo: string;
    setor: string;
    responsavelOuCategoria: string;
    status: string;
    data: string;
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

const historicoPadrao: RegistroHistorico[] = [
    {
        id: "OC-101",
        tipo: "Ocorrência",
        titulo: "Oscilação de temperatura no Chiller 02",
        setor: "Casa de Máquinas",
        responsavelOuCategoria: "Climatização",
        status: "Em Andamento",
        data: "14/11/2026",
    },
    {
        id: "EQ-01",
        tipo: "Infraestrutura",
        titulo: "Chiller Central 01 (CAG)",
        setor: "Casa de Máquinas",
        responsavelOuCategoria: "Climatização",
        status: "Operacional",
        data: "14/11/2026",
    },
    {
        id: "OS-201",
        tipo: "Equipe",
        titulo: "Revisão preventiva do quadro elétrico central",
        setor: "Subestação Elétrica",
        responsavelOuCategoria: "Marcos Silva (Manutenção Elétrica)",
        status: "Em Execução",
        data: "14/11/2026",
    },
    {
        id: "OC-103",
        tipo: "Ocorrência",
        titulo: "Vazamento leve em torneira temporizada",
        setor: "Sanitários",
        responsavelOuCategoria: "Hidráulica",
        status: "Resolvida",
        data: "13/11/2026",
    },
    {
        id: "OS-203",
        tipo: "Equipe",
        titulo: "Calibração de sensores de temperatura do Chiller 02",
        setor: "Casa de Máquinas",
        responsavelOuCategoria: "Juliana Costa (Climatização)",
        status: "Concluída",
        data: "13/11/2026",
    },
];

export default function RelatoriosPage() {
    const [registros, setRegistros] = useState<RegistroHistorico[]>(historicoPadrao);
    const [filtroModulo, setFiltroModulo] = useState<string>("Todos");
    const [busca, setBusca] = useState("");
    const [mensagemExportacao, setMensagemExportacao] = useState("");

    useEffect(() => {
        try {
            const ocorr = JSON.parse(localStorage.getItem("capim_gestao_ocorrencias") || "[]");
            const infra = JSON.parse(localStorage.getItem("capim_gestao_infraestrutura") || "[]");
            const equip = JSON.parse(localStorage.getItem("capim_gestao_equipes_atividades") || "[]");

            const consolidado: RegistroHistorico[] = [];

            ocorr.forEach((o: { id: string; titulo: string; setor: string; categoria: string; status: string; dataRegistro?: string }) => {
                consolidado.push({
                    id: o.id,
                    tipo: "Ocorrência",
                    titulo: o.titulo,
                    setor: o.setor,
                    responsavelOuCategoria: o.categoria,
                    status: o.status,
                    data: o.dataRegistro || "14/11/2026",
                });
            });

            infra.forEach((e: { id: string; nome: string; setor: string; categoria: string; status: string; ultimaInspecao?: string }) => {
                consolidado.push({
                    id: e.id,
                    tipo: "Infraestrutura",
                    titulo: e.nome,
                    setor: e.setor,
                    responsavelOuCategoria: e.categoria,
                    status: e.status,
                    data: e.ultimaInspecao || "14/11/2026",
                });
            });

            equip.forEach((a: { id: string; titulo: string; setor: string; responsavel: string; equipe: string; status: string; prazo?: string }) => {
                consolidado.push({
                    id: a.id,
                    tipo: "Equipe",
                    titulo: a.titulo,
                    setor: a.setor,
                    responsavelOuCategoria: `${a.responsavel} (${a.equipe})`,
                    status: a.status,
                    data: a.prazo || "14/11/2026",
                });
            });

            if (consolidado.length > 0) {
                setRegistros(consolidado);
            }
        } catch {
            // Mantém histórico padrão demonstrativo
        }
    }, []);

    const filtrados = registros.filter((item) => {
        const okModulo = filtroModulo === "Todos" || item.tipo === filtroModulo;
        const termo = busca.toLowerCase();
        const okBusca =
            item.titulo.toLowerCase().includes(termo) ||
            item.setor.toLowerCase().includes(termo) ||
            item.id.toLowerCase().includes(termo);
        return okModulo && okBusca;
    });

    const totalGeral = registros.length;
    const totalConcluidos = registros.filter((r) =>
        ["Resolvida", "Concluída", "Operacional"].includes(r.status)
    ).length;
    const taxaResolucao = totalGeral > 0 ? Math.round((totalConcluidos / totalGeral) * 100) : 0;

    function exportarRelatorio() {
        setMensagemExportacao("Relatório gerencial consolidado pronto para impressão (Ctrl + P).");
        setTimeout(() => window.print(), 300);
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
                            Relatórios e Indicadores
                        </h1>
                        <p style={{ margin: "4px 0 0", color: cores.textoSecundario, fontSize: "14px" }}>
                            Histórico consolidado, métricas de eficiência e desempenho operacional do shopping
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                        type="button"
                        onClick={exportarRelatorio}
                        style={{
                            background: `linear-gradient(90deg, ${cores.dourado} 0%, ${cores.douradoEscuro} 100%)`,
                            color: cores.branco,
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "30px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        ⎙ Imprimir / Exportar PDF
                    </button>

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
                </div>
            </header>

            <section style={{ maxWidth: "1250px", margin: "40px auto 0" }}>
                {mensagemExportacao && (
                    <p
                        role="status"
                        style={{
                            background: cores.bege,
                            color: cores.marrom,
                            padding: "12px 18px",
                            borderRadius: "12px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            border: `1px solid ${cores.borda}`,
                        }}
                    >
                        {mensagemExportacao}
                    </p>
                )}

                {/* RESUMO DE INDICADORES GERENCIAIS */}
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
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: cores.textoSecundario }}>
                            TOTAL DE REGISTROS AUDITADOS
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: cores.marrom, marginTop: "6px" }}>
                            {totalGeral}
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
                            ITENS CONCLUÍDOS / OPERACIONAIS
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#166534", marginTop: "6px" }}>
                            {totalConcluidos}
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
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: cores.douradoEscuro }}>
                            ÍNDICE DE EFICIÊNCIA GERAL
                        </span>
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: cores.douradoEscuro, marginTop: "6px" }}>
                            {taxaResolucao}%
                        </p>
                    </article>
                </div>

                {/* BARRAS DE DESEMPENHO POR ÁREA */}
                <section
                    style={{
                        background: cores.branco,
                        border: `1px solid ${cores.borda}`,
                        borderRadius: "18px",
                        padding: "26px",
                        marginBottom: "30px",
                        boxShadow: "0 8px 25px rgba(68, 49, 15, 0.05)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "19px",
                            color: cores.marrom,
                            fontFamily: "Georgia, serif",
                            marginBottom: "18px",
                        }}
                    >
                        Desempenho Operacional por Pilar
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                        {[
                            { nome: "Climatização e Energia", percentual: 92, cor: "#166534" },
                            { nome: "Manutenção Predial e Hidráulica", percentual: 84, cor: cores.douradoEscuro },
                            { nome: "Limpeza e Conservação", percentual: 96, cor: "#075985" },
                        ].map((pilar) => (
                            <div key={pilar.nome}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "bold", marginBottom: "6px" }}>
                                    <span>{pilar.nome}</span>
                                    <span style={{ color: pilar.cor }}>{pilar.percentual}%</span>
                                </div>
                                <div style={{ width: "100%", height: "10px", background: cores.bege, borderRadius: "999px", overflow: "hidden" }}>
                                    <div style={{ width: `${pilar.percentual}%`, height: "100%", background: pilar.cor, borderRadius: "999px" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* TABELA DE HISTÓRICO CONSOLIDADO (RF09) */}
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
                            Histórico Consolidado de Operações ({filtrados.length})
                        </h2>

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <input
                                type="text"
                                aria-label="Buscar no histórico"
                                placeholder="Buscar por código, título ou setor..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "999px",
                                    border: `1px solid ${cores.borda}`,
                                    background: "#fcfbf9",
                                    fontSize: "13px",
                                    minWidth: "230px",
                                }}
                            />

                            <select
                                aria-label="Filtrar histórico por módulo"
                                value={filtroModulo}
                                onChange={(e) => setFiltroModulo(e.target.value)}
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
                                <option value="Todos">Todos os módulos</option>
                                <option value="Ocorrência">Ocorrências</option>
                                <option value="Infraestrutura">Infraestrutura</option>
                                <option value="Equipe">Equipes e Atividades</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: cores.bege, color: cores.marrom }}>
                                    <th style={{ padding: "12px 14px", borderRadius: "10px 0 0 10px" }}>Código</th>
                                    <th style={{ padding: "12px 14px" }}>Módulo</th>
                                    <th style={{ padding: "12px 14px" }}>Descrição / Ativo</th>
                                    <th style={{ padding: "12px 14px" }}>Setor</th>
                                    <th style={{ padding: "12px 14px" }}>Categoria / Responsável</th>
                                    <th style={{ padding: "12px 14px" }}>Data / Prazo</th>
                                    <th style={{ padding: "12px 14px", borderRadius: "0 10px 10px 0" }}>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map((item) => (
                                    <tr key={`${item.tipo}-${item.id}`} style={{ borderBottom: `1px solid ${cores.borda}` }}>
                                        <td style={{ padding: "14px", fontWeight: "bold", color: cores.douradoEscuro }}>
                                            {item.id}
                                        </td>
                                        <td style={{ padding: "14px" }}>
                                            <span
                                                style={{
                                                    background: cores.bege,
                                                    color: cores.marrom,
                                                    padding: "4px 10px",
                                                    borderRadius: "999px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {item.tipo}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px", fontWeight: "600", color: cores.texto }}>
                                            {item.titulo}
                                        </td>
                                        <td style={{ padding: "14px", color: cores.textoSecundario }}>{item.setor}</td>
                                        <td style={{ padding: "14px", color: cores.textoSecundario }}>
                                            {item.responsavelOuCategoria}
                                        </td>
                                        <td style={{ padding: "14px", color: cores.textoSecundario }}>{item.data}</td>
                                        <td style={{ padding: "14px", fontWeight: "bold", color: cores.marrom }}>
                                            {item.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
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
