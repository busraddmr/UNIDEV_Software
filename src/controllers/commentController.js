const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        const comment = await prisma.comment.create({
            data: {
                text,
                postId: parseInt(postId),
                authorId: req.userData.userId // Giriş yapan kullanıcı
            }
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: "Yorum eklenemedi." });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = parseInt(req.params.id);
        await prisma.comment.delete({ where: { id: commentId } });
        res.json({ message: "Yorum silindi." });
    } catch (error) {
        res.status(400).json({ error: "Yorum silinirken hata oluştu." });
    }
};