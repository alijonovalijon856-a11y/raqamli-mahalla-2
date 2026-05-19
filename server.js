const express = require('express');

const path = require('path');

const multer = require('multer');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const app = express();

const SECRET =
'raqamliMahallaSecret';

mongoose.connect(
'mongodb+srv://admin:admin12345@cluster0.87jmenr.mongodb.net/raqamliMahalla?retryWrites=true&w=majority'
)

.then(()=>{

console.log(
'MongoDB ulandi'
);

})

.catch((err)=>{

console.log(err);

});

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.use(
express.static(
path.join(__dirname,'public')
)
);

app.use(
'/uploads',
express.static(
path.join(__dirname,'uploads')
)
);

const storage =
multer.diskStorage({

destination:
function(req,file,cb){

cb(null,'uploads/');

},

filename:
function(req,file,cb){

cb(
null,
Date.now() +
'-' +
file.originalname
);

}

});

const upload =
multer({
storage:storage
});

const userSchema =
new mongoose.Schema({

username:String,

password:String,

role:{

type:String,

default:'user'

}

});

const User =
mongoose.model(
'User',
userSchema
);

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

const Ariza =
mongoose.model(
'Ariza',
arizaSchema
);

app.get('/',(req,res)=>{

res.sendFile(

path.join(
__dirname,
'public',
'index.html'
)

);

});

app.get(
'/login.html',
(req,res)=>{

res.sendFile(

path.join(
__dirname,
'public',
'login.html'
)

);

});

app.post(
'/register',
async (req,res)=>{

try{

const { username,password } =
req.body;

const oldUser =
await User.findOne({

username

});

if(oldUser){

return res.json({

message:
'User mavjud'

});

}

const hashedPassword =
await bcrypt.hash(
password,
10
);

const newUser =
new User({

username,

password:
hashedPassword

});

await newUser.save();

res.json({

message:
'Register muvaffaqiyatli'

});

}catch(err){

console.log(err);

res.json({

message:
'Xatolik'

});

}

});

app.post(
'/login',
async (req,res)=>{

try{

const { username,password } =
req.body;

const user =
await User.findOne({

username

});

if(!user){

return res.json({

message:
'User topilmadi'

});

}

console.log(password);

console.log(user.password);

const isMatch =
await bcrypt.compare(

password,

user.password

);

if(!isMatch){

return res.json({

message:
'Parol noto‘g‘ri'

});

}

const token =
jwt.sign(

{

id:user._id,

username:user.username,

role:user.role

},

SECRET,

{

expiresIn:'7d'

}

);

res.json({

message:
'Login muvaffaqiyatli',

token,

role:user.role

});

}catch(err){

console.log(err);

res.json({

message:
'Xatolik'

});

}

});

app.post(
'/upload',
upload.single('file'),
async (req,res)=>{

try{

const yangiAriza =
new Ariza({

ism:req.body.ism,

tur:req.body.tur,

user:req.body.user,

file:req.file
? req.file.filename
: ''

});

await yangiAriza.save();

res.json({

message:
'Ariza muvaffaqiyatli yuborildi'

});

}catch(err){

console.log(err);

res.json({

message:
'Xatolik yuz berdi'

});

}

});

app.get(
'/arizalar',
async (req,res)=>{

const arizalar =
await Ariza.find()
.sort({ createdAt:-1 });

res.json(arizalar);

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(
'SERVER ISHLADI'
);

});