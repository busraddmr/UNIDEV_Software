# MyUNI Eğitim Platformu - Backend Staj Görevi

Bu proje, MyUNI Eğitim Platformu backend staj başvurusu kapsamında geliştirilmiş, modüler yapıda ve kurumsal standartlara uygun bir **Blog Yönetim Sistemi API**'sidir.

## 🚀 Teknolojiler
* **Dil/Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Prisma (PostgreSQL)
* **Güvenlik:** JWT (JSON Web Token) & Bcryptjs
* **Veritabanı:** PostgreSQL (pgAdmin ile yönetilmektedir)

## 🛠️ Kurulum ve Çalıştırma

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Veritabanı Yapılandırması:**
    `.env` dosyanızı oluşturun ve PostgreSQL bağlantı adresinizi ekleyin:
    ```env
    DATABASE_URL="postgresql://kullanici_adi:sifre@localhost:5432/myuni_blog"
    JWT_SECRET="gizli_anahtar"
    ```

3.  **Veritabanı Şemasını Senkronize Edin:**
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Uygulamayı Başlatın:**
    ```bash
    node app.js
    ```

## 📋 API Uç Noktaları (Endpoints)

### 🔐 Kimlik Doğrulama (Auth)
* `POST /api/auth/register` - Yeni kullanıcı kaydı oluşturur.
* `POST /api/auth/login` - Giriş yapar ve yetkilendirme için JWT döndürür.

### 📝 Makaleler (Posts)
* `GET /api/posts` - Tüm makaleleri (yazar bilgisiyle) listeler.
* `GET /api/posts/:id` - Makale detayını ve yorumları getirir.
* `POST /api/posts` - Yeni makale ekler (**Auth Token Gerekli**).
* `PUT /api/posts/:id` - Makaleyi günceller (**Auth Token Gerekli**).
* `DELETE /api/posts/:id` - Makaleyi siler (**Auth Token Gerekli**).

### 💬 Yorumlar (Comments)
* `POST /api/comments` - Belirli bir makaleye yorum ekler (**Auth Token Gerekli**).
* `DELETE /api/comments/:id` - Yorumu siler (**Auth Token Gerekli**).

## 📂 Proje Yapısı
Proje, sürdürülebilirlik ve ölçeklenebilirlik için katmanlı mimari (Layered Architecture) kullanılarak tasarlanmıştır:
- `controllers/`: İş mantığının (business logic) yönetimi.
- `routes/`: URL yönlendirmeleri.
- `middlewares/`: Kimlik doğrulama ve güvenlik kontrolleri.
- `prisma/`: Veritabanı şeması ve modeller.