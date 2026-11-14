"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { nome: "Início", rota: "/painel" },
  { nome: "Planta do Shopping", rota: "/planta" },
  { nome: "Infraestrutura", rota: "/infraestrutura" },
  { nome: "Ocorrências", rota: "/ocorrencias" },
  { nome: "Equipes e Atividades", rota: "/equipes" },
];


export default function BarraNavegacao() {
  const pathname = usePathname();

  // Não exibir a barra na tela de login.
  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <nav className="capim-navbar" aria-label="Navegação principal">
        <div className="capim-navbar-links">
          {links.map((link) => {
            const ativo = pathname === link.rota;

            return (
              <Link
                key={link.rota}
                href={link.rota}
                className={`capim-navbar-link ${ativo ? "capim-navbar-link-active" : ""
                  }`}
                aria-current={ativo ? "page" : undefined}
              >
                {link.nome}
              </Link>
            );
          })}

          <Link
            href="/"
            className="capim-navbar-logout"
            title="Encerrar sessão e voltar ao login"
          >
            Sair ↪
          </Link>
        </div>

      </nav>

      <style jsx global>{`
        body:has(.capim-navbar) {
          display: block;
          padding: 0;
        }

        .capim-navbar {
          position: sticky;
          top: 0;
          z-index: 999;
          width: 100%;
          min-height: 68px;
          padding: 10px 6%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 24px;
          background: #96712f;
          border-bottom: 3px solid #b4903d;
          box-shadow: 0 5px 20px rgba(41, 33, 20, 0.18);
        }

        .capim-navbar-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .capim-navbar-link {
          color: #f3ead6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 9px;
          transition: background 0.2s, color 0.2s;
        }

        .capim-navbar-link:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .capim-navbar-link-active {
          background: #b4903d;
          color: #ffffff;
        }

                .capim-navbar-logout {
          margin-left: 8px;
          color: #ffffff;
          background: rgba(41, 33, 20, 0.28);
          border: 1px solid rgba(243, 234, 214, 0.35);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          padding: 9px 15px;
          border-radius: 999px;
          transition: background 0.2s, border-color 0.2s;
        }

        .capim-navbar-logout:hover {
          background: rgba(41, 33, 20, 0.48);
          border-color: #ffffff;
        }


        @media (max-width: 700px) {
          .capim-navbar {
            justify-content: flex-start;
            padding: 12px 18px;
          }

          .capim-navbar-links {
            width: 100%;
            gap: 4px;
          }

          .capim-navbar-link {
            font-size: 12px;
            padding: 9px 12px;
          }
        }
      `}</style>
    </>
  );
}
