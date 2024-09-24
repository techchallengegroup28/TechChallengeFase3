# Tech Challenge 3 🚀

## Setup inicial

1. Rode o comando abaixo para clonar o repositório:

```
git clone https://github.com/techchallengegroup28/TechChallengeFase3
```

2. Rode o comando abaixo para instalar as dependências:

```bash
npm install
```

3. Rode o servidor:

### Desenvolvimento

```bash
npm run dev
```

### Produção

Gere primeiro o build com o comando abaixo:

```bash
npm run build
```

Agora rode o servidor com o build gerado com o comando abaixo:

```bash
npm run start
```

Abra [http://localhost:3001](http://localhost:3001) com o seu navegador para ver o resultado.

## Arquitetura da aplicação

### Aplicando Docker

Para rodar o docker, rode o comando abaixo:

```
docker-compose up -d
```

### Rotas

<P>[GET] / Exibe os posts na página inicial</P>
<P>[GET] /post-detalhes/{id} Exibe o conteúdo de um post específico</P>
<P>[GET] /login Exibe a página para o administrador realizar o login</P>
<P>[GET] /admin Exibe os posts na tela de administrador</P>
<P>[GET] /admin/post-criar Exibe a página para o administrador criar um post</P>
<P>[GET] /admin/post-editar/{id} Exibe a página para o administrador editar um post</P>
