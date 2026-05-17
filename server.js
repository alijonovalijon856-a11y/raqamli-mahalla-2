const arizaSchema =
new mongoose.Schema({

ism:String,

tur:String,

user:String,

status:String,

tracking:String,

hujjat:String

});

const Ariza =
mongoose.model(
'Ariza',
arizaSchema
);

app.post(
'/api/ariza',
upload.single('hujjat'),
async(req,res)=>{

try{

const yangiAriza =
new Ariza({

ism:req.body.ism,

tur:req.body.tur,

user:req.body.user,

hujjat:
req.file
? req.file.filename
: '',

status:'pending',

tracking:
'RM-' +
Date.now()

});

await yangiAriza.save();

bot.sendMessage(
8458618683,
`📥 Yangi ariza!

👤 ${req.body.ism}

📌 ${req.body.tur}

🆔 ${yangiAriza.tracking}`
);

res.json({

message:
"Ariza yuborildi"

});

}catch(err){

console.log(err);

res.status(500).json({

message:
"Saqlashda xatolik"

});

}

});