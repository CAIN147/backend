import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const [comics, setComics] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    searchCategory: "",
    searchStatus: "",
    searchRating: "",
    searchComicType: "",
    searchSort: "update"
  });

  useEffect(() => {
    axios.get("http://localhost:3001/api/search", { params: filters }).then(res => setComics(res.data));
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">ระบบค้นหาการ์ตูน</h1>
      <input name="searchText" placeholder="ค้นหา..." onChange={handleChange} className="border p-2 mb-2" />
      <select name="searchSort" onChange={handleChange} className="border p-2 mb-2 ml-2">
        <option value="update">อัปเดตล่าสุด</option>
      </select>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {comics.map(comic => (
          <div key={comic.id} className="border p-2">
            <img src={comic.cover} alt={comic.title} className="w-full h-40 object-cover mb-2" />
            <div className="font-bold">{comic.title}</div>
            <div>ประเภท: {comic.category}</div>
            <div>สถานะ: {comic.status}</div>
            <div>คะแนน: {comic.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
