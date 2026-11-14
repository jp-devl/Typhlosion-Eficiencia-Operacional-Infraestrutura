"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { nome: "Início", rota: "/painel" },
  { nome: "Planta do Shopping", rota: "/planta" },
  { nome: "Infraestrutura", rota: "/infraestrutura" },
  { nome: "Ocorrências", rota: "/ocorrencias" },
  { nome: "Equipes", rota: "/equipes" },
];

const perfisDisponiveis = [
  "Supervisor Operacional",
  "Administrador do Shopping",
  "Equipe de Manutenção",
];

export default function BarraNavegacao() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarPerfis, setMostrarPerfis] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "João Pedro",
    email: "joao.pedro@capimdourado.com.br",
    perfil: "Supervisor Operacional",
    inicial: "J",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("capim_gestao_usuario");
      if (salvo) {
        const dados = JSON.parse(salvo);
        const emailUsuario = dados.email || "supervisor@capimdourado.com.br";
        const prefixo = emailUsuario.split("@")[0];
        const nomeExtraido = prefixo
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase());

        setUsuario({
          nome: nomeExtraido,
          email: emailUsuario,
          perfil: dados.perfil || "Supervisor Operacional",
          inicial: nomeExtraido.charAt(0).toUpperCase() || "C",
        });
      }
    } catch {
      // Mantém perfil padrão demonstrativo
    }
  }, [pathname]);

  useEffect(() => {
    function fecharAoClicarFora(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
        setMostrarPerfis(false);
      }
    }
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  if (pathname === "/") {
    return null;
  }

  function trocarPerfil(novoPerfil: string) {
    const atualizado = { ...usuario, perfil: novoPerfil };
    setUsuario(atualizado);
    localStorage.setItem(
      "capim_gestao_usuario",
      JSON.stringify({ email: atualizado.email, perfil: novoPerfil })
    );
    setMostrarPerfis(false);
    setMenuAberto(false);
  }

  function encerrarSessao() {
    localStorage.removeItem("capim_gestao_usuario");
    setMenuAberto(false);
    setMostrarPerfis(false);
    router.push("/");
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

          <div className="capim-profile-wrapper" ref={menuRef}>
            <button
              type="button"
              className="capim-avatar-btn"
              onClick={() => {
                setMenuAberto(!menuAberto);
                setMostrarPerfis(false);
              }}
              aria-expanded={menuAberto}
              aria-label="Abrir menu da conta"
              title="Conta e sessão"
            >
              {usuario.inicial}
            </button>

            {menuAberto && (
              <div className="capim-profile-dropdown" role="menu">
                <div className="capim-dropdown-header">
                  <div className="capim-dropdown-avatar">{usuario.inicial}</div>
                  <div className="capim-dropdown-user">
                    <strong>{usuario.nome}</strong>
                    <span>{usuario.email}</span>
                    <small>{usuario.perfil}</small>
                  </div>
                </div>

                <div className="capim-dropdown-divider" />

                <button
                  type="button"
                  className="capim-dropdown-item"
                  onClick={() => setMostrarPerfis(!mostrarPerfis)}
                  role="menuitem"
                >
                  <span className="capim-dropdown-icon">⇄</span>
                  <span style={{ flex: 1 }}>Mudar de conta</span>
                  <span style={{ fontSize: "12px", color: "#6b5e4c" }}>
                    {mostrarPerfis ? "▲" : "▼"}
                  </span>
                </button>

                {mostrarPerfis && (
                  <div className="capim-subperfil-lista">
                    {perfisDisponiveis.map((cargo) => {
                      const selecionado = usuario.perfil === cargo;
                      return (
                        <button
                          key={cargo}
                          type="button"
                          className={`capim-subperfil-item ${selecionado ? "ativo" : ""
                            }`}
                          onClick={() => trocarPerfil(cargo)}
                        >
                          <span>{cargo}</span>
                          {selecionado && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                <button
                  type="button"
                  className="capim-dropdown-item capim-dropdown-logout"
                  onClick={encerrarSessao}
                  role="menuitem"
                >
                  <span className="capim-dropdown-icon">↪</span>
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
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

        .capim-profile-wrapper {
          position: relative;
          margin-left: 8px;
        }

        .capim-avatar-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3ead6;
          color: #78581e;
          border: 2px solid #ffffff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(41, 33, 20, 0.22);
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .capim-avatar-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(41, 33, 20, 0.32);
        }

        .capim-profile-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 295px;
          background: #ffffff;
          border: 1px solid #e2d9c8;
          border-radius: 16px;
          box-shadow: 0 18px 36px rgba(41, 33, 20, 0.22);
          padding: 14px 0;
          z-index: 1000;
          color: #292114;
        }

        .capim-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 4px 18px 14px;
        }

        .capim-dropdown-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #b4903d;
          color: #ffffff;
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .capim-dropdown-user {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .capim-dropdown-user strong {
          font-size: 15px;
          color: #292114;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .capim-dropdown-user span {
          font-size: 12px;
          color: #6b5e4c;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .capim-dropdown-user small {
          display: inline-block;
          margin-top: 5px;
          background: #f3ead6;
          color: #78581e;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          width: fit-content;
        }

        .capim-dropdown-divider {
          height: 1px;
          background: #e2d9c8;
          margin: 4px 0 8px;
        }

        .capim-dropdown-item {
          width: 100%;
          background: transparent;
          border: none;
          padding: 11px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #292114;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
        }

        .capim-dropdown-item:hover {
          background: #f8f5ee;
        }

        .capim-subperfil-lista {
          background: #fcfbf9;
          border-top: 1px solid #f3ead6;
          border-bottom: 1px solid #f3ead6;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .capim-subperfil-item {
          width: 100%;
          background: transparent;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
          color: #292114;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
        }

        .capim-subperfil-item:hover {
          background: #f3ead6;
        }

        .capim-subperfil-item.ativo {
          background: #f3ead6;
          color: #78581e;
          font-weight: 700;
        }

        .capim-dropdown-logout {
          color: #991b1b;
        }

        .capim-dropdown-logout:hover {
          background: #fef2f2;
        }

        .capim-dropdown-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
          color: #8c6a26;
        }

        .capim-dropdown-logout .capim-dropdown-icon {
          color: #991b1b;
        }

        @media (max-width: 700px) {
          .capim-navbar {
            justify-content: space-between;
            padding: 12px 18px;
          }

          .capim-navbar-links {
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
