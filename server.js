const express = require('express');

const path = require('path');

const multer = require('multer');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(

'mongodb+srv://admin:admin123@cluster0.mongodb.net/raqamliMahalla'

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

const arizaSchema =
new mongoose.Schema({

ism:String,

tur:String,

file:String,

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

app.post(
'/upload',
upload.single('file'),
async (req,res)=>{

try{

const yangiAriza =
new Ariza({

ism:req.body.ism,

tur:req.body.tur,

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