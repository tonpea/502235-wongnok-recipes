import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const recipes = [
    {
      id: 1,
      title: "ข้าวผัดกุ้ง",
      image: "/images/fried-rice.jpg"
    },
    {
      id: 2,
      title: "แกงเขียวหวาน",
      image: "/images/green-curry.jpg"
    },
    {
      id: 3,
      title: "ต้มยำกุ้ง",
      image: "/images/tomyum.jpg"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">Wongnok Recipes</h1>
          <nav className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-orange-600 font-medium">เข้าสู่ระบบ</Link>
            <Link to="/signup" className="text-gray-700 hover:text-orange-600 font-medium">สมัครสมาชิก</Link>
            <Link to="/share" className="bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition">แชร์สูตร</Link>
          </nav>
        </div>
      </header>

      <main className="py-10 max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">สูตรอาหารล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{recipe.title}</h3>
                <p className="text-sm text-gray-500 mt-2">คลิกเพื่อดูรายละเอียดสูตร</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
