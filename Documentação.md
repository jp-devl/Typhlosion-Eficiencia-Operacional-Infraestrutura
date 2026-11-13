HACKARUN
 
Equipe: Typhlosion

Matheus Diehl Inomata
João Pedro Moreira
Pedro Lucas dos Santos
Luiz Henrique Abreu Borges

Tema: Eficiência operacional e infraestrutura
 



1.      Proposta e estrutura inicial das telas
 
 	    Tela                                   Finalidade
1. Login                         Acesso dos usuários ao sistema.
2. Painel geral               Visão resumida da situação operacional.
3. Planta do shopping   Visualização das áreas e localização de ocorrências.
4. Infraestrutura             Cadastro e acompanhamento de equipamentos.
5. Ocorrências               Registro e acompanhamento de problemas.
6. Equipes e atividades  Distribuição e acompanhamento das tarefas.
7. Relatórios                   Indicadores e histórico operacional.



2. Documentação inicial do projeto


2.1. Apresentação do projeto
O Capim Gestão é uma aplicação web desenvolvida com o propósito de auxiliar a administração operacional do Capim Dourado Shopping, centralizando informações relacionadas à infraestrutura, ao registro de ocorrências e à organização das atividades operacionais.
A plataforma busca proporcionar maior controle sobre as condições dos ambientes, facilitar a identificação de irregularidades e melhorar o acompanhamento dos serviços realizados pelas equipes responsáveis.


2.2. Justificativa
A administração de um shopping center envolve o acompanhamento constante de instalações, equipamentos, áreas comuns e serviços essenciais para o funcionamento adequado do empreendimento.
A ausência de um sistema centralizado pode dificultar o registro de ocorrências, o acompanhamento de problemas e a distribuição das atividades entre os funcionários.
Diante desse cenário, o Capim Gestão propõe uma solução tecnológica que centralize essas informações, facilite o acesso aos registros e auxilie na organização dos processos operacionais.


2.3. Objetivo geral
Desenvolver uma aplicação web para auxiliar na gestão da infraestrutura, no acompanhamento de ocorrências e na organização das atividades operacionais do Capim Dourado Shopping, contribuindo para a eficiência dos processos administrativos e para a qualidade dos serviços oferecidos.


2.4. Objetivos específicos
Permitir o cadastro e o acompanhamento de equipamentos e instalações.
Facilitar o registro e a classificação de ocorrências.
Permitir a identificação da localização dos problemas na planta do shopping.
Organizar a distribuição de atividades entre os funcionários.
Acompanhar o andamento e a conclusão dos serviços.
Disponibilizar indicadores para auxiliar na tomada de decisões.


2.5. Problemas identificados
Problema 1 — Monitoramento de infraestrutura
Dificuldade em acompanhar as condições de funcionamento das instalações e dos equipamentos, prejudicando a identificação de irregularidades e o planejamento das ações de manutenção.
Problema 2 — Gestão de ocorrências
Dificuldade em centralizar os registros, classificar os problemas e acompanhar suas respectivas resoluções, comprometendo o controle das ocorrências identificadas no shopping.
Problema 3 — Organização operacional
Dificuldade em distribuir responsabilidades, organizar tarefas e acompanhar a execução das atividades das equipes responsáveis pelos serviços operacionais.
2.6. Público-alvo
Administradores do shopping.
Supervisores operacionais.
Equipes de manutenção.
Funcionários responsáveis pela conservação e inspeção dos ambientes.


2.7. Requisitos funcionais iniciais


RF01
Permitir o acesso de usuários ao sistema.
RF02
Permitir o cadastro e a consulta de equipamentos.
RF03
Permitir o registro de ocorrências.
RF04
Permitir a classificação das ocorrências por categoria e prioridade.
RF05
Permitir a identificação da localização das ocorrências na planta.
RF06
Permitir a criação e atribuição de atividades.
RF07
Permitir a atualização do andamento das atividades.
RF08
Exibir indicadores operacionais no painel geral.
RF09
Permitir a consulta ao histórico de ocorrências e atividades.


2.8. Requisitos não funcionais
RNF01 - A aplicação deverá possuir interface responsiva.
RNF02 - O sistema deverá possuir mecanismos de autenticação e controle de acesso.
RNF03 - As informações deverão ser armazenadas de forma persistente.
RNF04 - A interface deverá apresentar navegação intuitiva.
RNF05 - O sistema deverá manter a integridade das informações cadastradas.



3. Linguagens e tecnologias escolhidas
Aqui existe uma distinção importante que quero explicar para você não apresentar uma informação tecnicamente incorreta aos professores.
HTML5: é uma linguagem de marcação, responsável por estruturar o conteúdo das páginas.
CSS3: é uma linguagem de folhas de estilo, responsável pela aparência visual.
JavaScript: é uma linguagem de programação, responsável pela interatividade.
Python: pode ser utilizado no servidor para processar as informações e executar as regras do sistema.

Tecnologia                    Utilização	

HTML5	                Estrutura da aplicação	
CSS3	                Estilização das telas	
JavaScript                  Interatividade	
Python	                Processamento no servidor	
FastAPI	                Construção da API	
PostgreSQL               Banco de dados	
GitHub	                Versionamento e colaboração	



4. Arquitetura proposta 
O Capim Gestão utilizará inicialmente uma arquitetura cliente-servidor organizada em três camadas: apresentação, aplicação e dados.
Camada de apresentação (Frontend):
Será responsável pela interface de interação com os usuários, desenvolvida utilizando HTML5, CSS3 e JavaScript. Nessa camada estarão disponíveis as telas de acesso, painel administrativo, planta do shopping, gerenciamento de infraestrutura, registro de ocorrências e organização das atividades operacionais.
Camada de aplicação (Backend):
Será responsável pelo processamento das informações e pela execução das regras de negócio do sistema. Propõe-se a utilização da linguagem Python, com o framework FastAPI, para desenvolver uma API REST responsável pela comunicação entre a interface e o banco de dados.
Camada de dados (Banco de dados):
Será responsável pelo armazenamento e gerenciamento das informações do sistema, incluindo dados dos usuários, equipamentos, ocorrências e atividades operacionais. Propõe-se inicialmente a utilização do PostgreSQL.
A comunicação entre as camadas ocorrerá por meio de requisições HTTP, permitindo que a interface envie informações ao servidor e receba os dados necessários para apresentar ao usuário.
Essa arquitetura busca proporcionar organização, separação de responsabilidades, facilidade de manutenção e possibilidade de expansão da aplicação.




5. Plataforma e tecnologias adotadas

Plataforma	                        Função

Visual Studio Code     Ambiente de desenvolvimento.

GitHub	                 Armazenamento do código e controle de versões.

Vercel	                 Publicação da interface web.

Railway	                 Hospedagem do backend e, conforme o plano e a                       
                                    configuração, do banco de dados.

Figma	                 Prototipação e planejamento visual das telas.



6. Como o HTML5 será incorporado à solução? 

Tecnologia sorteada — HTML5
O HTML5 será utilizado como tecnologia fundamental na construção da interface web do Capim Gestão, sendo responsável pela estruturação das páginas e organização dos elementos que compõem o sistema.
Sua utilização permitirá desenvolver formulários para registro de ocorrências, painéis administrativos, tabelas de acompanhamento, páginas de gerenciamento de equipamentos e interfaces de consulta à planta do Capim Dourado Shopping.
O HTML5 será integrado ao CSS3, responsável pela estilização e responsividade das interfaces, e ao JavaScript, utilizado para implementar funcionalidades interativas e permitir a comunicação com o servidor da aplicação.
Dessa forma, a tecnologia será incorporada diretamente aos três módulos principais do projeto: monitoramento de infraestrutura, gestão de ocorrências e organização operacional.
A escolha dessa tecnologia permitirá desenvolver uma aplicação acessível por navegadores, com interface organizada, intuitiva e adaptável a diferentes dispositivos.


 

