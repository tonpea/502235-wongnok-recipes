import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const recipes = [
    {
      id: "1",
      title: "ข้าวผัดกุ้ง",
      image: "/images/fried-rice.jpg",
    },
    {
      id: "2",
      title: "แกงเขียวหวาน",
      image: "/images/green-curry.jpg",
    },
    {
      id: "3",
      title: "ต้มยำกุ้ง",
      image: "/images/tomyum.jpg",
    },
  ];

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">Wongnok Recipes</h1>
        <div className="space-x-4">
          {loggedInUser ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-orange-600">โปรไฟล์ของฉัน</Link>
              <Link to="/logout" className="text-gray-700 hover:text-orange-600">ออกจากระบบ</Link>
              <Link to="/share" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                แชร์สูตร
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-600">เข้าสู่ระบบ</Link>
              <Link to="/signup" className="text-gray-700 hover:text-orange-600">สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mt-8 mb-6">
        <input
          type="text"
          placeholder="🔍 ค้นหาสูตรอาหาร..."
          className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipes Grid */}
      <main className="px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.length > 0 ? (
            filtered.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
                  <p className="text-sm text-orange-500 mt-1">คลิกเพื่อดูรายละเอียด</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-10">
              ไม่พบสูตรอาหารที่ค้นหา
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;