const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('Acesso negado. Nenhum token fornecido.');
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Certifique-se de que o userId está sendo extraído corretamente
    console.log('Authenticated user ID:', req.user.id); // Adicionando log
    next();
  } catch (error) {
    console.log('Token inválido:', error.message);
    res.status(400).json({ message: 'Token inválido' });
  }
};
