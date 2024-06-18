# PI---BackEnd

Esta é uma API RESTful construída com Node.js, Express, e MongoDB. Esta API permite operações CRUD (Create, Read, Update, Delete) em uma entidade de Produto, além de funcionalidades de autenticação para proteger rotas sensíveis. A documentação da API é feita com Swagger para facilitar a compreensão e o uso das rotas disponíveis.

Funcionalidades
Autenticação de Usuário:

Registro de usuários
Login de usuários
Proteção de rotas com JWT (JSON Web Token)
Operações CRUD em Produtos:

Criação de produtos
Leitura de todos os produtos
Leitura de produto por ID
Atualização de produto por ID
Deleção de produto por ID
Documentação:

Documentação detalhada da API utilizando Swagger
Tecnologias Utilizadas
Node.js
Express
MongoDB (MongoDB Atlas para o banco de dados na nuvem)
Mongoose (ODM para MongoDB)
JWT (JSON Web Token)
Swagger (Documentação da API)
Requisitos
Node.js instalado (versão 14.x ou superior)
NPM (gerenciador de pacotes do Node.js)
Conta no MongoDB Atlas (ou MongoDB local)

Como Rodar o Projeto
Requisitos
Node.js
NPM
MongoDB (MongoDB Atlas ou local)
Passo a Passo
Clonar o Repositório

sh
Copiar código
git clone https://github.com/seu-usuario/pi-backend.git
cd pi-backend
Instalar as Dependências

sh
Copiar código
npm install
Rodar o Servidor

sh
Copiar código
node src/index.js
Você deve ver a mensagem "Servidor rodando na porta 3000" e "MongoDB conectado" no terminal.

Acessar a Documentação do Swagger

Abra o navegador e acesse http://localhost:3000/api-docs.

Testando a API
Registro de Usuário
Método: POST
URL: http://localhost:3000/api/auth/register
Body:
json
Copiar código
{
  "username": "usuarioteste",
  "password": "senhateste"
}
Login de Usuário
Método: POST

URL: http://localhost:3000/api/auth/login

Body:

json
Copiar código
{
  "username": "usuarioteste",
  "password": "senhateste"
}
Resposta Esperada: JSON com o token

json
Copiar código
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Criar Produto
Método: POST
URL: http://localhost:3000/api/produtos
Headers:
Authorization: Bearer <seu_token>
Body:
json
Copiar código
{
  "nome": "Produto Teste",
  "preco": 100,
  "descricao": "Descrição Teste",
  "categoria": "Categoria Teste"
}
Obter Todos os Produtos
Método: GET
URL: http://localhost:3000/api/produtos
Headers:
Authorization: Bearer <seu_token>
Obter Produto por ID
Método: GET
URL: http://localhost:3000/api/produtos/<id_do_produto>
Headers:
Authorization: Bearer <seu_token>
Atualizar Produto por ID
Método: PUT
URL: http://localhost:3000/api/produtos/<id_do_produto>
Headers:
Authorization: Bearer <seu_token>
Body:
json
Copiar código
{
  "nome": "Produto Atualizado",
  "preco": 150,
  "descricao": "Descrição Atualizada",
  "categoria": "Categoria Atualizada"
}
Deletar Produto por ID
Método: DELETE
URL: http://localhost:3000/api/produtos/<id_do_produto>
Headers:
Authorization: Bearer <seu_token>

