
# 🥘 Wongnok Recipes – ระบบแชร์สูตรอาหาร

เว็บแอปสำหรับแชร์สูตรอาหาร พร้อมระบบสมัครสมาชิก, เข้าสู่ระบบ, รีวิว และให้คะแนนสูตรอาหาร

---

## 🚀 คุณสมบัติหลัก
- ✅ สมัครสมาชิก / เข้าสู่ระบบ / ออกจากระบบ
- ✅ แชร์สูตรอาหาร
- ✅ รีวิว + ให้คะแนนสูตรละ 1 ครั้ง
- ✅ ห้ามเจ้าของสูตรรีวิวตัวเอง
- ✅ ระบบค้นหาสูตร
- ✅ โปรไฟล์ผู้ใช้ (ชื่อ, นามสกุล, เบอร์, สังกัด, รหัสพนักงาน, คะแนนรวม)

---

## 📁 โครงสร้างโฟลเดอร์

```
.
├── backend/
│   ├── server.js              // Backend Express API
│   └── ...                   // Routes, models, etc.
├── frontend/
│   ├── src/
│   │   ├── pages/             // หน้า: Login, Signup, Home, Profile
│   │   └── components/        // ส่วนย่อยต่างๆ
│   ├── tailwind.config.js
│   └── ...
├── README.md                 // คู่มือนี้
```

---

## 🧰 เครื่องมือที่ใช้

| Frontend (React) | Backend (Node.js + Express) | DB (mock) |
|------------------|-----------------------------|-----------|
| Vite + Tailwind  | Express.js + MongoDB (mock) | localStorage |

---

## ✅ ขั้นตอนการติดตั้งระบบ

### 1️⃣ ติดตั้ง Backend

```bash
cd backend
npm install
node server.js
```

> ✅ เริ่มที่ `http://localhost:5000`

---

### 2️⃣ ติดตั้ง Frontend

```bash
cd frontend
npm install
npm run dev
```

> ✅ เปิดหน้าเว็บที่ `http://localhost:5173`

---

## 🧪 การทดสอบระบบ

1. เปิดเบราว์เซอร์ที่ `http://localhost:5173`
2. สมัครสมาชิก → เข้าสู่ระบบ
3. แชร์สูตรอาหาร
4. กดดูรายละเอียดเมนู → รีวิว + ให้คะแนน
5. กดที่ “โปรไฟล์ของฉัน” → ตรวจสอบข้อมูลและคะแนนรวม

---

## 🛠 หากพบปัญหา

- ตรวจสอบว่า backend (`server.js`) รันอยู่บนพอร์ต `5000`
- ตรวจสอบว่า frontend รันผ่าน `npm run dev` และไม่เจอ error CORS
- ดูที่ `console.log()` เพื่อ debug token และการส่งรีวิว

---

## 📦 การอัปโหลดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

---

## 🙌 ผู้พัฒนา

- 👤 [ศานติพงศ์ พุ่มพึ่งพุฒ]
- 💼 [ตำแหน่ง พชง.6/ 502235 / กฟส.ทสก.]
