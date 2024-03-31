const mongoose = require("mongoose");
//const MONGODB_URI = "mongodb://localhost:27017/Elzu";
const MONGODB_URI = `mongodb+srv://Tiago:tysonryx123@projects.dkslbjj.mongodb.net/Elzu?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
    .then(db => console.log('Conectado'))
    .catch(error => console.log('Desconectado'))