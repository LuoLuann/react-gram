// para upload de imagem
const multer = require("multer")
const path = require("path")


// Destination to store
const imageStorage = multer.diskStorage({
    //aqui estou mudando o nome do repositorio
    destination: (req, file, callBack) => {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        callBack(null, `uploads/${folder}/`)
    },
    // aqui estou mudando o nome do arquivo
    filename: (req, file, callBack) => {


        callBack(null, Date.now() + path.extname(file.originalname))
    }
})
const imageUpload = multer({
    // estou chamando a função anterior para validar
    storage: imageStorage,
    fileFilter(req, file, callBack) {
        // verificando se o arquivo termina com essa extensão
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg formats
            return callBack(new Error("Por favor, envie apenas png ou jpg"))
        }
        callBack(undefined, true)
    }
})
module.exports = { imageUpload }
