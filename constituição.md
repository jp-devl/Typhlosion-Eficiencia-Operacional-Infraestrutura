# CONSTITUIÇÃO DO PROJETO — CAPIM GESTÃO

**Equipe:** Typhlosion  
**Projeto:** Capim Gestão  
**Metodologia:** Spec-Driven Development (SDD)  
**Versão:** 1.0

---

## 1. OBJETIVO

Esta constituição estabelece as regras obrigatórias de desenvolvimento do Capim Gestão.

Todos os integrantes da equipe devem seguir estas regras, independentemente da ferramenta de inteligência artificial utilizada.

O objetivo é garantir:
- Padronização do código.
- Compatibilidade entre os módulos.
- Organização da estrutura do projeto.
- Consistência visual e funcional.
- Facilidade de integração entre os integrantes.
- Redução de erros e retrabalho.

Nenhuma IA deve tomar decisões arquiteturais importantes sem consultar a documentação existente ou solicitar aprovação da equipe.

## 2. TECNOLOGIAS OFICIAIS

As tecnologias definidas para o projeto são:

**Frontend**
- Next.js.
- TypeScript.
- HTML5.
- CSS3.

**Backend**
- Python.
- FastAPI.

**Banco de dados**
- A tecnologia será definida e documentada em conjunto pela equipe antes da implementação que depender dela.

**Comunicação**
- O frontend e o backend devem se comunicar por meio de uma API REST.
- As requisições devem utilizar HTTP.
- Os dados devem ser transmitidos em JSON.

Não introduzir novas tecnologias, bibliotecas ou frameworks sem justificativa e aprovação da equipe.

## 3. IDIOMA E NOMENCLATURA

- Toda a interface do sistema deve estar em português brasileiro.
- Os textos apresentados aos usuários devem ser claros e objetivos.
- Os nomes das funcionalidades e dos módulos devem seguir a nomenclatura oficial do projeto.
- Os nomes técnicos de arquivos, variáveis e funções devem seguir os padrões de cada linguagem.

Padrões:
- Python: snake_case.
- TypeScript: camelCase.
- Componentes React: PascalCase.
- Classes: PascalCase.
- Constantes: UPPER_SNAKE_CASE.

## 4. ARQUITETURA DO SISTEMA

O Capim Gestão será desenvolvido como uma aplicação integrada.

Seus principais módulos são:

1. Painel geral.
2. Monitoramento de infraestrutura.
3. Gestão de ocorrências.
4. Gestão de equipes e atividades.
5. Planta interativa do shopping.
6. Relatórios e indicadores.

Os módulos devem compartilhar os mesmos padrões de comunicação, nomenclatura e estrutura de dados.

Não desenvolver funcionalidades isoladas que não possam ser integradas ao sistema principal.

A equipe deverá definir e documentar uma única estratégia de roteamento do Next.js, sem misturar padrões incompatíveis do App Router e Pages Router.

## 5. PADRÃO DE DESENVOLVIMENTO

Toda funcionalidade deverá seguir o fluxo SDD:

1. Constitution: consultar as regras gerais.
2. Specify: definir o que será desenvolvido.
3. Clarify: identificar dúvidas e requisitos incompletos.
4. Plan: definir a estratégia técnica.
5. Tasks: dividir a implementação em tarefas.
6. Implement: desenvolver conforme o plano.
7. Validate: executar testes e verificar os critérios de aceitação.

A IA não deve começar a implementação antes de verificar se a especificação e as decisões técnicas estão suficientemente claras.

## 6. PADRÃO DE CÓDIGO

Todo código desenvolvido deverá:

- Ser organizado e legível.
- Ter nomes descritivos.
- Evitar duplicação desnecessária.
- Respeitar a arquitetura existente.
- Utilizar componentes reutilizáveis quando apropriado.
- Ter tratamento adequado de erros.
- Evitar soluções improvisadas que prejudiquem a integração.
- Incluir comentários quando realmente ajudarem a explicar uma lógica.

A IA não deve reescrever arquivos inteiros sem necessidade.

Antes de modificar um arquivo existente, deve analisar seu conteúdo e preservar funcionalidades que já estejam implementadas.

## 7. PADRÃO DE API

A API deverá seguir os princípios REST.

Regras:
- Utilizar métodos HTTP adequados.
- Utilizar códigos de status HTTP corretamente.
- Validar os dados recebidos.
- Retornar respostas JSON consistentes.
- Tratar erros de maneira padronizada.
- Documentar os endpoints.

Os contratos da API devem ser definidos e compartilhados entre frontend e backend antes da integração.

O frontend não deve inventar campos ou respostas que não estejam definidos no contrato.

## 8. PADRÃO VISUAL

A interface deve manter identidade visual consistente em todas as páginas.

Regras:
- Manter o mesmo padrão de cores.
- Utilizar tipografia consistente.
- Manter espaçamentos e alinhamentos coerentes.
- Reutilizar componentes visuais.
- Manter navegação padronizada.
- Garantir responsividade.

A identidade visual deve representar o Capim Gestão, sem criar estilos independentes para cada módulo.

## 9. ORGANIZAÇÃO DOS ARQUIVOS

A estrutura oficial de diretórios deverá ser definida no repositório e respeitada por todos.

Nenhum integrante deve criar pastas ou arquivos em locais diferentes por preferência pessoal.

Antes de criar uma nova estrutura, a IA deve verificar a estrutura existente.

## 10. SEGURANÇA E CONFIGURAÇÕES

- Nunca inserir senhas, tokens ou credenciais diretamente no código.
- Utilizar variáveis de ambiente.
- Não compartilhar arquivos `.env` com credenciais reais no GitHub.
- Manter um arquivo `.env.example` com os nomes das variáveis necessárias e valores fictícios.
- Validar os dados recebidos pela API.
- Não expor informações sensíveis nas respostas de erro.

## 11. GIT E INTEGRAÇÃO

Todos os integrantes devem utilizar o mesmo repositório GitHub.

Regras:
- Não sobrescrever o trabalho de outro integrante sem alinhamento.
- Evitar trabalhar simultaneamente nos mesmos arquivos sem combinar previamente.
- Utilizar branches para funcionalidades quando possível.
- Realizar commits com mensagens descritivas.
- Revisar alterações antes de integrá-las à branch principal.
- Não enviar arquivos temporários, ambientes virtuais ou credenciais.

## 12. REGRAS OBRIGATÓRIAS PARA AS IAs

Toda IA utilizada no projeto deverá:

1. Ler esta constituição antes de desenvolver qualquer funcionalidade.
2. Consultar a especificação da funcionalidade solicitada.
3. Verificar os arquivos existentes antes de criar ou modificar códigos.
4. Respeitar as tecnologias e os padrões definidos.
5. Não inventar funcionalidades ou requisitos.
6. Não alterar decisões arquiteturais sem autorização.
7. Não criar estruturas incompatíveis com o restante do projeto.
8. Não modificar arquivos de outros módulos sem necessidade.
9. Explicar alterações importantes realizadas.
10. Informar dependências, configurações e possíveis impactos.
11. Apontar conflitos entre a solicitação e a documentação existente.
12. Priorizar a integração com o código já desenvolvido.

Se faltar alguma informação importante, a IA deverá perguntar antes de assumir uma decisão.

## 13. CRITÉRIO DE CONCLUSÃO

Uma funcionalidade somente será considerada concluída quando:

- Atender à especificação aprovada.
- Respeitar esta constituição.
- Estiver integrada à arquitetura.
- Não apresentar erros conhecidos nos testes realizados.
- Atender aos critérios de aceitação.
- Possuir documentação atualizada quando necessário.

---

**Regra final:** a prioridade do Capim Gestão é construir um único sistema integrado, e não um conjunto de funcionalidades independentes desenvolvidas com padrões diferentes.