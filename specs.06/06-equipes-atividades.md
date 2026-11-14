# SPEC-06: Equipes e Atividades Operacionais

## 1. Visão Geral
Este documento especifica o módulo de **Equipes e Atividades** (Tela 6) do sistema **Capim Gestão**, desenvolvido para organizar a distribuição de responsabilidades, a delegação de ordens de serviço (OS) originadas de ocorrências ou rotinas preventivas e o acompanhamento do ciclo de vida das tarefas no **Capim Dourado Shopping**.

## 2. Requisitos Atendidos
* **RF06:** Permitir a criação e atribuição de atividades às equipes operacionais com registro automático da data de solicitação.
* **RF07:** Permitir a atualização do andamento (status) das atividades.
* **RNF01 / RNF04:** Interface responsiva, semântica em HTML5 e de navegação intuitiva.
* **RNF05:** Garantia de integridade dos vínculos entre ocorrências, equipes responsáveis, prazos e estados de execução.

## 3. Atores Envolvidos
* **Supervisor Operacional / Administrador:** Cria ordens de serviço, vincula ocorrências às equipes responsáveis e define prazos de execução.
* **Líderes e Membros das Equipes Operacionais:** Consultam tarefas atribuídas e atualizam o status de execução em tempo real.

## 4. Equipes Operacionais Padronizadas
O sistema deve suportar a delegação para as seguintes equipes:
1. **Manutenção Elétrica** (quadros de força, iluminação, geradores, elevadores/escadas rolantes).
2. **Refrigeração** (chillers, fancoils, climatização de praça de alimentação e corredores).
3. **Limpeza** (áreas comuns, sanitários, gestão de resíduos, derramamentos).
4. **Predial** (alvenaria, hidráulica, serralheria, pisos, cobertura e estacionamento).

## 5. Fluxo de Atribuição e Execução (SDD)

### 5.1. Criação e Delegação (RF06)
1. O supervisor acessa o painel **Equipes e Atividades** (`pages/equipes.html`).
2. Preenche o formulário de **Nova Ordem de Serviço / Delegação**:
   * **Ocorrência / Tarefa:** Seleção de uma ocorrência registrada (ex.: `#OC-104 - Vazamento no Fancoil`) ou descrição de atividade avulsa.
   * **Equipe Responsável:** Seleção obrigatória entre *Manutenção Elétrica*, *Refrigeração*, *Limpeza* ou *Predial*.
   * **Prioridade:** Baixa, Média, Alta ou Crítica.
   * **Prazo de Conclusão:** Data e hora limite (`datetime-local`).
   * **Observações Técnicas:** Instruções adicionais para execução.
3. Ao submeter, a atividade é criada com status inicial **`Pendente`**, registra automaticamente a **data/hora da solicitação** e é exibida ordenada numericamente de forma limpa no quadro operacional.

### 5.2. Atualização de Andamento (RF07) e Filtros
1. A equipe visualiza a atividade na lista de tarefas, contando com os seletores de filtro alinhados à direita para **Equipes**, **Urgências** e **Status** (sem poluição visual de ordenação crescente/decrescente).
2. O operador altera o status da atividade conforme o progresso real:
   * `Pendente` $\rightarrow$ `Em Execução` (início do atendimento no local).
   * `Em Execução` $\rightarrow$ `Concluída` (finalização do serviço e liberação da área).
   * Reabertura permitida (`Concluída` $\rightarrow$ `Em Execução` ou `Pendente`) em caso de inconformidade na vistoria.
3. A interface atualiza imediatamente os contadores de KPIs e o registro de movimentações.

## 6. Modelo de Dados (Contrato Frontend $\leftrightarrow$ API FastAPI)
```json
{
  "id": "OS-2026-001",
  "ocorrencia_ref": "OC-042",
  "titulo": "Falha na iluminação do corredor Leste - Piso L2",
  "equipe": "Manutenção Elétrica",
  "prioridade": "Alta",
  "prazo": "2026-11-14T18:00",
  "status": "Pendente",
  "data_solicitacao": "2026-11-14T08:30:00Z",
  "observacoes": "Verificar disjuntor do quadro QDL-04 antes da troca de reatores."
}