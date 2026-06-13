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

window.lastPhoto =
"data:image/jpeg;base64," +
imageData;

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
"✅ Passport OCR test ishladi";

alert(
"🔥 Passport ma'lumotlari to'ldirildi"
);

},

function(error){

alert(
"❌ Kamera xatosi: " + error
);

},

{
quality:70,
destinationType:
Camera.DestinationType.DATA_URL
}

);

};

}
);