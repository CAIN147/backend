const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());

let comics = JSON.parse(fs.readFileSync("comics.json"));

app.get("/api/search", (req, res) => {
  const { searchText = "", searchCategory = "", searchStatus = "", searchRating = "", searchComicType = "", searchSort = "update" } = req.query;

  let results = comics.filter(comic => 
    comic.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (searchCategory === "" || comic.category === searchCategory) &&
    (searchStatus === "" || comic.status === searchStatus) &&
    (searchComicType === "" || comic.type === searchComicType) &&
    (searchRating === "" || comic.rating >= parseFloat(searchRating))
  );

  if (searchSort === "update") {
    results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  res.json(results);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
