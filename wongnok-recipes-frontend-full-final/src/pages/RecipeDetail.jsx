import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("loggedInUser");
    setUser(username);

    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนรีวิว");
      return;
    }

    const hasReviewed = reviews.some((r) => r.user === user);
    if (hasReviewed) {
      alert("คุณรีวิวสูตรนี้ไปแล้ว");
      return;
    }

    if (recipe.createdBy === user) {
      alert("คุณไม่สามารถรีวิวสูตรของตนเองได้");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/recipes/${id}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, { rating, comment, user }]);
      setComment("");
      setRating(5);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการส่งรีวิว");
      console.error(err);
    }
  };

  if (!recipe) return <div className="p-6">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold text-orange-600 mb-2">{recipe.title}</h1>

      <h2 className="text-lg font-semibold mb-1">ส่วนผสม</h2>
      <p className="text-gray-700 whitespace-pre-line mb-4">{recipe.ingredients}</p>

      <h2 className="text-lg font-semibold mb-1">วิธีทำ</h2>
      <p className="text-gray-700 whitespace-pre-line mb-6">{recipe.steps}</p>

      <h2 className="text-lg font-semibold mb-2">รีวิวทั้งหมด</h2>
      <ul className="space-y-2 mb-6">
        {reviews.map((r, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded-md">
            ⭐ {r.rating} / 5<br />
            <span className="text-sm text-gray-600">{r.comment}</span>
          </li>
        ))}
        {reviews.length === 0 && <li className="text-gray-500">ยังไม่มีรีวิว</li>}
      </ul>

      <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">ให้คะแนนและเขียนรีวิว</h3>
        <label className="block mb-2 text-sm">คะแนน (1–5 ดาว)</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mb-3 border rounded px-2 py-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <textarea
          placeholder="เขียนรีวิว..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          ส่งรีวิว
        </button>
      </form>
    </div>
  );
};

export default RecipeDetail;