app.put(
'/api/ariza/:id',
verifyAdmin,
async(req,res)=>{

try{

await Ariza.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
}

);

bot.sendMessage(

8458618683,

`📌 Ariza statusi yangilandi:

${req.body.status}`

);

res.json({

message:"Status yangilandi"

});

}catch(err){

res.status(500).json({

message:"Xatolik"

});

}

});