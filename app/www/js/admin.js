document.addEventListener("deviceready", function(){

alert("ADMIN VERSION 1006");

window.loadApplications = function(){

alert("ADMIN LOAD");

FirebasexFirestore.fetchFirestoreCollection(

"applications",
[],

function(documents){

alert("ADMIN COLLECTION YUKLANDI");
let jami = 0;
let tasdiqlandi = 0;
let radEtildi = 0;
let koribChiqilmoqda = 0;

for(const id in documents){

jami++;

const status = documents[id].status || "";

if(status === "Tasdiqlandi"){
    tasdiqlandi++;
}

if(status === "Rad etildi"){
    radEtildi++;
}

if(status === "Ko'rib chiqilmoqda"){
    koribChiqilmoqda++;
}

}

document.getElementById("statsPanel").innerHTML =

"📊 <b>Statistika</b><br><br>" +

"📄 Jami arizalar: <b>" + jami + "</b><br>" +

"🟢 Tasdiqlangan: <b>" + tasdiqlandi + "</b><br>" +

"🟡 Ko'rib chiqilmoqda: <b>" + koribChiqilmoqda + "</b><br>" +

"🔴 Rad etilgan: <b>" + radEtildi + "</b>";
let html = "";

for(const id in documents){

const doc = documents[id];

html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +
"<h3>" + (doc.title || "Sarlavha yo'q") + "</h3>" +
"<p>" + (doc.text || "") + "</p>" +
"<p>📌 Holat: " + (doc.status || "Yuborildi") + "</p>" +

"<button onclick=\"changeStatus('" + id + "','Ko\\'rib chiqilmoqda')\">🟡 Ko'rib chiqilmoqda</button><br><br>" +

"<button onclick=\"changeStatus('" + id + "','Tasdiqlandi')\">🟢 Tasdiqlandi</button><br><br>" +

"<button onclick=\"changeStatus('" + id + "','Rad etildi')\">🔴 Rad etildi</button>" +

"</div>";

}

if(html === ""){
html = "Arizalar topilmadi";
}

document.getElementById("adminApplications").innerHTML = html;

},

function(error){

alert(
"ADMIN ERROR:\n" +
JSON.stringify(error)
);

}

);

};

window.changeStatus = function(documentId, status){

FirebasexFirestore.updateDocumentInFirestoreCollection(

documentId,

{
    status: status
},

"applications",

true,

function(){

alert("✅ Status yangilandi: " + status);

},

function(error){

alert(
"❌ STATUS ERROR:\n" +
JSON.stringify(error)
);

}

);

};
window.adminLogin = function(){

const username =
document.getElementById(
"adminUsername"
).value;

const password =
document.getElementById(
"adminPassword"
).value;

if(
username === "admin" &&
password === "12345"
){

document.getElementById(
"loginBox"
).style.display = "none";

document.getElementById(
"adminPanel"
).style.display = "block";

alert("✅ Admin muvaffaqiyatli kirdi");

}else{

alert(
"❌ Login yoki parol noto'g'ri"
);

}

};
});