
const { validationResult } = require('express-validator')

// esse next avalia se a requisicao vai ou n passar adiante
const validate = (req, res, next) => {

    // passando os erros que vieram da requisicao
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }
    const extractedErros = []

    errors.array().map((err) => extractedErros.push(err.msg))

    return res.status(422).json({
        errors: extractedErros
    })
}
module.exports = validate
