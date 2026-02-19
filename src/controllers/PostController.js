const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tüm makaleleri listeleme
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: { select: { username: true } } } // Yazarı da getir
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Makaleler getirilemedi." });
    }
};

// Makale Detayı Görüntüleme
exports.getPostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { comments: true, author: true }
        });
        if (!post) return res.status(404).json({ message: "Makale bulunamadı" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Hata oluştu." });
    }
};

// Yeni Makale Ekleme (Token gerektirir)
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.userData.userId // Token'dan gelen kullanıcı ID'si
            }
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: "Makale oluşturulamadı." });
    }
};

// Makale Güncelleme
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await prisma.post.update({
            where: { id: parseInt(req.params.id) },
            data: { title, content }
        });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: "Güncelleme başarısız." });
    }
};

// Makale Silme
exports.deletePost = async (req, res) => {
    try {
        await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Makale silindi." });
    } catch (error) {
        res.status(400).json({ error: "Silme başarısız." });
    }
};