// Importa o express, esse é procurado dentro do diretório node_modules
const express = require("express");

// Cria a aplicação express
const app = express();

// Define a rota para o caminho '/'
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a porta em que o servidor vai rodar
const port = 3000
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
});

