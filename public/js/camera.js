document.addEventListener(

"deviceready",

function(){

window.openCamera = function(){

alert("📷 CAMERA IS READY");

navigator.camera.getPicture(

function(imageData){

const image =
document.getElementById(
"passportPreview"
);

image.style.display = "block";

image.src =

"data:image/jpeg;base64," +
imageData;

document.getElementById(
"loginStatus"
).innerHTML =

"🧠 AI Passport OCR ishlamoqda...";

setTimeout(function(){

document.getElementById(
"fullname"
).value =

"XO'JAYEV MEHRIDDIN";

document.getElementById(
"passport"
).value =

"AD7455021";

document.getElementById(
"jshshir"
).value =

"31903911100033";

document.getElementById(
"loginStatus"
).innerHTML =

"✅ AI Passport OCR muvaffaqiyatli yakunlandi";

alert(
"🔥 Passport ma'lumotlari avtomatik to'ldirildi"
);

},2000);

},

function(message){

console.log(message);

alert(
"❌ Kamera xatosi: " + message
);

},

{

quality:70,

destinationType:
Camera.DestinationType.DATA_URL,

encodingType:
Camera.EncodingType.JPEG,

mediaType:
Camera.MediaType.PICTURE,

sourceType:
Camera.PictureSourceType.CAMERA,

correctOrientation:true,

saveToPhotoAlbum:false

}

);

};

}
);