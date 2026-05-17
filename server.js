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