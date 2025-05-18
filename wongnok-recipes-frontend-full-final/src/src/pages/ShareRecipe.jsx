import React, { useState } from "react";

const ShareRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("แชร์สูตรอาหารสำเร็จ (mock)");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">แชร์สูตรอาหาร</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อเมนู"
            className="w-full p-3 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="ส่วนผสม"
            className="w-full p-3 border rounded-md"
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <textarea
            placeholder="วิธีทำ"
            className="w-full p-3 border rounded-md"
            rows={4}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ลิงก์รูปภาพ"
            className="w-full p-3 border rounded-md"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            แชร์สูตร
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareRecipe;
