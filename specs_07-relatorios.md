# Spec 07 — Tela de Relatórios e Histórico (`pages/relatorios.html`)

## 1. Visão Geral e Objetivo
Atender ao **Requisito Funcional RF09**, disponibilizando uma visão gerencial consolidada com indicadores de eficiência operacional e o histórico completo de ações e ordens de serviço do **Capim Gestão** (Capim Dourado Shopping), permitindo filtragem multidimensional e impressão/exportação em PDF via `window.print()`.

---

## 2. Arquitetura e Integração de Dados
- **Fonte de Dados:** Consumo direto da chave `capim_gestao_atividades_v8` armazenada no `localStorage` (compartilhada com `pages/equipes.html`), complementada por registros históricos consolidados para garantir massa de dados analítica mesmo no primeiro acesso.
- **Identidade Visual:** Mantém o padrão estabelecido em `equipes.html` (fonte `Montserrat`, paleta dourada `--brand-gold: #c29b38`, fundo `--bg: #fdfbf7`, cabeçalho fixo `.topbar` com `aria-current="page"` no link `Relatórios`).

---

## 3. Métricas e Indicadores Gerenciais (KPIs)
Os indicadores são recalculados dinamicamente sempre que os filtros são aplicados:

1. **Taxa de Resolução (%):**
   $$\text{Taxa de Resolução} = \left( \frac{\text{Total Concluídas}}{\text{Total de Registros Válidos (excl. Canceladas)}} \right) \times 100$$
   - Exibe também a contagem absoluta (`X de Y ordens concluídas`).
2. **Tempo Médio de Atendimento (TMA):**
   - Calculado pela média aritmética da diferença entre `dataConclusao` (ou `prazo` nos registros históricos concluídos) e `dataSolicitacao`, formatado em horas e minutos (ex.: `4h 35min`).
3. **Total de Ações Registradas:**
   - Contagem total de registros exibidos conforme o recorte de filtros ativo.
4. **Conformidade de SLA (No Prazo):**
   - Percentual de ordens concluídas dentro do `prazo` estipulado em relação ao total de ordens concluídas no período filtrado.

---

## 4. Filtros Disponíveis
A barra de filtros permite combinar simultaneamente os seguintes critérios:

| Filtro | ID do Elemento | Opções / Tipo | Comportamento |
| :--- | :--- | :--- | :--- |
| **Período (Início)** | `#filtro-data-inicio` | `input[type="date"]` | Filtra registros com `dataSolicitacao >= dataInicio`. |
| **Período (Fim)** | `#filtro-data-fim` | `input[type="date"]` | Filtra registros com `dataSolicitacao <= dataFim` (até 23:59). |
| **Setor / Equipe** | `#filtro-setor` | `Todos`, `Manutenção Elétrica`, `Refrigeração`, `Limpeza`, `Predial` | Filtra pelo campo `equipe` do registro. |
| **Status** | `#filtro-status` | `Todos`, `Concluída`, `Em Execução`, `Pendente`, `Cancelada` | Filtra pelo campo `status` atual da ordem. |
| **Busca Textual** | `#filtro-busca` | `input[type="search"]` | Busca por código (`OS-XXX`), título ou observação técnica. |

---

## 5. Tabela Histórica Consolidada e Exportação
- **Colunas da Tabela:**
  1. `Protocolo / Ação`: Código da OS, título da atividade e detalhamento técnico.
  2. `Setor / Equipe`: Badge identificando a equipe responsável.
  3. `Data Solicitação`: Data e hora de abertura (`DD/MM/AAAA HH:mm`).
  4. `Conclusão / Prazo`: Data de encerramento (se concluída) ou prazo limite previsto, com sinalização visual de SLA (`No prazo` / `Atrasado`).
  5. `Duração`: Tempo total decorrido na execução.
  6. `Status`: Badge semântico padronizado (`Pendente`, `Em Execução`, `Concluída`, `Cancelada`).
- **Impressão / Exportação (`window.print()`):**
  - Botão de ação principal no cabeçalho (`Imprimir / Exportar Relatório`) aciona `window.print()`.
  - Regras `@media print` ocultam menus de navegação, controles interativos de filtro e botões, ajustando margens e exibindo cabeçalho oficial de impressão com data/hora de emissão e resumo dos filtros aplicados.

---

## 6. Critérios de Aceite
- [x] Documentação técnica salva em `specs/07-relatorios.md`.
- [x] Estrutura semântica HTML5 em `pages/relatorios.html` alinhada ao design system do projeto.
- [x] Filtragem funcional por período (data inicial e final), setor/equipe e status.
- [x] Exibição dinâmica do resumo de eficiência (**Taxa de Resolução** e **Tempo Médio**).
- [x] Listagem completa do histórico consolidado de ações.
- [x] Acionamento funcional de `window.print()` com folha de estilo dedicada para impressão.
