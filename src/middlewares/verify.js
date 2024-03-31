
const verificarCodigo = async (req, res, next) => {
    try {
        let numero = req.body.codigo
        if (numero === 0) {
            return 1;
        }

        let contador = 0;
        while (numero !== 0) {
            numero = Math.floor(numero / 10);
            contador++;
        }
        if (contador === 6) {
            next();
            return
        }
        return res.status(403).json({ message: 'El código debe ser de 6 dígitos' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const verificarCorreo = async (req, res, next) => {
    try {
        const correo = req.body.correo;
        if (!/@elzu\.pe$/.test(correo)) {
            return res.status(403).json({ message: 'El correo debe ser de dominio @elzu.pe' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    verificarCodigo,
    verificarCorreo,
}