import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    employeeId: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("สมัครสมาชิกสำเร็จ");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("มีชื่อผู้ใช้นี้อยู่แล้ว");
      } else {
        setError("เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">สมัครสมาชิก</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="ชื่อผู้ใช้" value={formData.username} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="password" type="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="firstName" placeholder="ชื่อ" value={formData.firstName} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="lastName" placeholder="นามสกุล" value={formData.lastName} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="phone" placeholder="เบอร์โทร" value={formData.phone} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="department" placeholder="สังกัด" value={formData.department} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="employeeId" placeholder="รหัสพนักงาน" value={formData.employeeId} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full">
          สมัครสมาชิก
        </button>
      </form>
    </div>
  );
};

export default Signup;