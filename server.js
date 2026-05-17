const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const bcrypt = require('bcrypt');

const app = express();

const PORT = process.env.PORT || 3000;

const SECRET = 'raqamli_mahalla_secret';

const otpStore = {};

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
phone:String,
verified:Boolean,
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

const chatSchema = new mongoose.Schema({

user:String,
message:String,
sender:String,
time:{
type:Date,
default:Date.now
}

});

const Chat = mongoose.model(
"Chat",
chatSchema
);

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

function verifyAdmin(req,res,next){

const authHeader =
req.headers.authorization;

if(!authHeader){

return res.status(401).json({
message:'Token yoq'
});

}

const token =
authHeader.split(' ')[1];

try{

const decoded =
jwt.verify(token, SECRET);

if(decoded.role !== 'admin'){

return res.status(403).json({
message:'Admin emas'
});

}

next();

}catch(err){

return res.status(401).json({
message:'Token xato'
});

}

}

app.post('/api/chat', async(req,res)=>{

try{

const chat = new Chat({

user:req.body.user,
message:req.body.message,
sender:req.body.sender

});

await chat.save();

res.json({
message:'Xabar yuborildi'
});

}catch(err){

res.status(500).json({
message:'Chat xatolik'
});

}

});

app.get('/api/chat/:user', async(req,res)=>{

try{

const chats =
await Chat.find({

user:req.params.user

}).sort({time:1});

res.json(chats);

}catch(err){

res.status(500).json({
message:'Chat olish xatolik'
});

}

});

app.post('/api/send-otp', async(req,res)=>{

const { phone } = req.body;

const otp =
Math.floor(
100000 + Math.random() * 900000
).toString();

otpStore[phone] = otp;

console.log('OTP:', otp);

res.json({

message:'OTP yuborildi',

otp

});

});

app.post('/api/verify-otp', async(req,res)=>{

const { phone, otp } = req.body;

if(otpStore[phone] === otp){

delete otpStore[phone];

return res.json({

message:'Telefon tasdiqlandi'

});

}

res.status(400).json({

message:'OTP xato'

});

});

app.post('/api/admin-login', async(req,res)=>{

const { login,password } = req.body;

if(
login === 'admin'
&&
password === 'admin123'
){

const token = jwt.sign({

role:'admin'

}, SECRET, {

expiresIn:'1d'

});

return res.json({

message:'Admin kirdi',
token

});

}

res.status(401).json({

message:'Admin login xato'

});

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

const hashedPassword =
await bcrypt.hash(
req.body.password,
10
);

const user = new User({

login:req.body.login,
password:hashedPassword,
phone:req.body.phone || '',
verified:true,
role:"user"

});

await user.save();

res.json({
message:"Ro'yxatdan o'tdi"
});

});

app.post('/api/login', async(req,res)=>{

const user = await User.findOne({

login:req.body.login

});

if(!user){

return res.status(401).json({
message:"Login yoki parol xato"
});

}

const match =
await bcrypt.compare(
req.body.password,
user.password
);

if(!match){

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

app.get('/api/all',
verifyAdmin,
async(req,res)=>{

try{

const arizalar =
await Ariza.find().sort({_id:-1});

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
hujjat:req.body.hujjat || '',
status:'pending'

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

app.put('/api/ariza/:id',
verifyAdmin,
async(req,res)=>{

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

app.delete('/api/ariza/:id',
verifyAdmin,
async(req,res)=>{

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

app.get('/api/pdf/:id',
async(req,res)=>{

try{

const ariza =
await Ariza.findById(req.params.id);

if(!ariza){

return res.status(404).send('Topilmadi');

}

const doc =
new PDFDocument();

res.setHeader(
'Content-Type',
'application/pdf'
);

res.setHeader(
'Content-Disposition',
'attachment; filename=ariza.pdf'
);

doc.pipe(res);

doc.fontSize(22)
.text('Raqamli Mahalla');

doc.moveDown();

doc.fontSize(16)
.text('Ariza ma\'lumotlari');

doc.moveDown();

doc.text('Ism: ' + ariza.ism);

doc.text('Tur: ' + ariza.tur);

doc.text('User: ' + ariza.user);

doc.text('Status: ' + ariza.status);

doc.end();

}catch(err){

console.log(err);

res.status(500).send('PDF xatolik');

}

});

app.listen(PORT,()=>{

console.log("🚀 Server ishladi");

});