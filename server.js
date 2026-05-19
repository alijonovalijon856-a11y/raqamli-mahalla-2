const express = require('express');

const path = require('path');

const multer = require('multer');

const app = express();

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
(req,res)=>{

if(!req.file){

return res.json({

message:
'File tanlanmagan'

});

}

res.json({

message:
'File muvaffaqiyatli yuklandi',

file:req.file.filename

});

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(
'SERVER ISHLADI'
);

});