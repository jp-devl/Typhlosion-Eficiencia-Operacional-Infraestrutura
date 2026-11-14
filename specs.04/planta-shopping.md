# Especificação da Tela — Planta Interativa do Shopping

**Projeto:** Capim Gestão  
**Equipe:** Typhlosion  
**Módulo:** Planta Interativa do Shopping  
**Arquivo:** `planta-shopping.md`  
**Metodologia:** Spec-Driven Development (SDD)

---

## 1. Visão geral

A tela Planta Interativa do Shopping tem como finalidade apresentar uma representação visual da estrutura do Capim Dourado Shopping, permitindo que os usuários identifiquem áreas do empreendimento e visualizem a localização de ocorrências registradas.

A funcionalidade deverá facilitar o acompanhamento operacional, tornando mais simples identificar onde determinado problema aconteceu e relacionar sua localização às informações cadastradas no sistema.

A tela deverá fazer parte da aplicação principal do Capim Gestão, respeitando os padrões visuais, estruturais e arquiteturais definidos na constituição do projeto.

## 2. Objetivos da tela

A tela deverá:

- Apresentar uma representação visual da planta do shopping.
- Permitir a identificação das áreas representadas na planta.
- Exibir a localização das ocorrências registradas.
- Facilitar a identificação visual dos locais que apresentam problemas.
- Permitir que o usuário consulte informações relacionadas às ocorrências exibidas.
- Integrar a visualização da planta ao módulo de Gestão de Ocorrências.

## 3. Público-alvo

A funcionalidade será utilizada principalmente por:

- Administradores do shopping.
- Supervisores operacionais.
- Equipes de manutenção.
- Funcionários responsáveis pela conservação e inspeção dos ambientes.

A interface deverá apresentar informações de maneira clara, facilitando sua compreensão por usuários com diferentes níveis de familiaridade com sistemas informatizados.

## 4. Estrutura visual da tela

A tela deverá seguir a identidade visual geral do Capim Gestão, mantendo consistência com os demais módulos.

A organização proposta será dividida nas seguintes regiões:

### 4.1. Cabeçalho

O cabeçalho deverá identificar a funcionalidade atual.

Elementos previstos:

- Título: **Planta do Shopping**.
- Descrição breve: "Visualize as áreas do shopping e acompanhe a localização das ocorrências".
- Elementos de navegação global, caso definidos no layout principal da aplicação.

O cabeçalho deverá manter o mesmo padrão utilizado nas demais telas do sistema.

### 4.2. Área principal da planta

Será a região de maior destaque da tela.

Deverá apresentar a representação visual da planta do Capim Dourado Shopping, permitindo que o usuário identifique as áreas e localizações disponíveis.

A representação deverá:

- Ser apresentada de maneira centralizada e organizada.
- Manter a proporção original da planta sempre que possível.
- Permitir a visualização das diferentes áreas representadas.
- Apresentar indicadores visuais para as ocorrências associadas a determinadas localizações.
- Adaptar-se ao espaço disponível na interface.

A planta deverá ser utilizada como referência visual para a localização das ocorrências, não sendo apenas uma imagem decorativa.

**Importante:** a imagem oficial da planta, sua divisão por pavimentos e a identificação detalhada das áreas deverão ser definidas a partir do material disponibilizado pela equipe.

### 4.3. Identificação das ocorrências

As ocorrências registradas no sistema deverão ser representadas visualmente na planta, associadas às respectivas localizações.

Cada indicador deverá permitir identificar que existe uma ocorrência naquele local.

Ao selecionar um indicador, o sistema deverá apresentar informações relacionadas ao registro correspondente.

Informações previstas para consulta:

- Identificação da ocorrência.
- Título ou descrição do problema.
- Categoria.
- Prioridade.
- Status.
- Localização.

Os dados exibidos deverão corresponder aos registros existentes no módulo de Gestão de Ocorrências.

A interface não deverá criar informações fictícias nem apresentar dados diferentes daqueles retornados pelo sistema.

### 4.4. Área de informações

Quando uma ocorrência for selecionada, deverá existir uma área de consulta para apresentar seus dados.

Essa área poderá ser implementada como painel lateral, cartão de informações ou outro componente compatível com o padrão visual da aplicação.

Deverá apresentar:

- Identificação da ocorrência selecionada.
- Descrição do problema.
- Categoria e prioridade.
- Situação atual.
- Localização correspondente.

A apresentação deverá permitir que o usuário compreenda rapidamente qual problema está associado à localização selecionada.

## 5. Comportamentos e interações

### 5.1. Acesso à planta

Ao acessar a funcionalidade, o sistema deverá apresentar a planta do shopping e os indicadores correspondentes às ocorrências disponíveis.

Caso não existam ocorrências registradas, a planta deverá continuar sendo apresentada normalmente.

### 5.2. Seleção de uma ocorrência

Ao selecionar um indicador presente na planta:

1. O sistema deverá identificar a ocorrência correspondente.
2. Deverá apresentar as informações relacionadas ao registro.
3. A localização selecionada deverá permanecer visualmente identificável.
4. O usuário deverá conseguir consultar outra ocorrência sem precisar sair da tela.

### 5.3. Atualização das informações

As informações apresentadas deverão refletir os registros disponíveis no módulo de Gestão de Ocorrências.

A estratégia de atualização dos dados deverá seguir o padrão de comunicação definido para a aplicação.

### 5.4. Ausência de ocorrências

Quando não houver ocorrências associadas à planta, o sistema deverá apresentar uma mensagem informativa, por exemplo:

"Nenhuma ocorrência registrada para exibição."

A ausência de ocorrências não deverá impedir a visualização da planta.

### 5.5. Erro ao carregar informações

Caso ocorra uma falha na obtenção dos dados, a interface deverá apresentar uma mensagem clara ao usuário, sem expor informações técnicas ou sensíveis.

Exemplo:

"Não foi possível carregar as ocorrências. Tente novamente."

## 6. Integração com outros módulos

A Planta Interativa deverá manter integração principalmente com o módulo de Gestão de Ocorrências.

A relação entre os módulos deverá funcionar da seguinte maneira:

1. Uma ocorrência é registrada no sistema.
2. O registro possui uma localização associada.
3. A planta utiliza essa localização para identificar visualmente onde ocorreu o problema.
4. Ao selecionar o indicador, o usuário consulta as informações da ocorrência correspondente.

A comunicação entre frontend e backend deverá seguir o padrão REST, utilizando HTTP e JSON, conforme estabelecido na constituição do projeto.

O contrato da API deverá ser definido em conjunto com o responsável pelo módulo de Gestão de Ocorrências.

A equipe deverá alinhar os campos, identificadores e formato da localização antes da implementação da integração.

## 7. Requisitos funcionais relacionados

A Planta Interativa do Shopping está diretamente relacionada ao requisito funcional RF05, definido na documentação geral do Capim Gestão.

**RF05 — Permitir a identificação da localização das ocorrências na planta.**

Para atender a esse requisito, a funcionalidade deverá:

- Apresentar uma representação visual da planta do shopping.
- Identificar visualmente os locais associados às ocorrências registradas.
- Permitir que o usuário selecione uma ocorrência representada na planta.
- Apresentar informações da ocorrência selecionada.
- Relacionar corretamente cada indicador visual ao respectivo registro de ocorrência.
- Considerar a categoria e a prioridade da ocorrência, conforme os dados registrados no sistema.

A funcionalidade também deverá respeitar os requisitos RF01, RF03, RF04 e RF09, quando aplicáveis à integração com os demais módulos.

## 8. Requisitos não funcionais relacionados

A implementação deverá respeitar os requisitos não funcionais oficiais do projeto:

- **RNF01:** A tela deverá possuir interface responsiva.
- **RNF02:** O acesso deverá respeitar os mecanismos de autenticação e controle de acesso do sistema.
- **RNF03:** As informações apresentadas deverão ser provenientes de dados armazenados de forma persistente.
- **RNF04:** A interface deverá apresentar navegação intuitiva.
- **RNF05:** A localização e as informações das ocorrências deverão manter correspondência com os registros cadastrados.

## 9. Critérios de aceitação da funcionalidade

- [ ] A planta do shopping deverá ser apresentada corretamente.
- [ ] As ocorrências que possuírem localização cadastrada deverão ser identificadas na planta.
- [ ] O usuário deverá conseguir selecionar uma ocorrência.
- [ ] As informações apresentadas deverão corresponder à ocorrência selecionada.
- [ ] A categoria e a prioridade deverão corresponder aos dados registrados.
- [ ] A tela deverá tratar situações sem ocorrências disponíveis.
- [ ] A tela deverá apresentar tratamento adequado para falhas no carregamento.
- [ ] A interface deverá respeitar os requisitos não funcionais oficiais.
- [ ] A funcionalidade deverá estar integrada ao módulo de Gestão de Ocorrências.

## 10. Diretrizes de implementação

A implementação deverá respeitar as tecnologias oficiais do Capim Gestão:

**Frontend:**
- Next.js.
- TypeScript.
- HTML5.
- CSS3.

**Backend:**
- Python.
- FastAPI.

Diretrizes:

- Utilizar a estrutura de diretórios já existente no repositório.
- Reutilizar componentes visuais compartilhados quando disponíveis.
- Não criar uma identidade visual independente para esta tela.
- Não introduzir bibliotecas ou tecnologias sem justificativa e aprovação da equipe.
- Não desenvolver uma integração isolada do módulo de ocorrências.
- Consultar os contratos da API antes de implementar a comunicação com o backend.
- Preservar funcionalidades existentes no projeto.

## 11. Decisões pendentes de definição pela equipe

Antes da implementação definitiva, deverão ser esclarecidos os seguintes pontos:

1. **Planta oficial:** qual imagem ou representação será utilizada como base para a planta do Capim Dourado Shopping?
2. **Pavimentos:** a visualização contemplará um único pavimento ou permitirá alternar entre diferentes pavimentos?
3. **Localização:** como a localização de cada ocorrência será representada e armazenada?
4. **Indicadores:** qual padrão visual será utilizado para diferenciar ocorrências por prioridade ou situação?
5. **Consulta:** as informações da ocorrência serão exibidas em painel lateral, modal ou cartão?
6. **Atualização:** a tela atualizará as ocorrências automaticamente ou mediante solicitação do usuário?
7. **API:** quais serão os endpoints e os campos disponibilizados pelo módulo de Gestão de Ocorrências?

Essas decisões deverão ser alinhadas com os integrantes responsáveis pelos módulos relacionados, evitando incompatibilidades durante a integração.

---

## 12. Resultado esperado

Ao final do desenvolvimento, o Capim Gestão deverá possuir uma tela de Planta Interativa que permita visualizar a estrutura do shopping e identificar geograficamente as ocorrências registradas.

A funcionalidade deverá contribuir para o acompanhamento operacional, facilitando a identificação dos locais que necessitam de atenção e permitindo consultar as informações relacionadas aos problemas registrados.

**Regra de integração:** a Planta Interativa deverá funcionar como parte do Capim Gestão, compartilhando os mesmos padrões visuais, estruturais e de comunicação definidos para o restante da aplicação.