window.sendCode = function(){

const phoneNumber =
document.getElementById("phoneNumber").value;

if(phoneNumber === ""){

alert("❌ Telefon raqam kiriting");
return;

}

document.getElementById("loginStatus").innerHTML =
"📩 SMS yuborildi (TEST MODE)";

alert("🔥 SMS yuborildi");

};
window.verifyCode = function(){

const fullname = document.getElementById("fullname").value;
const passport = document.getElementById("passport").value;
const jshshir = document.getElementById("jshshir").value;
const phone = document.getElementById("phoneNumber").value;
const birthDate = document.getElementById("birthDate").value;
const region = document.getElementById("region").value;
const district = document.getElementById("district").value;
const mahalla = document.getElementById("mahalla").value;
const email = document.getElementById("email").value;

if(
fullname === "" ||
passport === "" ||
jshshir === "" ||
phone === ""
){
alert("❌ Barcha maydonlarni to'ldiring");
return;
}

if(!validatePassport(passport)){
alert("❌ Passport formati noto'g'ri");
return;
}

if(!validatePhone(phone)){
alert("❌ Telefon noto'g'ri");
return;
}

if(!validateJSHSHIR(jshshir)){
alert("❌ JSHSHIR 14 ta raqam bo'lishi kerak");
return;
}

if(email !== "" && !validateEmail(email)){
alert("❌ Email noto'g'ri");
return;
}

const userData = {

fullname,
passport,
jshshir,
phone,
birthDate,
region,
district,
mahalla,
email,
createdAt:new Date().toISOString(),
lastUpdate:new Date().toISOString()

};

localStorage.setItem(
"raqamliUser",
JSON.stringify(userData)
);

if(typeof FirebasexFirestore !== "undefined"){

FirebasexFirestore.addDocumentToFirestoreCollection(

userData,
"users",
true,

function(documentId){

alert("✅ Foydalanuvchi saqlandi");

},

function(error){

alert(JSON.stringify(error));

}

);

}

document.getElementById("userBox").style.display="block";

document.getElementById("userInfo").innerHTML=

"👤 <b>"+fullname+"</b>"+
"<br>🪪 "+passport+
"<br>🆔 "+jshshir+
"<br>📞 "+phone+
"<br>🌍 "+region+
"<br>🏙 "+district+
"<br>🏘 "+mahalla+
"<br>📧 "+email;

document.getElementById("loginStatus").innerHTML="✅ Login successful";

alert("🔥 Login successful");

};

window.logoutUser = function(){

localStorage.removeItem("raqamliUser");

location.reload();

};