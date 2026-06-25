document.addEventListener("deviceready", function(){

alert("ADMIN VERSION 1006");
window.currentFilter = "all";
window.loadUsers = function(){

FirebasexFirestore.fetchFirestoreCollection(

"users",
[],

function(documents){

let html = "";

let totalUsers = 0;

for(const id in documents){

totalUsers++;

const user = documents[id];

html +=

"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +

"<b>👤 " +
(user.fullname || "") +
"</b><br><br>" +

"📞 " +
(user.phone || "") +
"<br>" +

"🪪 " +
(user.passport || "") +
"<br>" +

"🆔 " +
(user.jshshir || "") +

"</div>";

}

html =

"<h3>👥 Jami foydalanuvchilar: " +
totalUsers +
"</h3>" +

html;

document.getElementById(
"usersPanel"
).innerHTML = html;

},

function(error){

alert(
"USERS ERROR:\n" +
JSON.stringify(error)
);

}

);

};
window.loadLogs = function(){

FirebasexFirestore.fetchFirestoreCollection(

"logs",
[],

function(documents){

let html = "";

let totalLogs = 0;

for(const id in documents){

totalLogs++;

const log = documents[id];

html +=

"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +

"<b>📝 Status:</b> " +
(log.status || "") +
"<br><br>" +

"<b>👤 Admin:</b> " +
(log.admin || "") +
"<br><br>" +

"<b>🆔 Ariza ID:</b> " +
(log.documentId || "") +
"<br><br>" +

"<b>⏰ Sana:</b> " +
(log.createdAt || "") +

"</div>";

}

html =

"<h3>📜 Jami loglar: " +
totalLogs +
"</h3>" +

html;

document.getElementById(
"logsPanel"
).innerHTML = html;

},

function(error){

alert(
"LOGS ERROR:\n" +
JSON.stringify(error)
);

}

);

};
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
let yangiArizalar = 0;
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
if(status === "Yuborildi"){
    yangiArizalar++;
}
}

document.getElementById("statsPanel").innerHTML =

"<h2 style='text-align:center'>📊 Dashboard Pro 3.0</h2>" +

"<div style='background:#b91c1c;padding:15px;border-radius:15px;margin-bottom:15px;text-align:center;font-size:20px;font-weight:bold'>" +

"🔔 Yangi arizalar: " +

yangiArizalar +

"</div>" +

"<div style='display:flex;flex-wrap:wrap;gap:10px'>" +

"<div style='flex:1;min-width:120px;background:#1e3a8a;padding:15px;border-radius:15px;text-align:center'>" +
"<div style='font-size:30px'>📄</div>" +
"<div>Jami</div>" +
"<h2>" + jami + "</h2>" +
"</div>" +

"<div style='flex:1;min-width:120px;background:#166534;padding:15px;border-radius:15px;text-align:center'>" +
"<div style='font-size:30px'>🟢</div>" +
"<div>Tasdiqlangan</div>" +
"<h2>" + tasdiqlandi + "</h2>" +
"</div>" +

"<div style='flex:1;min-width:120px;background:#92400e;padding:15px;border-radius:15px;text-align:center'>" +
"<div style='font-size:30px'>🟡</div>" +
"<div>Ko'rib chiqilmoqda</div>" +
"<h2>" + koribChiqilmoqda + "</h2>" +
"</div>" +

"<div style='flex:1;min-width:120px;background:#991b1b;padding:15px;border-radius:15px;text-align:center'>" +
"<div style='font-size:30px'>🔴</div>" +
"<div>Rad etilgan</div>" +
"<h2>" + radEtildi + "</h2>" +
"</div>" +

"</div>";
let html = "";
const searchText =
document.getElementById(
"searchInput"
).value.toLowerCase();
for(const id in documents){

const doc = documents[id];

if(
window.currentFilter !== "all" &&
doc.status !== window.currentFilter
){
continue;
}
const title =
(doc.title || "").toLowerCase();

const text =
(doc.text || "").toLowerCase();

if(
searchText !== "" &&
!title.includes(searchText) &&
!text.includes(searchText)
){
continue;
}
html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +
"<h3>" + (doc.title || "Sarlavha yo'q") + "</h3>" +

"<p>" + (doc.text || "") + "</p>" +

"<p>📎 Hujjat: " +
(doc.fileName || "Biriktirilmagan") +
"</p>" +

"<p>📌 Holat: " +
(doc.status || "Yuborildi") +
"</p>" +

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

alert("CHANGE STATUS BOSHLANDI");

FirebasexFirestore.updateDocumentInFirestoreCollection(

documentId,

{
    status: status
},

"applications",

true,

function(){

const logData = {

documentId: documentId,
status: status,
admin: "admin",
createdAt: new Date().toISOString()

};

FirebasexFirestore.addDocumentToFirestoreCollection(

logData,
"logs",
true,

function(){

alert("✅ Status yangilandi: " + status);

},

function(error){

alert(
"LOG ERROR:\n" +
JSON.stringify(error)
);

}

);

},

function(error){

alert(
"❌ STATUS ERROR:\n" +
JSON.stringify(error)
);

}

);

};
window.setFilter = function(filter){

window.currentFilter = filter;

loadApplications();

};

window.showNewApplications = function(){

window.currentFilter = "Yuborildi";

loadApplications();

};
window.adminLogout = function(){

document.getElementById(
"adminPanel"
).style.display = "none";

document.getElementById(
"loginBox"
).style.display = "block";

document.getElementById(
"adminUsername"
).value = "";

document.getElementById(
"adminPassword"
).value = "";

alert("🚪 Admin tizimdan chiqdi");

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