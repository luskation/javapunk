const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){ 
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Token não fornecido'});
    }
    try {
        const dadosDoUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = dadosDoUser;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'});
    }
}


module.exports = authMiddleware;