const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const connection = async () => {
    try {

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.t0p3n2s.mongodb.net/?retryWrites=true&w=majority
            `
        )

        console.log('conectou ao banco')

        return dbConn

    } catch (error) {
        console.log(error)
    }
}

connection()

module.exports = connection
