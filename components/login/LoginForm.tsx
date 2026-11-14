
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoCapim from "../../assets/logo-capim-dourado.jpg";
import styles from "./LoginForm.module.css";

const perfis = [
  "Supervisor Operacional",
  "Administrador do Shopping",
  "Equipe de Manutenção",
];

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState(perfis[0]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [manterConectado, setManterConectado] = useState(true);
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(
      "capim_gestao_usuario",
      JSON.stringify({
        email: email.trim(),
        perfil: perfil,
      })
    );
    router.push("/painel");
  }

  return (
    <main className={styles.splitCard}>
      <section className={styles.welcomePanel}>
        <div className={styles.logoWrapper}>
          <Image
            src={logoCapim}
            alt="Logo Capim Dourado Shopping"
            priority
          />
        </div>

        <span className={styles.brandFooterTag}>
          Palmas • Tocantins
        </span>
      </section>

      <section className={styles.formPanel}>
        <header>
          <span className={styles.eyebrow}>
            Portal Administrativo
          </span>

          <h1>Capim Gestão</h1>

          <div className={styles.pillarsBar}>
            <span>Infraestrutura</span>
            <span className={styles.dot} />
            <span>Ocorrências</span>
            <span className={styles.dot} />
            <span>Operações</span>
          </div>

          <span className={styles.sub}>Acesso ao Sistema</span>
        </header>

        <form onSubmit={handleSubmit}>
          {/* Campo de e-mail */}
          <div className={styles.inputPill}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>

            <input
              type="email"
              placeholder="E-mail"
              aria-label="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

          </div>

          {/* Campo de senha */}
          <div className={styles.inputPill}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type="password"
              placeholder="Senha de acesso"
              aria-label="Senha de acesso"
              required
            />
          </div>

          {/* Seleção de perfil */}
          <div className={styles.inputPill}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>

            <div className={styles.customSelect}>
              <button
                type="button"
                className={styles.selectTrigger}
                onClick={() => setMenuAberto(!menuAberto)}
                aria-expanded={menuAberto}
              >
                {perfil}

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {menuAberto && (
                <ul className={styles.selectOptions}>
                  {perfis.map((opcao) => (
                    <li key={opcao}>
                      <button
                        type="button"
                        onClick={() => {
                          setPerfil(opcao);
                          setMenuAberto(false);
                        }}
                      >
                        {opcao}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.optionsRow}>
            <label>
              <input
                type="checkbox"
                checked={manterConectado}
                onChange={(event) =>
                  setManterConectado(event.target.checked)
                }
              />
              Manter conectado
            </label>

            <button
              type="button"
              className={styles.forgotLink}
              onClick={() =>
                setMensagem(
                  "A recuperação de senha será disponibilizada posteriormente."
                )
              }
            >
              Esqueci minha senha
            </button>
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Acessar Painel
          </button>

          {mensagem && (
            <p role="status">{mensagem}</p>
          )}
        </form>

        <div className={styles.socialSection}>
          <div className={styles.socialDivider}>
            Ou entre com
          </div>

          <div className={styles.socialButtons}>
            {/* Botão Google */}
            <button
              type="button"
              className={styles.btnSocial}
              aria-label="Entrar com Google"
              onClick={() =>
                setMensagem("Integração com Google ainda não disponível.")
              }
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.7 12.3c0-.7-.1-1.4-.2-2.1H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3h3.9c2.3-2.1 3.6-5.2 3.6-9.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.2c-.2-.7-.4-1.5-.4-2.2s.1-1.5.4-2.2V6.6H1.3C.5 8.2 0 10.1 0 12s.5 3.8 1.3 5.4l4-3.2Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9Z"
                />
              </svg>
            </button>

            {/* Botão Apple */}
            <button
              type="button"
              className={styles.btnSocial}
              aria-label="Entrar com Apple"
              onClick={() =>
                setMensagem("Integração com Apple ainda não disponível.")
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#1d1d1f"
                aria-hidden="true"
              >
                <path d="M17.1 20.3c-1 .9-2.1.8-3.1.3-1.1-.5-2.1-.5-3.2 0-1.4.6-2.2.4-3.1-.4C2.8 15.3 3.5 7.6 9.1 7.3c1.3.1 2.3.7 3.1.8 1.2-.2 2.3-.9 3.6-.8 1.5.1 2.6.7 3.4 1.8-3.1 1.9-2.4 6 .5 7.1-.6 1.5-1.3 3-2.6 4.1ZM12 7.2c-.2-2.2 1.7-4.1 3.7-4.2.3 2.6-2.3 4.5-3.7 4.2Z" />
              </svg>
            </button>
          </div>

          <p className={styles.registerHint}>
            Acesso restrito •{" "}
            <span>Capim Dourado Shopping</span>
          </p>
        </div>
      </section>
    </main>
  );
}
