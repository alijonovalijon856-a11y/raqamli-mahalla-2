window.sendCode = function(){

const phoneNumber =
document.getElementById("phoneNumber").value;

if(phoneNumber===""){

alert("❌ Telefon raqam kiriting");
return;

}

document.getElementById(
"loginStatus"
).innerHTML = "📩 SMS yuborildi (TEST MODE)";

alert("🔥 SMS yuborildi");

};

window.verifyCode = function(){

const fullname =
document.getElementById("fullname").value;

const passport =
document.getElementById("passport").value;

const jshshir =
document.getElementById("jshshir").value;

const phone =
document.getElementById("phoneNumber").value;

if(
fullname==="" ||
passport==="" ||
jshshir==="" ||
phone===""
){

alert("❌ Barcha maydonlarni to'ldiring");
return;

}

const userData = {
fullname,
passport,
jshshir,
phone,
createdAt: new Date().toISOString()
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

alert(
"✅ Foydalanuvchi Firestore ga saqlandi\nID: " +
documentId
);

},

function(error){

alert(
"❌ USER SAVE ERROR\n\n" +
JSON.stringify(error)
);

}

);

}

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
