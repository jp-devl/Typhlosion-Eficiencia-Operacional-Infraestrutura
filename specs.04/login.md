# Especificação da Tela — Login do Capim Gestão

**Projeto:** Capim Gestão  
**Equipe:** Typhlosion  
**Módulo:** Autenticação e Acesso  
**Arquivo:** `login.md`  
**Metodologia:** Spec-Driven Development (SDD)

---

## 1. Visão geral

A tela de Login do Capim Gestão tem como finalidade permitir que os usuários acessem o sistema por meio de uma interface de identificação e seleção de perfil.

A interface deverá preservar a identidade visual já desenvolvida pela equipe, mantendo os elementos gráficos, a organização dos campos e a experiência de utilização da versão original em HTML.

A funcionalidade deverá integrar a aplicação principal desenvolvida com Next.js, TypeScript e App Router.

A implementação deverá respeitar a Constituição do projeto e preservar o trabalho já existente.

## 2. Objetivos da tela

A tela deverá:

- Apresentar a identidade visual do Capim Gestão.
- Permitir o preenchimento de e-mail e senha.
- Permitir a seleção do perfil de acesso.
- Apresentar a opção de manter conectado.
- Disponibilizar a opção de recuperação de senha.
- Apresentar as opções visuais de acesso por Google e Apple.
- Adaptar-se a diferentes tamanhos de tela.
- Preparar a interface para futura integração com a API de autenticação.

## 3. Público-alvo

A funcionalidade será utilizada pelos usuários autorizados do Capim Gestão, incluindo:

- Administradores do shopping.
- Supervisores operacionais.
- Equipes de manutenção.

A interface deverá ser simples e intuitiva, permitindo que usuários com diferentes níveis de familiaridade com sistemas informatizados consigam utilizá-la.

## 4. Estrutura visual da tela

A implementação deverá preservar a identidade visual da versão original.

### 4.1. Painel de apresentação

O painel deverá apresentar:

- Logo do Capim Dourado Shopping.
- Identificação da localização: Palmas • Tocantins.
- Fundo em tons claros e dourados.
- Elementos visuais alinhados ao padrão original.

A imagem deverá utilizar o arquivo existente em `assets/`, sem criar uma identidade visual substituta.

### 4.2. Painel de autenticação

O painel deverá apresentar:

- Identificação: Portal Administrativo.
- Título: Capim Gestão.
- Identificação dos pilares: Infraestrutura, Ocorrências e Operações.
- Subtítulo: Acesso ao Sistema.

### 4.3. Identidade visual

A implementação deverá preservar as cores utilizadas na versão original:

- Dourado principal: `#b4903d`.
- Dourado escuro: `#78581e`.
- Dourado claro: `#f3ead6`.
- Texto principal: `#292114`.
- Texto secundário: `#6b5e4c`.
- Bordas: `#e2d9c8`.

A tipografia deverá respeitar a proposta visual original, utilizando Segoe UI para os elementos gerais e Georgia para o título principal.

## 5. Elementos do formulário

### 5.1. E-mail

- Campo para preenchimento do endereço de e-mail.
- Utilização do tipo de entrada apropriado para e-mail.
- Validação básica de preenchimento e formato.

### 5.2. Senha

- Campo para preenchimento da senha.
- Utilização de entrada do tipo password.
- Campo obrigatório.

### 5.3. Seleção de perfil

O seletor deverá apresentar os seguintes perfis:

- Supervisor Operacional.
- Administrador do Shopping.
- Equipe de Manutenção.

O perfil selecionado deverá ser identificado visualmente.

### 5.4. Manter conectado

A interface deverá apresentar uma opção de seleção para manter conectado.

O comportamento efetivo de persistência da sessão deverá ser definido durante a implementação da autenticação real.

### 5.5. Recuperação de senha

A interface deverá disponibilizar a opção "Esqueci minha senha".

O processo real de recuperação dependerá da definição do serviço correspondente no backend.

### 5.6. Botão de acesso

O formulário deverá apresentar o botão "Acessar Painel", responsável por iniciar o processo de autenticação.

### 5.7. Acesso por provedores externos

A interface deverá preservar os elementos visuais dos botões:

- Google.
- Apple.

A autenticação real por provedores externos dependerá de definição e aprovação da equipe.

## 6. Comportamentos e interações

### 6.1. Seleção de perfil

Ao selecionar uma opção:

1. O sistema deverá atualizar o perfil selecionado.
2. A opção escolhida deverá receber a identificação visual correspondente.
3. O menu deverá ser fechado após a seleção.

### 6.2. Preenchimento do formulário

O usuário deverá conseguir preencher os campos de e-mail e senha e selecionar seu perfil.

Os campos obrigatórios deverão ser validados antes do envio.

### 6.3. Processo de autenticação

O formulário deverá estar preparado para enviar os dados de acesso ao serviço de autenticação do Capim Gestão.

A autenticação definitiva deverá ocorrer por meio da API REST do backend.

A interface não deverá considerar um usuário autenticado apenas porque os campos foram preenchidos.

### 6.4. Recuperação de senha

O botão deverá iniciar futuramente o processo de recuperação de senha definido pelo backend.

### 6.5. Acesso por Google e Apple

Os botões deverão preservar sua apresentação visual.

A integração efetiva dependerá da definição dos mecanismos de autenticação externa.

### 6.6. Situações de erro

A interface deverá apresentar mensagens claras para situações como:

- Campos obrigatórios não preenchidos.
- Credenciais inválidas.
- Falha de comunicação com o backend.
- Falha no processo de autenticação.

As mensagens não deverão expor informações técnicas ou sensíveis.

## 7. Responsividade

A interface deverá adaptar-se a diferentes resoluções.

Na versão original, a organização utiliza dois painéis lado a lado em telas maiores.

Em telas com largura reduzida, os painéis deverão ser organizados verticalmente.

A implementação deverá preservar a legibilidade, a organização dos campos e a facilidade de utilização em dispositivos móveis.

## 8. Integração com o backend

A autenticação deverá ser integrada à API REST desenvolvida com Python e FastAPI.

A comunicação deverá utilizar HTTP e JSON, respeitando a Constituição do projeto.

Antes da integração, deverão ser definidos:

- Endpoint de autenticação.
- Estrutura dos dados enviados.
- Estrutura das respostas.
- Mecanismo de gerenciamento de sessão.
- Regras de autorização por perfil.
- Tratamento de erros.
- Estratégia de recuperação de senha.

O frontend não deverá inventar contratos, campos ou respostas da API.

A implementação da autenticação real ficará condicionada à definição desses elementos pela equipe.

## 9. Requisitos funcionais

**RF-L01:** Apresentar a tela de acesso ao Capim Gestão.

**RF-L02:** Permitir o preenchimento do e-mail.

**RF-L03:** Permitir o preenchimento da senha.

**RF-L04:** Permitir a seleção de um dos perfis disponíveis na interface.

**RF-L05:** Disponibilizar a opção de manter conectado.

**RF-L06:** Disponibilizar a opção de recuperação de senha.

**RF-L07:** Apresentar os botões visuais de acesso por Google e Apple.

**RF-L08:** Preparar o formulário para integração com o serviço de autenticação.

## 10. Requisitos não funcionais

- **RNF-L01:** A interface deverá ser responsiva.
- **RNF-L02:** A tela deverá respeitar a identidade visual do Capim Gestão.
- **RNF-L03:** A implementação deverá utilizar Next.js, TypeScript, HTML5 e CSS3.
- **RNF-L04:** A interface deverá utilizar português brasileiro.
- **RNF-L05:** Informações sensíveis não deverão ser armazenadas de maneira insegura.
- **RNF-L06:** A autenticação deverá respeitar os mecanismos de segurança definidos para o sistema.
- **RNF-L07:** A implementação deverá respeitar a arquitetura App Router.

## 11. Critérios de aceitação

- [ ] A tela deverá preservar a identidade visual original.
- [ ] A logo do shopping deverá ser apresentada corretamente.
- [ ] Os campos de e-mail e senha deverão funcionar.
- [ ] O seletor deverá permitir escolher os três perfis previstos.
- [ ] A interface deverá apresentar os botões de recuperação de senha, Google e Apple.
- [ ] A organização visual deverá funcionar em telas maiores e menores.
- [ ] A implementação deverá estar integrada à estrutura App Router.
- [ ] O código original deverá permanecer preservado durante a migração.
- [ ] A interface não deverá apresentar uma autenticação simulada como se fosse real.
- [ ] A integração definitiva deverá respeitar o contrato aprovado da API.

## 12. Diretrizes de implementação

**Frontend:**
- Next.js.
- TypeScript.
- HTML5.
- CSS3.
- App Router.

**Backend:**
- Python.
- FastAPI.

Diretrizes:

- Utilizar a estrutura existente do repositório.
- Preservar o arquivo original `index.html` como referência.
- Reutilizar os recursos existentes em `assets/`.
- Preservar a identidade visual desenvolvida pela equipe.
- Separar adequadamente estrutura, estilos e comportamentos.
- Evitar duplicação desnecessária.
- Não introduzir novas bibliotecas sem justificativa e aprovação.
- Não implementar autenticação real sem contrato definido.
- Não sobrescrever funcionalidades existentes sem necessidade.

## 13. Etapas de desenvolvimento

### Etapa 1 — Migração visual

- Migrar a interface original para Next.js.
- Preservar os elementos visuais existentes.
- Implementar os campos e interações de interface.
- Garantir responsividade.
- Validar a correspondência visual com o HTML original.

### Etapa 2 — Integração de autenticação

- Definir o contrato da API com a equipe de backend.
- Implementar a comunicação com FastAPI.
- Implementar o gerenciamento seguro da sessão.
- Implementar autorização conforme os perfis definidos.
- Integrar a recuperação de senha, quando disponível.
- Avaliar a integração com provedores externos.

## 14. Decisões pendentes de definição pela equipe

1. Qual será o endpoint oficial de autenticação?
2. Como será gerenciada a sessão do usuário?
3. Quais serão as permissões de cada perfil?
4. Qual será o destino após a autenticação?
5. Como funcionará a recuperação de senha?
6. A equipe utilizará autenticação externa por Google e Apple?
7. Qual será o comportamento definitivo da opção "Manter conectado"?

Essas decisões deverão ser alinhadas com os responsáveis pelo backend e pela arquitetura do sistema.

## 15. Resultado esperado

Ao final da primeira etapa, o Capim Gestão deverá possuir uma tela de login migrada para Next.js, preservando a identidade visual e os elementos desenvolvidos originalmente pela equipe Typhlosion.

Ao final da segunda etapa, a tela deverá estar integrada ao mecanismo de autenticação real do sistema.

**Regra de preservação:** o arquivo original `index.html` deverá permanecer disponível como referência durante a migração, evitando a perda do trabalho já desenvolvido pela equipe.