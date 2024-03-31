const { config } = require("dotenv");
config();

module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET || 'elzu',
    ADMIN_NOMBRE: process.env.ADMIN_NOMBRE || 'admin',
    ADMIN_CLAVE: process.env.ADMIN_CLAVE || '1234',
    ADMIN_CORREO: process.env.ADMIN_CORREO || 'admin@elzu.pe',
    ADMIN_ROL: process.env.ROL || 'administrador'
  };
