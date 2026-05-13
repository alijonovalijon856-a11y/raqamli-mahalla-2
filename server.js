const express = require('express');

const path = require('path');

const TelegramBot = require('node-telegram-bot-api');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let arizalar = [];

const token = '8849163719:AAEsdTitTyA4e6v7CCD5SSLeRjXvDgjmoao';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {

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

app.get('/api/arizalar', (req, res) => {

res.json(arizalar);

});

app.post('/api/ariza', (req, res) => {

const yangiAriza = {
id: Date.now(),
ism: req.body.ism,
tur: req.body.tur,
user: req.body.user,
hujjat: req.body.hujjat,
status: "pending"
};

arizalar.push(yangiAriza);

res.json({
message: "Ariza yuborildi"
});

});

app.put('/api/ariza/:id', (req, res) => {

const id = parseInt(req.params.id);

arizalar = arizalar.map(ariza => {

if(ariza.id === id){

return {
...ariza,
status: "approved"
};

}

return ariza;

});

res.json({
message: "Tasdiqlandi"
});

});

app.delete('/api/ariza/:id', (req, res) => {

const id = parseInt(req.params.id);

arizalar = arizalar.filter(ariza => ariza.id !== id);

res.json({
message: "O'chirildi"
});

});

app.listen(PORT, () => {

console.log("Server ishladi");

});