# Global Solution - AgroGestão Mobile

## Descrição do Projeto
O AgroGestão é um aplicativo desenvolvido em React Native (Expo) focado no gerenciamento de áreas de plantio para pequenos agricultores. Através dele, é possível realizar o controle das culturas cadastradas, acompanhando o tamanho da área e o status atual da safra.

O aplicativo integra com uma API REST externa para realizar o CRUD de dados, não dependendo de armazenamento local no dispositivo para persistência. 

## Integrantes do Grupo
* Lucas Felix VASSILIADES - RM: 97677

## Explicação Técnica

### Estrutura de pastas e arquitetura
O projeto adota uma arquitetura modular baseada no padrão de componentes do React. A pasta raiz `src/` contém toda a lógica do aplicativo dividida da seguinte forma:
- `routes/`: Configuração e mapeamento das telas (Stack Navigation).
- `screens/`: Contém as 5 telas interativas do aplicativo.
- `services/`: Isolamento da lógica de comunicação com a rede (Axios e chamadas).
- `styles/`: Definições globais de Design System (cores, tipografia, sombras).
- `types/`: Interfaces TypeScript que garantem a segurança do código.

### Componentes, serviços e rotas
- **Rotas:** Utilizamos o `@react-navigation/native-stack` para garantir uma navegação natural e empilhada (com botões nativos de "voltar").
- **Serviços:** Os dados são buscados por funções isoladas em `plantingService.ts`. O componente de tela apenas consome a Promise e reage ao estado de carregamento, separando a regra de negócio da regra visual.

### Bibliotecas utilizadas e justificativas
- **Axios:** Biblioteca padrão de mercado para integrações HTTP. Usada pela facilidade em criar instâncias (`axios.create`) e suporte fácil ao TypeScript.
- **React Navigation:** Oficialmente recomendada pela equipe do React Native para lidar com fluxos de telas complexos.
- **Expo Linear Gradient e Vector Icons:** Responsáveis pelo visual polido (UI/UX) da aplicação.
- **Prettier e ESLint:** Ferramentas configuradas no projeto para garantir que o código escrito cumpra as exigências de indentação e legibilidade limpa de forma automática.

### Integração com backend/API
A integração é feita por meio de uma API REST. O serviço `plantingService` é capaz de executar todas as rotas clássicas do padrão REST:
- `GET /plantings` (Leitura total)
- `GET /plantings/{id}` (Leitura de único elemento)
- `POST /plantings` (Criação)
- `PUT /plantings/{id}` (Atualização)
- `DELETE /plantings/{id}` (Remoção)

## Como rodar o projeto
1. Clone o repositório
2. Rode `npm install` na pasta do projeto
3. Rode `npx expo start`
4. Leia o QR Code usando o Expo Go no celular ou aperte `a` para rodar no emulador Android
