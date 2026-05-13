const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(
"mongodb+srv://admin:mehri18352@cluster0.87jmenr.mongodb.net/raqamliMahalla?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
console.log("✅ MongoDB connected");
})
.catch((err) => {
console.log("❌ MongoDB error:", err);
});

const arizaSchema = new mongoose.Schema({

ism:String,
tur:String,
user:String,
hujjat:String,
status:{
type:String,
default:"pending"
}

});

const Ariza = mongoose.model("Ariza", arizaSchema);

const token =
'8849163719:AAEsdTitTyA4e6v7CCD5SSLeRjXvDgjmoao';

const bot =
new TelegramBot(token,{ polling:true });

bot.on('message',(msg)=>{

const chatId = msg.chat.id;

const text = msg.text.toLowerCase();

if(text.includes("nafaqa")){

bot.sendMessage(
chatId,
"📌 Nafaqa uchun pasport va daromad ma'lumoti kerak."
);

}
else if(text.includes("subsidiya")){

bot.sendMessage(
chatId,
"📌 Subsidiya uchun uy joy hujjati kerak."
);

}
else if(text.includes("yordam")){

bot.sendMessage(
chatId,
"📌 Moddiy yordam uchun online ariza yuboring."
);

}
else{

bot.sendMessage(
chatId,
"🤖 Salom.\n\nYozing:\n• nafaqa\n• subsidiya\n• yordam"
);

}

});

app.get('/api/arizalar', async(req,res)=>{

try{

const arizalar = await Ariza.find();

res.json(arizalar);

}catch(err){

res.status(500).json({
message:"Xatolik"
});

}

});

app.post('/api/ariza', async(req,res)=>{

try{

const yangiAriza = new Ariza({

ism:req.body.ism,
tur:req.body.tur,
user:req.body.user,
hujjat:req.body.hujjat

});

await yangiAriza.save();

res.json({
message:"Ariza yuborildi"
});

}catch(err){

res.status(500).json({
message:"Saqlashda xatolik"
});

}

});

app.put('/api/ariza/:id', async(req,res)=>{

try{

await Ariza.findByIdAndUpdate(
req.params.id,
{
status:"approved"
}
);

res.json({
message:"Tasdiqlandi"
});

}catch(err){

res.status(500).json({
message:"Xatolik"
});

}

});

app.delete('/api/ariza/:id', async(req,res)=>{

try{

await Ariza.findByIdAndDelete(
req.params.id
);

res.json({
message:"O'chirildi"
});

}catch(err){

res.status(500).json({
message:"Xatolik"
});

}

});

app.listen(PORT,()=>{

console.log("🚀 Server ishladi");

});