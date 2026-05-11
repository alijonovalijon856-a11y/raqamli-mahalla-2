const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const arizalar = [];

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST API
app.post("/ariza", (req, res) => {

  const { name, type } = req.body;

  const yangiAriza = {
    id: Date.now(),
    name,
    type,
    status: "pending"
  };

  arizalar.push(yangiAriza);

  res.json({
    message: "Ariza saqlandi",
    data: yangiAriza
  });

});

// GET API
app.get("/ariza", (req, res) => {
  res.json(arizalar);
});

// APPROVE API
app.put("/ariza/:id", (req, res) => {

  const id = Number(req.params.id);

  const ariza = arizalar.find(
    item => item.id === id
  );

  if(!ariza){

    return res.status(404).json({
      message:"Topilmadi"
    });

  }

  ariza.status = "approved";

  res.json({
    message:"Tasdiqlandi",
    data: ariza
  });

});

// DELETE API
app.delete("/ariza/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = arizalar.findIndex(
    item => item.id === id
  );

  if(index === -1){

    return res.status(404).json({
      message:"Topilmadi"
    });

  }

  arizalar.splice(index, 1);

  res.json({
    message:"Ariza o‘chirildi"
  });

});

// SERVER
app.listen(3000, () => {
  console.log("Server ishladi");
});