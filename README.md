# 🏢 Capim Gestão — Eficiência Operacional e Infraestrutura

Aplicação web desenvolvida pela equipe **Typhlosion** durante o **HackaRun 2026** com o objetivo de centralizar a gestão de infraestrutura, o registro de ocorrências e a organização das atividades operacionais do **Capim Dourado Shopping**.

---

## 1. Proposta e Estrutura Inicial das Telas

| # | Tela | Finalidade |
| :--- | :--- | :--- |
| 1 | **Login** | Acesso e autenticação dos usuários ao sistema. |
| 2 | **Painel Geral** | Visão resumida da situação operacional e indicadores. |
| 3 | **Planta do Shopping** | Visualização das áreas e localização espacial de ocorrências. |
| 4 | **Infraestrutura** | Cadastro e acompanhamento de equipamentos e instalações. |
| 5 | **Ocorrências** | Registro, classificação e acompanhamento de problemas. |
| 6 | **Equipes e Atividades** | Distribuição, atribuição e acompanhamento das tarefas. |
| 7 | **Relatórios** | Indicadores gerenciais e histórico operacional. |

---

## 2. Documentação Inicial do Projeto

### 2.1. Apresentação do Projeto
O **Capim Gestão** é uma aplicação web desenvolvida com o propósito de auxiliar a administração operacional do Capim Dourado Shopping, centralizando informações relacionadas à infraestrutura, ao registro de ocorrências e à organização das atividades operacionais. A plataforma busca proporcionar maior controle sobre as condições dos ambientes, facilitar a identificação de irregularidades e melhorar o acompanhamento dos serviços realizados pelas equipes responsáveis.

### 2.2. Justificativa
A administração de um shopping center envolve o acompanhamento constante de instalações, equipamentos, áreas comuns e serviços essenciais para o funcionamento adequado do empreendimento. A ausência de um sistema centralizado pode dificultar o registro de ocorrências, o acompanhamento de problemas e a distribuição das atividades entre os funcionários. Diante desse cenário, o **Capim Gestão** propõe uma solução tecnológica que centralize essas informações, facilite o acesso aos registros e auxilie na organização dos processos operacionais.

### 2.3. Objetivo Geral
Desenvolver uma aplicação web para auxiliar na gestão da infraestrutura, no acompanhamento de ocorrências e na organização das atividades operacionais do Capim Dourado Shopping, contribuindo para a eficiência dos processos administrativos e para a qualidade dos serviços oferecidos.

### 2.4. Objetivos Específicos
* Permitir o cadastro e o acompanhamento de equipamentos e instalações.
* Facilitar o registro e a classificação de ocorrências.
* Permitir a identificação da localização dos problemas na planta do shopping.
* Organizar a distribuição de atividades entre os funcionários.
* Acompanhar o andamento e a conclusão dos serviços.
* Disponibilizar indicadores para auxiliar na tomada de decisões.

### 2.5. Problemas Identificados
* **Problema 1 — Monitoramento de infraestrutura:** Dificuldade em acompanhar as condições de funcionamento das instalações e dos equipamentos, prejudicando a identificação de irregularidades e o planejamento das ações de manutenção.
* **Problema 2 — Gestão de ocorrências:** Dificuldade em centralizar os registros, classificar os problemas e acompanhar suas respectivas resoluções, comprometendo o controle das ocorrências identificadas no shopping.
* **Problema 3 — Organização operacional:** Dificuldade em distribuir responsabilidades, organizar tarefas e acompanhar a execução das atividades das equipes responsáveis pelos serviços operacionais.

### 2.6. Público-Alvo
* Administradores do shopping.
* Supervisores operacionais.
* Equipes de manutenção.
* Funcionários responsáveis pela conservação e inspeção dos ambientes.

### 2.7. Requisitos Funcionais Iniciais (RF)
* **RF01:** Permitir o acesso de usuários ao sistema.
* **RF02:** Permitir o cadastro e a consulta de equipamentos.
* **RF03:** Permitir o registro de ocorrências.
* **RF04:** Permitir a classificação das ocorrências por categoria e prioridade.
* **RF05:** Permitir a identificação da localização das ocorrências na planta.
* **RF06:** Permitir a criação e atribuição de atividades.
* **RF07:** Permitir a atualização do andamento das atividades.
* **RF08:** Exibir indicadores operacionais no painel geral.
* **RF09:** Permitir a consulta ao histórico de ocorrências e atividades.

### 2.8. Requisitos Não Funcionais (RNF)
* **RNF01:** A aplicação deverá possuir interface responsiva.
* **RNF02:** O sistema deverá possuir mecanismos de autenticação e controle de acesso.
* **RNF03:** As informações deverão ser armazenadas de forma persistente.
* **RNF04:** A interface deverá apresentar navegação intuitiva.
* **RNF05:** O sistema deverá manter a integridade das informações cadastradas.

---

## 3. Linguagens e Tecnologias Escolhidas

| Tecnologia | Categoria | Utilização no Projeto |
| :--- | :--- | :--- |
| **HTML5** | Linguagem de Marcação | Estrutura semântica da aplicação e das páginas. |
| **CSS3** | Linguagem de Estilo | Estilização visual e responsividade das telas. |
| **JavaScript** | Linguagem de Programação | Interatividade no cliente e consumo da API. |
| **Python** | Linguagem de Programação | Processamento lógico e regras de negócio no servidor. |
| **FastAPI** | Framework Web | Construção da API RESTful de alta performance. |
| **PostgreSQL** | Banco de Dados Relacional | Persistência e integridade dos registros operacionais. |
| **GitHub** | Controle de Versão | Versionamento de código e colaboração em equipe. |

---

## 4. Arquitetura Proposta

O **Capim Gestão** adota uma **Arquitetura Cliente-Servidor Desacoplada (RESTful API)** dividida em três camadas principais:

```text
[ Camada de Apresentação (Frontend) ]
   HTML5 + CSS3 + JavaScript (Hospedado na Vercel)
                  │
                  ▼  Requisições HTTP / JSON (REST API)
[ Camada de Aplicação (Backend) ]
   Python + FastAPI (Hospedado no Railway)
                  │
                  ▼  Consultas SQL / ORM
[ Camada de Persistência (Banco de Dados) ]
   PostgreSQL (Hospedado no Railway)
```

* **Frontend (Cliente):** Responsável pela renderização das 7 telas operacionais, validação inicial de formulários e experiência responsiva em desktops e dispositivos móveis.
* **Backend (API):** Gerencia autenticação, regras de negócio, priorização de ocorrências e atribuição de tarefas às equipes por meio de rotas REST padronizadas.
* **Banco de Dados:** Armazena de forma relacional e persistente os usuários, equipamentos, chamados, ordens de serviço e históricos.

---

## 5. Plataformas e Ferramentas Adotadas

| Plataforma | Função |
| :--- | :--- |
| **Visual Studio Code** | Ambiente integrado de desenvolvimento (IDE). |
| **GitHub** | Armazenamento do código-fonte e controle de versões. |
| **Vercel** | Publicação e hospedagem contínua da interface web (Frontend). |
| **Railway** | Hospedagem do servidor (Backend) e do banco de dados PostgreSQL. |
| **Figma** | Prototipação e planejamento visual das telas. |

---

## 6. Incorporação da Tecnologia Sorteada (HTML5)

O **HTML5** será utilizado como tecnologia fundamental na construção da interface web do **Capim Gestão**, sendo responsável pela estruturação semântica das páginas e organização dos elementos que compõem o sistema.

* **Estruturação de Módulos:** Sua utilização permitirá desenvolver formulários nativos para registro de ocorrências, painéis administrativos, tabelas de acompanhamento, páginas de gerenciamento de equipamentos e interfaces de consulta à planta do Capim Dourado Shopping.
* **Integração Técnica:** O HTML5 será integrado ao **CSS3**, responsável pela estilização e responsividade das interfaces, e ao **JavaScript**, utilizado para implementar funcionalidades interativas e permitir a comunicação assíncrona com a API em FastAPI.
* **Cobertura Operacional:** A tecnologia será incorporada diretamente aos três pilares principais do projeto (monitoramento de infraestrutura, gestão de ocorrências e organização operacional), garantindo uma aplicação acessível por navegadores e adaptável a diferentes dispositivos.

---

## 📁 Estrutura Inicial do Repositório

```text
├── index.html          # Tela inicial / Login e acesso ao Painel Geral
├── pages/              # Telas operacionais (painel, planta, infraestrutura, ocorrencias, equipes, relatorios)
├── assets/             # Estilização (CSS), scripts (JS), imagens e planta do shopping
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Documentação técnica inicial (Entrega 1)
```

---

## 👥 Equipe Typhlosion

* **Matheus Diehl Inomata**
* **João Pedro Moreira**
* **Luiz Henrique Abreu Borges**
* **Pedro Lucas dos Santos**
