const {Schema, model} = require('mongoose');

const rolSchema = new Schema(
    {
        name: String,
    }, {
        versionKey: false
    }   
);

module.exports = model("Rol", rolSchema)
