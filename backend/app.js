// ---- arquivo de inicialização da aplicação
require("dotenv").config();

//
const express = require("express")

// path do proprio nodejs para determinar o diretorio das imagens
const path = require("path")

// para acessar o projeto da propria aplicação do front end
const cors = require("cors")

const port = process.env.PORT;

const app = express()

// configuração do json e do a resposta de dados do form
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Resolvendo cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// upload de imagens
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// DB connection
require('./configs/db.js')

// rotas
const router = require('./routes/Router.js')
app.get("/", (req, res) => {
    res.send("API Working!");
  });
app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
