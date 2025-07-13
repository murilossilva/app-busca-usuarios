# 🧩 Aplicação de Cadastro de Usuários com Micro Frontends (Angular + Module Federation)

Este projeto é uma arquitetura de **Micro Frontends (MFEs)** utilizando Angular 15+ e Module Federation, com foco em separação de responsabilidades, comunicação entre MFEs e compartilhamento de estado global com **NgRx**.

## 📦 Estrutura

```
/app-busca-usuarios
├── shell             # Aplicação principal que hospeda os MFEs e contém o NgRx Store
├── mfe-register      # MFE responsável pelo cadastro de usuários
├── mfe-success       # MFE responsável por exibir a tela de sucesso
└── db.json           # Base fake de dados usada pelo JSON Server
```

## 🚀 Tecnologias Utilizadas

- Angular 15+
- Module Federation via `@angular-architects/module-federation`
- NgRx (Store)
- RxJS
- JSON Server
- Jest (testes unitários)

---

## 🧠 Funcionalidades

- Cadastro de usuários
- Validações completas de formulário
- Exibição de tela de sucesso após cadastro
- Proteção de rota via guard
- Compartilhamento de estado entre MFEs via Store
- Testes com Jest

---

## 📁 Configuração do Ambiente

### 1. Instale as dependências em cada projeto

```bash
cd shell && npm install
cd ../mfe-register && npm install
cd ../mfe-success && npm install
```

### 2. Inicie o JSON Server (na raiz do monorepo)

```bash
npm run start:json-server
```

> Isso inicia um backend fake usando `db.json` em `http://localhost:3000`

---

## 🔗 Executando os MFEs

Você pode iniciar todos os projetos simultaneamente:

### Terminal 1: Shell

```bash
cd shell
npm start
# http://localhost:4200
```

### Terminal 2: MFE Register

```bash
cd mfe-register
npm start
# http://localhost:4202
```

### Terminal 3: MFE Success

```bash
cd mfe-success
npm start
# http://localhost:4201
```

---

## 🧠 Compartilhamento de Estado

A aplicação utiliza `NgRx Store` no Shell para armazenar o usuário cadastrado.

- O `setUser` é disparado via `dispatch` no MFE de Cadastro.
- O Guard localizado no Shell utiliza o Store para decidir se deve permitir acesso à rota `/success`.
- A leitura do Store no Guard usa `inject(Store)` com `.select(selectUser)`.

---

## 🔐 Proteção de Rotas (Guard)

A rota `/success` só é acessível se houver um `user` no Store. Isso evita o acesso direto à rota sem cadastro prévio.

```ts
export const successGuard = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (user && user.id) return true;
      router.navigate(['/']);
      return false;
    })
  );
};
```

---

## 🧪 Testes com Jest

### Configuração

- `jest.config.js` está configurado com `jest-preset-angular`
- O arquivo `setup-jest.ts` inicializa o ambiente de testes Angular
- Ajustes feitos para suporte ao ESModules e `.json`

### Executando

```bash
npm run test
```

---

## 💡 Boas práticas

- Aplicação utiliza `ViewEncapsulation.ShadowDom` para isolar estilos por MFE
- Ícones com FontAwesome respeitam escopo
- Validação personalizada de e-mail rigorosa
- Ao acessar diretamente `/success`, o guard impede acesso indevido

---

## 📬 Contato

Se quiser sugerir melhorias, abra uma issue ou PR.

---

## 📜 Licença

MIT © 2025 Murilo Souza da Silva