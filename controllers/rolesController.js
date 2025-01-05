const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');
const {Roles } = require('../config/indexDB')


const getRoles = async (req, res) =>{
    try {
      const data = await Roles.findAll()
      res.json(data)
    } catch (error) {
      res.json({'message' : 'Not found'})
    }
  }

module.exports = {
    getRoles
}