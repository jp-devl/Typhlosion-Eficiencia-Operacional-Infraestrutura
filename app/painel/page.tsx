
import Link from "next/link";
import Image from "next/image";
import logoCapim from "../../assets/logo-capim-dourado.jpg";

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

const estiloCartao = {
  background: cores.branco,
  border: `1px solid ${cores.borda}`,
  borderRadius: "18px",
  padding: "30px",
  textDecoration: "none",
  color: cores.texto,
  boxShadow: "0 8px 25px rgba(68, 49, 15, 0.08)",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default function Painel() {
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
      {/* CABEÇALHO */}

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
              Capim Gestão
            </h1>
            <p style={{ margin: "4px 0 0", color: cores.textoSecundario, fontSize: "14px" }}>
              Capim Dourado Shopping · Gestão Operacional
            </p>
          </div>
        </div>

        <span
          style={{
            background: cores.bege,
            color: cores.marrom,
            padding: "10px 18px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          ● Ambiente demonstrativo
        </span>
      </header>


      {/* CONTEÚDO PRINCIPAL */}

      <section
        style={{
          maxWidth: "1250px",
          margin: "65px auto 0",
        }}
      >
        <p
          style={{
            color: cores.dourado,
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          CENTRAL DE CONTROLE
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            margin: "12px 0",
            color: cores.marrom,
            fontFamily: "Georgia, serif",
          }}
        >
          Bem-vindo
        </h2>

        <p
          style={{
            color: cores.textoSecundario,
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "650px",
          }}
        >
          Acesse os módulos de gestão e acompanhe as informações
          operacionais do shopping em um só lugar.
        </p>

        {/* CARTÕES DOS MÓDULOS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            marginTop: "45px",
          }}
        >
          {/* PLANTA DO SHOPPING */}

          <Link href="/planta" style={estiloCartao}>
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background: cores.bege,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                color: cores.marrom,
              }}
            >
              ⌖
            </div>

            <h3
              style={{
                fontSize: "22px",
                margin: "24px 0 10px",
                color: cores.marrom,
              }}
            >
              Planta do Shopping
            </h3>

            <p
              style={{
                color: cores.textoSecundario,
                lineHeight: 1.7,
                fontSize: "14px",
                minHeight: "48px",
              }}
            >
              Visualize os pavimentos, localize setores e acompanhe
              ocorrências na planta do shopping.
            </p>

            <p
              style={{
                color: cores.douradoEscuro,
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Acessar módulo →
            </p>
          </Link>

          {/* INFRAESTRUTURA */}

          <Link href="/infraestrutura" style={estiloCartao}>
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background: cores.bege,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "27px",
                color: cores.marrom,
              }}
            >
              ⚙
            </div>

            <h3
              style={{
                fontSize: "22px",
                margin: "24px 0 10px",
                color: cores.marrom,
              }}
            >
              Infraestrutura
            </h3>

            <p
              style={{
                color: cores.textoSecundario,
                lineHeight: 1.7,
                fontSize: "14px",
                minHeight: "48px",
              }}
            >
              Consulte equipamentos e acompanhe suas condições
              de funcionamento e manutenção.
            </p>

            <p
              style={{
                color: cores.douradoEscuro,
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Acessar módulo →
            </p>
          </Link>
          {/* GESTÃO DE OCORRÊNCIAS */}

          <Link href="/ocorrencias" style={estiloCartao}>
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background: cores.bege,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "27px",
                color: cores.marrom,
              }}
            >
              ⚑
            </div>

            <h3 style={{ fontSize: "22px", margin: "24px 0 10px", color: cores.marrom }}>
              Gestão de Ocorrências
            </h3>

            <p style={{ color: cores.textoSecundario, lineHeight: 1.7, fontSize: "14px", minHeight: "48px" }}>
              Registre problemas, classifique prioridades e acompanhe a resolução dos chamados operacionais.
            </p>

            <p style={{ color: cores.douradoEscuro, fontWeight: "bold", marginTop: "25px" }}>
              Acessar módulo →
            </p>
          </Link>

          {/* EQUIPES E ATIVIDADES */}
          <Link href="/equipes" style={estiloCartao}>
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background: cores.bege,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "27px",
                color: cores.marrom,
              }}
            >
              ⚒
            </div>

            <h3 style={{ fontSize: "22px", margin: "24px 0 10px", color: cores.marrom }}>
              Equipes e Atividades
            </h3>

            <p style={{ color: cores.textoSecundario, lineHeight: 1.7, fontSize: "14px", minHeight: "48px" }}>
              Distribua ordens de serviço, atribua responsáveis e acompanhe a execução em campo.
            </p>

            <p style={{ color: cores.douradoEscuro, fontWeight: "bold", marginTop: "25px" }}>
              Acessar módulo →
            </p>
          </Link>


        </div>
      </section>

      {/* RODAPÉ */}

      <footer
        style={{
          maxWidth: "1250px",
          margin: "100px auto 0",
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
