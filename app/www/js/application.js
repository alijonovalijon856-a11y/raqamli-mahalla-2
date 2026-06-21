document.addEventListener("deviceready", function(){
const fileInput =
document.getElementById(
"applicationFile"
);

if(fileInput){

fileInput.addEventListener(
"change",
function(){

if(this.files.length > 0){

document.getElementById(
"selectedFile"
).innerHTML =

"📎 " +
this.files[0].name;

}

}
);

}
alert("APPLICATION VERSION 4");

window.sendApplication = function(){

const title = document.getElementById("applicationTitle").value;
const text = document.getElementById("applicationText").value;

if(title === "" || text === ""){
alert("❌ Arizani to'ldiring");
return;
}
const selectedFile =
document.getElementById(
"applicationFile"
);

const applicationData = {

    title: title,
    text: text,

    fileName:

    selectedFile.files.length > 0

    ?

    selectedFile.files[0].name

    :

    "Fayl biriktirilmagan",

    status: "Yuborildi",

    createdAt: new Date().toISOString()

};
alert(JSON.stringify(applicationData));

alert("Firestore bazaga yuborilmoqda...");

FirebasexFirestore.addDocumentToFirestoreCollection(

applicationData,
"applications",
true,

function(documentId){

document.getElementById("applicationStatus").innerHTML =
"✅ Firestore bazaga yuborildi";

alert(
"✅ Ariza Firestore ga yuborildi\nID: " +
documentId
);

},

function(error){

alert(
"FIRESTORE ERROR:\n\n" +
JSON.stringify(error)
);

}

);

};

window.loadApplications = function(){

alert("loadApplications ishladi");

const listElement =
document.getElementById("applicationsList");

if(!listElement){
alert("❌ applicationsList topilmadi");
return;
}

listElement.innerHTML =
"⏳ Arizalar yuklanmoqda...";

alert("Firestore collection o'qilmoqda");

FirebasexFirestore.fetchFirestoreCollection(

"applications",
[],

function(documents){

alert("Collection muvaffaqiyatli yuklandi");
alert(JSON.stringify(documents));
let html = "";

for(const id in documents){

const doc = documents[id];

html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px 0;border-radius:10px'>" +
"<b>" + (doc.title || "Sarlavha yo'q") + "</b><br><br>" +
(doc.text || "") +
"<br><br>" +
"<br><br>" +

(
doc.status === "Tasdiqlandi"
?
"🟢 <b style='color:green'>Tasdiqlandi</b>"
:
doc.status === "Rad etildi"
?
"🔴 <b style='color:red'>Rad etildi</b>"
:
doc.status === "Ko'rib chiqilmoqda"
?
"🟡 <b style='color:orange'>Ko'rib chiqilmoqda</b>"
:
"📌 <b>Yuborildi</b>"
)

+
"</div>";
"</div>";


}

if(html === ""){
html = "Arizalar topilmadi";
}

listElement.innerHTML = html;

loadNotifications(documents);
},

function(error){

alert(
"COLLECTION ERROR:\n\n" +
JSON.stringify(error)
);

}

);

};
window.loadNotifications = function(documents){

let html = "";

for(const id in documents){

const doc = documents[id];

if(doc.status === "Tasdiqlandi"){

html +=
"<div style='padding:10px;margin:10px 0;border-radius:10px;border:1px solid green'>" +
"🟢 Arizangiz tasdiqlandi" +
"</div>";

}

if(doc.status === "Rad etildi"){

html +=
"<div style='padding:10px;margin:10px 0;border-radius:10px;border:1px solid red'>" +
"🔴 Arizangiz rad etildi" +
"</div>";

}

if(doc.status === "Ko\\'rib chiqilmoqda"){

html +=
"<div style='padding:10px;margin:10px 0;border-radius:10px;border:1px solid orange'>" +
"🟡 Arizangiz ko'rib chiqilmoqda" +
"</div>";

}

}

if(html === ""){
html = "Bildirishnomalar yo'q";
}

document.getElementById(
"notificationsList"
).innerHTML = html;

};
});
