const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Header'dan token'ı al (Format: Bearer TOKEN_BURADA)
        const token = req.headers.authorization.split(' ')[1];
        
        // Token'ı doğrula
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Kullanıcı bilgisini isteğe (req) ekle ki diğer controller'lar kullanabilsin
        req.userData = { userId: decodedToken.userId };
        
        next(); // Bir sonraki aşamaya (Controller'a) geç
    } catch (error) {
        return res.status(401).json({
            message: 'Yetkilendirme başarısız! Lütfen giriş yapın.'
        });
    }
};