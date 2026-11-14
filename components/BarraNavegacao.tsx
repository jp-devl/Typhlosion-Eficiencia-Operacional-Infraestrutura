
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { nome: "Início", rota: "/painel" },
  { nome: "Planta do Shopping", rota: "/planta" },
  { nome: "Infraestrutura", rota: "/infraestrutura" },
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
        <Link href="/painel" className="capim-navbar-brand">

          <span className="capim-navbar-brand-text">
            <strong>Capim Gestão</strong>
            <small>Capim Dourado Shopping</small>
          </span>
        </Link>

        <div className="capim-navbar-links">
          {links.map((link) => {
            const ativo = pathname === link.rota;

            return (
              <Link
                key={link.rota}
                href={link.rota}
                className={`capim-navbar-link ${
                  ativo ? "capim-navbar-link-active" : ""
                }`}
                aria-current={ativo ? "page" : undefined}
              >
                {link.nome}
              </Link>
            );
          })}
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
          min-height: 82px;
          padding: 12px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: #96712f;
          border-bottom: 3px solid #b4903d;
          box-shadow: 0 5px 20px rgba(41, 33, 20, 0.18);
        }

        .capim-navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .capim-navbar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 65px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  overflow: visible;
  flex-shrink: 0;
  filter: none;
}

        .capim-navbar-brand-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .capim-navbar-brand-text strong {
          color: #ffffff;
          font-family: Georgia, serif;
          font-size: 22px;
          font-style: italic;
        }

        .capim-navbar-brand-text small {
          color: #f3ead6;
          font-size: 11px;
          letter-spacing: 0.4px;
        }

        .capim-navbar-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .capim-navbar-link {
          color: #f3ead6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 16px;
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

        @media (max-width: 700px) {
          .capim-navbar {
            flex-direction: column;
            align-items: flex-start;
            padding: 12px 18px;
            gap: 12px;
          }

          .capim-navbar-links {
            width: 100%;
            gap: 4px;
          }

          .capim-navbar-link {
            font-size: 12px;
            padding: 10px 12px;
          }

          .capim-navbar-brand-text strong {
            font-size: 19px;
          }
        }
      `}</style>
    </>
  );
}
