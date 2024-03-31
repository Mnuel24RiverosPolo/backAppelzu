const {Schema, model} = require('mongoose');

const opcionSchema = new Schema(
    {
        _id: String,
        name: String,
    }, {
        versionKey: false
    }
);

module.exports = model("Opcion", opcionSchema)
