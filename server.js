const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const multer = require('multer');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({

destination:function(req,file,cb){

cb(null,'public/uploads');

},

filename:function(req,file,cb){

cb(null,Date.now() + '-' + file.originalname);

}

});

const upload = multer({

storage:storage

});

mongoose.connect(
"mongodb+srv://admin:mehri18352@cluster0.87jmenr.mongodb.net/raqamliMahalla?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
console.log("✅ MongoDB connected");
})
.catch((err) => {
console.log("❌ MongoDB error:", err);
});

const userSchema = new mongoose.Schema({

login:String,
password:String,
role:String

});

const User = mongoose.model("User", userSchema);

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

app.post('/api/register', async(req,res)=>{

const mavjud = await User.findOne({
login:req.body.login
});

if(mavjud){

return res.json({
message:"User mavjud"
});

}

const user = new User({

login:req.body.login,
password:req.body.password,
role:"user"

});

await user.save();

res.json({
message:"Ro'yxatdan o'tdi"
});

});

app.post('/api/login', async(req,res)=>{

const user = await User.findOne({

login:req.body.login,
password:req.body.password

});

if(!user){

return res.status(401).json({
message:"Login yoki parol xato"
});

}

res.json({
message:"Kirish muvaffaqiyatli",
user
});

});

app.get('/api/arizalar/:user', async(req,res)=>{

try{

const arizalar = await Ariza.find({

user:req.params.user

}).sort({_id:-1});

res.json(arizalar);

}catch(err){

res.status(500).json({
message:"Xatolik"
});

}

});

app.post(
'/api/ariza',
upload.single('hujjat'),
async(req,res)=>{

try{

console.log(req.body);
console.log(req.file);

const yangiAriza = new Ariza({

ism:req.body.ism,
tur:req.body.tur,
user:req.body.user,

hujjat:req.file
? '/uploads/' + req.file.filename
: ''

});

await yangiAriza.save();

bot.sendMessage(
8458618683,
`📥 Yangi ariza!

👤 ${req.body.ism}

📌 ${req.body.tur}`
);

res.json({
message:"Ariza yuborildi"
});

}catch(err){

console.log(err);

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

bot.sendMessage(
8458618683,
"✅ Ariza tasdiqlandi"
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

bot.sendMessage(
8458618683,
"🗑 Ariza o'chirildi"
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