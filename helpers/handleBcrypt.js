const bcrypt = require('bcrypt');
const saltRounds = 10

// Encryptar
const encrypt = async (password) => {
    const hash = await bcrypt.hash(password,saltRounds)
    return hash
}

// Comparar
const compare = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {encrypt, compare}