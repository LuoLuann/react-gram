
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {

    // todos headers possuem authorization
    const authHeader = req.headers['authorization']

    // reqs que n possuem esse header n possuem o token
    const token = authHeader && authHeader.split(" ")[1]
    // e estamos separando o token em duas partes, ele vem assim:
    // Bearer yyuiuahidi2948924928jka
    // se ele falhar em ter authHeader, nem cria o token

    // check if header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

    // check if token is valid
    try {
        // vamos comparar o token com o nosso jwt secret
        const verified = jwt.verify(token, jwtSecret)

        // preciso colocar o usuario pelo id que ta no token na requisicao
        // extraindo dados do usuario sem ter que fazer novas consultas ao banco
        // mas n queremos passar a senha
        req.user = await User.findById(verified.id).select("-password")

        next()
    } catch (error) {
        console.log(error)
        console.log("token: " + token)
        res.status(400).json({errors: ["Token inválido."]})
    }
}

module.exports = authGuard
