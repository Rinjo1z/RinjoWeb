// middlewares/roles.js
function allowRoles(...roles) {
  return (req, res, next) => {
    // Verifica que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    // Verifica si el rol del usuario está permitido
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    next();
  };
}

module.exports = { allowRoles };
