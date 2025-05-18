import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อนดูโปรไฟล์");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError("ไม่สามารถดึงข้อมูลโปรไฟล์"));
  }, []);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!user) return <div className="p-6">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">โปรไฟล์ของฉัน</h2>
      <div className="space-y-2">
        <p><strong>ชื่อ:</strong> {user.firstName}</p>
        <p><strong>นามสกุล:</strong> {user.lastName}</p>
        <p><strong>เบอร์โทร:</strong> {user.phone}</p>
        <p><strong>สังกัด:</strong> {user.department}</p>
        <p><strong>รหัสพนักงาน:</strong> {user.employeeId}</p>
        <p><strong>คะแนนรีวิวรวม:</strong> {user.totalRating} คะแนน</p>
      </div>
    </div>
  );
};

export default Profile;