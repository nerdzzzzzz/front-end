# Nerdz App

Bem-vindo ao **Nerdz App**! Este é um aplicativo móvel de estudos desenvolvido com React Native e Expo, focado em oferecer uma experiência social e gamificada.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza uma stack moderna e robusta para desenvolvimento mobile:

*   **[React Native](https://reactnative.dev/)** com **[Expo](https://expo.dev/)** (SDK 54)
*   **[TypeScript](https://www.typescriptlang.org/)** para tipagem estática e segurança.
*   **[Expo Router](https://docs.expo.dev/router/introduction/)** para navegação baseada em arquivos.
*   **[NativeWind](https://www.nativewind.dev/)** (Tailwind CSS) para estilização rápida e consistente.
*   **[Firebase](https://firebase.google.com/)** para autenticação e backend.
*   **[Lucide React Native](https://lucide.dev/)** para ícones.

## 📱 Funcionalidades Principais

*   **Autenticação Segura:** Login social (Google) e gerenciamento de sessão com Firebase.
*   **Navegação Intuitiva:** Estrutura de abas (Tabs) e pilhas (Stack) gerenciadas pelo Expo Router.
*   **Gamificação:** Tela de Leaderboard para engajamento dos usuários.
*   **Perfil de Usuário:** Visualização e edição de informações do perfil.
*   **Design Responsivo:** Interface adaptável com suporte a tema claro e escuro.

## 📂 Estrutura do Projeto

A estrutura de pastas segue as convenções do Expo Router:

```
/
├── app/                 # Rotas e telas do aplicativo
│   ├── (app)/           # Rotas protegidas (logado)
│   │   ├── (tabs)/      # Navegação por abas (Home, Leaderboard, Perfil)
│   │   ├── settings.tsx # Configurações
│   │   └── start.tsx    # Tela inicial pós-login
│   ├── (auth)/          # Rotas de autenticação (Login)
│   └── _layout.tsx      # Layout raiz e lógica de proteção de rotas
├── components/          # Componentes reutilizáveis (UI, NativeWind)
├── context/             # Contextos do React (AuthContext)
├── lib/                 # Utilitários e configurações (Firebase, etc.)
├── theme/               # Definições de tema e cores
└── assets/              # Imagens e fontes
```

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

*   [Node.js](https://nodejs.org/) (recomendado LTS)
*   Gerenciador de pacotes (npm ou yarn)
*   Configuração do ambiente para [Expo](https://docs.expo.dev/get-started/installation/)

## 🏃‍♂️ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <seu-repositorio>
    cd nerdz-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
    ```

4.  **Execute no dispositivo/emulador:**
    *   **Android:** Pressione `a` no terminal (requer Android Studio/emulador configurado).
    *   **iOS:** Pressione `i` no terminal (requer Xcode/simulador - apenas Mac).
    *   **Físico:** Escaneie o QR Code com o aplicativo **Expo Go**.

## 🔧 Scripts Disponíveis

*   `npm start`: Inicia o projeto com o dev client.
*   `npm run android`: Gera a build e roda no Android.
*   `npm run ios`: Gera a build e roda no iOS.
*   `npm run reset-project`: Reseta o projeto (cuidado!).
*   `npm run lint`: Executa a verificação de linting.

## 🤝 Contribuição

Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

---
By: Icaro