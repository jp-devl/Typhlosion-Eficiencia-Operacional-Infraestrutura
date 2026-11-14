
import Link from "next/link";

const estiloCartao = {
  background: "#ffffff",
  border: "1px solid #e5ebe6",
  borderRadius: "18px",
  padding: "30px",
  textDecoration: "none",
  color: "#26392e",
  boxShadow: "0 8px 25px rgba(31, 61, 42, 0.06)",
};

export default function Painel() {
  return (
    <main style={{
      width: "100%",
      maxWidth: "none",
      minHeight: "100vh",
      boxSizing: "border-box",
      margin: 0,
      padding: "35px 6%",
      background: "#f3f6f2",
      color: "#26392e",
      fontFamily: "Arial, sans-serif",
    }}>

      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        paddingBottom: "25px",
        borderBottom: "1px solid #e0e8e0",
      }}>
        <div>
          <h1 style={{
            fontSize: "30px",
            margin: 0,
            color: "#234b32",
          }}>
            Capim Gestão
          </h1>

          <p style={{
            margin: "7px 0 0",
            color: "#77877b",
            fontSize: "14px",
          }}>
            Capim Dourado Shopping · Gestão Operacional
          </p>
        </div>

        <span style={{
          background: "#e2eee4",
          color: "#347447",
          padding: "11px 18px",
          borderRadius: "30px",
          fontSize: "13px",
          fontWeight: "bold",
        }}>
          ● Ambiente demonstrativo
        </span>
      </header>

      <section style={{
        maxWidth: "1250px",
        margin: "65px auto 0",
      }}>
        <p style={{
          color: "#568064",
          fontSize: "13px",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}>
          CENTRAL DE CONTROLE
        </p>

        <h2 style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          margin: "12px 0",
          color: "#234b32",
        }}>
          Bem-vindo ao Capim Gestão
        </h2>

        <p style={{
          color: "#78877d",
          fontSize: "16px",
          lineHeight: 1.7,
          maxWidth: "650px",
        }}>
          Acesse os módulos de gestão e acompanhe as informações
          operacionais do shopping em um só lugar.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          marginTop: "45px",
        }}>

          <Link href="/planta" style={estiloCartao}>
            <div style={{
              width: "55px",
              height: "55px",
              borderRadius: "14px",
              background: "#e8f2e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}>
              ⌖
            </div>

            <h3 style={{
              fontSize: "22px",
              margin: "24px 0 10px",
            }}>
              Planta do Shopping
            </h3>

            <p style={{
              color: "#77877b",
              lineHeight: 1.7,
              fontSize: "14px",
              minHeight: "48px",
            }}>
              Visualize os pavimentos, localize setores e acompanhe
              ocorrências na planta do shopping.
            </p>

            <p style={{
              color: "#347447",
              fontWeight: "bold",
              marginTop: "25px",
            }}>
              Acessar módulo →
            </p>
          </Link>

          <div style={{
            ...estiloCartao,
            opacity: 0.8,
          }}>
            <div style={{
              width: "55px",
              height: "55px",
              borderRadius: "14px",
              background: "#edf0ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "27px",
            }}>
              ⚙
            </div>

            <h3 style={{
              fontSize: "22px",
              margin: "24px 0 10px",
            }}>
              Infraestrutura
            </h3>

            <p style={{
              color: "#77877b",
              lineHeight: 1.7,
              fontSize: "14px",
              minHeight: "48px",
            }}>
              Consulte equipamentos e acompanhe suas condições
              de funcionamento e manutenção.
            </p>

            <p style={{
              color: "#8b968e",
              fontWeight: "bold",
              marginTop: "25px",
            }}>
              Em desenvolvimento
            </p>
          </div>

        </div>
      </section>

      <footer style={{
        maxWidth: "1250px",
        margin: "100px auto 0",
        padding: "20px 0",
        borderTop: "1px solid #e0e8e0",
        color: "#89958d",
        fontSize: "13px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        <span>Capim Gestão · Capim Dourado Shopping</span>
        <span>Protótipo demonstrativo · Equipe Typhlosion</span>
      </footer>

    </main>
  );
}
