const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET_KEY =
'raqamli_mahalla_secret_key_2026';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use(
'/uploads',
express.static(
path.join(__dirname,'uploads')
)
);

if(
!fs.existsSync(
path.join(__dirname,'uploads')
)
){

fs.mkdirSync(
path.join(__dirname,'uploads')
);

}

mongoose.connect(
'mongodb+srv://admin12345:admin12345@cluster0.mongodb.net/raqamliMahalla?retryWrites=true&w=majority'
)

.then(()=>{

console.log(
'MongoDB ulandi'
);

})

.catch(err=>{

console.log(err);

});

const userSchema =
new mongoose.Schema({

username:String,

password:String

});

const arizaSchema =
new mongoose.Schema({

ism:String,

tur:String,

file:String,

user:String,

status:{
type:String,
default:'Jarayonda'
},

createdAt:{
type:Date,
default:Date.now
}

});

const User =
mongoose.model(
'User',
userSchema
);

const Ariza =
mongoose.model(
'Ariza',
arizaSchema
);

const storage =
multer.diskStorage({

destination:function(
req,
file,
cb
){

cb(
null,
'uploads/'
);

},

filename:function(
req,
file,
cb
){

cb(
null,
Date.now() +
path.extname(
file.originalname
)
);

}

});

const upload =
multer({
storage
});

function verifyToken(
req,
res,
next
){

const auth =
req.headers.authorization;

if(!auth){

return res.status(401).json({

message:'Token yoq'

});

}

const token =
auth.split(' ')[1];

try{

const decoded =
jwt.verify(
token,
SECRET_KEY
);

req.user =
decoded;

next();

}catch(err){

return res.status(403).json({

message:'Token xato'

});

}

}

app.post(
'/register',
async(req,res)=>{

const {
username,
password
} = req.body;

const existing =
await User.findOne({
username
});

if(existing){

return res.json({

message:'User mavjud'

});

}

const hashed =
await bcrypt.hash(
password,
10
);

const user =
new User({

username,

password:hashed

});

await user.save();

res.json({

message:'Ro‘yxatdan o‘tdi'

});

});

app.post(
'/login',
async(req,res)=>{

const {
username,
password
} = req.body;

if(
username === 'admin'
&&
password === 'admin123'
){

const token =
jwt.sign(
{
role:'admin'
},
SECRET_KEY
);

return res.json({

message:'Admin',

token

});

}

const user =
await User.findOne({
username
});

if(!user){

return res.json({

message:'User topilmadi'

});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.json({

message:'Parol xato'

});

}

const token =
jwt.sign(
{
username:user.username
},
SECRET_KEY
);

res.json({

message:'Success',

token,

user:user.username

});

});

app.post(
'/upload',
upload.single('file'),
async(req,res)=>{

try{

const ariza =
new Ariza({

ism:req.body.ism,

tur:req.body.tur,

file:req.file.filename,

user:req.body.user,

status:'Jarayonda'

});

await ariza.save();

res.json({

message:'Ariza yuborildi'

});

}catch(err){

console.log(err);

res.json({

message:'Xatolik'

});

}

});

app.get(
'/arizalar',
async(req,res)=>{

const data =
await Ariza.find().sort({
createdAt:-1
});

res.json(data);

});

app.put(
'/api/ariza/:id',
async(req,res)=>{

await Ariza.findByIdAndUpdate(

req.params.id,

{
status:'Tasdiqlandi'
}

);

res.json({

message:'Tasdiqlandi'

});

});

app.delete(
'/api/ariza/:id',
async(req,res)=>{

await Ariza.findByIdAndDelete(
req.params.id
);

res.json({

message:'O‘chirildi'

});

});

app.post(
'/api/ai',
async(req,res)=>{

const {
message
} = req.body;

let reply = '';

const text =
message.toLowerCase();

if(
text.includes('nafaqa')
){

reply =
'Nafaqa olish uchun pasport, oilaviy daromad va yashash joyi ma’lumotlari kerak bo‘ladi.';

}

else if(
text.includes('subsidiya')
){

reply =
'Subsidiya uchun uy-joy va oilaviy daromad ma’lumotlari talab qilinadi.';

}

else if(
text.includes('moddiy')
){

reply =
'Moddiy yordam mahalla komissiyasi tomonidan ko‘rib chiqiladi.';

}

else if(
text.includes('ish')
){

reply =
'Ish so‘rovi uchun telefon raqam va mutaxassislik kerak bo‘ladi.';

}

else if(
text.includes('salom')
){

reply =
'Assalomu alaykum 😊 Sizga qanday yordam bera olaman?';

}

else{

reply =
'Sizning savolingiz AI tomonidan tahlil qilinmoqda 🚀';

}

res.json({

reply

});

});

app.get(
'/api/protected',
verifyToken,
(req,res)=>{

res.json({

message:'Himoyalangan route'

});

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(
'Server ishladi ' + PORT
);

});