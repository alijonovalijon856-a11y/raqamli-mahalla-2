window.sendCode = function(){

const phoneNumber =
document.getElementById(
"phoneNumber"
).value;

if(phoneNumber===""){

alert("❌ Telefon raqam kiriting");

return;

}

FirebasePlugin.verifyPhoneNumber(

phoneNumber,

30000,

function(credential){

window.verificationId =
credential.verificationId;

document.getElementById(
"loginStatus"
).innerHTML =

"📩 SMS yuborildi";

alert("🔥 SMS yuborildi");

},

function(error){

console.log(error);

alert("❌ SMS yuborilmadi");

}

);

};

window.verifyCode = function(){

const fullname =
document.getElementById(
"fullname"
).value;

const passport =
document.getElementById(
"passport"
).value;

const jshshir =
document.getElementById(
"jshshir"
).value;

const phone =
document.getElementById(
"phoneNumber"
).value;

if(
fullname==="" ||
passport==="" ||
jshshir==="" ||
phone===""

){

alert("❌ Ma'lumotlarni to'ldiring");

return;

}

const userData = {

fullname:fullname,
passport:passport,
jshshir:jshshir,
phone:phone

};

localStorage.setItem(

"raqamliUser",

JSON.stringify(userData)

);

document.getElementById(
"userBox"
).style.display = "block";

document.getElementById(
"userInfo"
).innerHTML =

"👤 " + fullname +
"<br>🪪 " + passport +
"<br>🆔 " + jshshir +
"<br>📞 " + phone;

document.getElementById(
"loginStatus"
).innerHTML =

"✅ Login successful";

alert("🔥 Login successful");

};

window.logoutUser = function(){

localStorage.removeItem(
"raqamliUser"
);

location.reload();

};