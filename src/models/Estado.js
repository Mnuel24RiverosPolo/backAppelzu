const {Schema, model} = require('mongoose');

const estadoSchema = new Schema(
    {
        _id: Number,
        name: String,
    }, {
        versionKey: false
    }
);

module.exports = model("Estado", estadoSchema)
