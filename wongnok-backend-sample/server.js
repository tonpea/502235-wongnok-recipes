const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    username: "testuser",
    password: "123456",
    firstName: "สมชาย",
    lastName: "ใจดี",
    phone: "0812345678",
    department: "ฝ่ายไอที",
    employeeId: "EMP001"
  }
];

const recipes = [
  {
    id: "1",
    title: "ข้าวผัดกุ้ง",
    image: "/images/fried-rice.jpg",
    ingredients: "ข้าว, กุ้ง, ไข่, กระเทียม, น้ำปลา, พริกไทย",
    steps: "1. ตั้งกระทะใส่น้ำมัน\n2. เจียวกระเทียม ใส่กุ้ง\n3. ตอกไข่ใส่ผัด\n4. ใส่ข้าว ผัดให้เข้ากัน\n5. ปรุงรสตามชอบ",
    createdBy: "testuser",
    reviews: [],
  },
  {
    id: "2",
    title: "แกงเขียวหวาน",
    image: "/images/green-curry.jpg",
    ingredients: "ไก่, มะเขือ, กะทิ, พริกแกงเขียวหวาน, ใบโหระพา",
    steps: "1. ผัดพริกแกงกับกะทิ\n2. ใส่ไก่ลงไป\n3. เติมมะเขือ\n4. ปรุงรสและใส่ใบโหระพา",
    createdBy: "testuser",
    reviews: [],
  },
  {
    id: "3",
    title: "ต้มยำกุ้ง",
    image: "/images/tomyum.jpg",
    ingredients: "กุ้ง, ตะไคร้, ข่า, ใบมะกรูด, น้ำปลา, มะนาว",
    steps: "1. ต้มน้ำใส่ตะไคร้ ข่า ใบมะกรูด\n2. ใส่กุ้งลงไป\n3. ปรุงรสด้วยน้ำปลาและมะนาว",
    createdBy: "testuser",
    reviews: [],
  }
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, token: 'mock-jwt-token', user });
  } else {
    res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { username, password, firstName, lastName, phone, department, employeeId } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "มีผู้ใช้นี้อยู่แล้ว" });
  }
  const newUser = { username, password, firstName, lastName, phone, department, employeeId };
  users.push(newUser);
  res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", user: newUser });
});

app.get("/api/users/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== "mock-jwt-token") {
    return res.status(401).json({ message: "unauthorized" });
  }
  const user = users.find(u => u.username === "testuser");
  if (!user) return res.status(404).json({ message: "ไม่พบผู้ใช้" });

  const myRecipes = recipes.filter(r => r.createdBy === "testuser");
  const totalRating = myRecipes.reduce((sum, r) =>
    sum + r.reviews.reduce((s, rev) => s + rev.rating, 0), 0);

  res.json({ ...user, recipes: myRecipes, totalRating });
});

app.get("/api/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "ไม่พบสูตรอาหาร" });
  }
});

app.post("/api/recipes/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const user = req.headers.authorization?.split(" ")[1] === "mock-jwt-token" ? "testuser" : "unknown";
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return res.status(404).json({ message: "ไม่พบสูตรอาหาร" });

  if (recipe.reviews.some(r => r.user === user)) {
    return res.status(400).json({ message: "คุณรีวิวสูตรนี้ไปแล้ว" });
  }
  if (recipe.createdBy === user) {
    return res.status(400).json({ message: "ไม่สามารถรีวิวสูตรตัวเองได้" });
  }

  recipe.reviews.push({ rating, comment, user });
  res.json({ message: "รีวิวสำเร็จ", reviews: recipe.reviews });
});

app.post("/api/recipes", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== "mock-jwt-token") return res.status(401).json({ message: "unauthorized" });

  const { title, description } = req.body;
  const newRecipe = {
    id: (recipes.length + 1).toString(),
    title,
    image: "/images/default.jpg",
    ingredients: "ไม่ระบุ",
    steps: description,
    createdBy: "testuser",
    reviews: []
  };
  recipes.push(newRecipe);
  res.status(201).json({ message: "แชร์สูตรสำเร็จ", recipe: newRecipe });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});