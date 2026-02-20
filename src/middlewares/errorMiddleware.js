module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || 'Sunucu tarafında bir hata oluştu!';
    res.status(status).json({ success: false, message });
};