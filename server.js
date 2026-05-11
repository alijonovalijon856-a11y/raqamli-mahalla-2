const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let arizalar = [];

app.get("/api/arizalar", (req, res) => {
  res.json(arizalar);
});

app.post("/api/ariza", (req, res) => {
  const ariza = {
    id: Date.now(),
    ism: req.body.ism,
    tur: req.body.tur,
    status: "pending"
  };

  arizalar.push(ariza);

  res.json({
    message: "Ariza saqlandi"
  });
});

app.delete("/api/ariza/:id", (req, res) => {
  arizalar = arizalar.filter(a => a.id != req.params.id);

  res.json({
    message: "O'chirildi"
  });
});

app.put("/api/ariza/:id", (req, res) => {
  arizalar = arizalar.map(a => {
    if (a.id == req.params.id) {
      a.status = "approved";
    }
    return a;
  });

  res.json({
    message: "Tasdiqlandi"
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server ishladi");
});