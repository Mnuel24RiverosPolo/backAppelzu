const app = require('./app.js');
require('./database/Connection.js');
require('./libs/initialSetup.js');
const {PORT} = require("./config.js");

app.listen(PORT, () =>{
    console.log('server on port', PORT);

});
