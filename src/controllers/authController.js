const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// KULLANICI KAYIT
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword }
        });
        res.status(201).json({ message: "Kayıt başarılı", userId: user.id });
    } catch (error) {
        res.status(400).json({ error: "Email veya kullanıcı adı zaten kullanımda." });
    }
};

// KULLANICI GİRİŞ
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, userId: user.id });
        } else {
            res.status(401).json({ error: "E-posta veya şifre hatalı" });
        }
    } catch (error) {
        res.status(500).json({ error: "Giriş işlemi sırasında hata oluştu" });
    }
};
// Kullanıcının kendi profilini (username/email) güncellemesi
exports.updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: req.userData.userId }, // Token'dan gelen güvenli ID
            data: { username, email }
        });
        res.json({ message: "Profil başarıyla güncellendi", updatedUser });
    } catch (error) {
        res.status(400).json({ error: "Güncelleme sırasında hata oluştu." });
    }
};