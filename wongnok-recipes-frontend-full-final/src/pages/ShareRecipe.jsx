import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShareRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนแชร์สูตร");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/recipes",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("แชร์สูตรสำเร็จ");
      navigate("/");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการแชร์สูตร");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">แชร์สูตรอาหาร</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ชื่อเมนู"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="วิธีทำ / ส่วนผสม"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded h-32"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          แชร์สูตร
        </button>
      </form>
    </div>
  );
};

export default ShareRecipe;