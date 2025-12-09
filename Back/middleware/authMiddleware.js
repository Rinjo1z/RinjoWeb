const jwt = require('jsonwebtoken');

// Este es el "Cadenero"
const verificarToken = (req, res, next) => {
    // 1. Buscamos el token en los headers de la petición
    // Normalmente viene como: "Bearer eyJhbGciOiJIUzI1..."
    const authHeader = req.headers['authorization'];
    
    // Si no hay header, chao
    if (!authHeader) {
        return res.status(403).json({ mensaje: 'No hay token, permiso denegado' });
    }

    // Quitamos la palabra "Bearer " para dejar solo el código
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ mensaje: 'Formato de token inválido' });
    }

    // 2. Verificamos si el token es original con nuestra firma secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, userDecodificado) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido o expirado' });
        }

        // 3. ¡Éxito! Guardamos los datos del usuario en la petición (req)
        // para que el controlador sepa quién es.
        req.user = userDecodificado;
        
        // 4. NEXT() es vital: Le dice a Express "Déjalo pasar al controlador"
        next(); 
    });
};

module.exports = verificarToken;