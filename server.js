const mongoose =
require('mongoose');

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