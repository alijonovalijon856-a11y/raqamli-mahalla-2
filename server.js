app.post('/api/ai', async(req,res)=>{

try{

const response =
await openai.chat.completions.create({

model:'gpt-4o-mini',

messages:[

{
role:'system',
content:
'Siz Raqamli Mahalla AI assistantsiz. Foydalanuvchilarga davlat xizmatlari, nafaqa, subsidiya, moddiy yordam va arizalar bo‘yicha tushunarli yordam bering.'
},

{
role:'user',
content:req.body.message
}

]

});

res.json({

reply:
response.choices[0]
.message.content

});

}catch(err){

console.log(err);

res.json({

reply:
'❌ AI vaqtincha ishlamayapti'

});

}

});