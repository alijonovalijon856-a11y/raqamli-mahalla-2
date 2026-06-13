window.sendApplication = function(){

const title =
document.getElementById(
"applicationTitle"
).value;

const text =
document.getElementById(
"applicationText"
).value;

const file =
document.getElementById(
"applicationFile"
).files[0];

if(title==="" || text===""){

alert("❌ Arizani to'ldiring");

return;

}

const applicationData = {

title:title,

text:text,

fileName:file ? file.name : "Fayl yo'q",

createdAt:new Date().toISOString()

};

// Local backup
let applications = JSON.parse(

localStorage.getItem(
"raqamliApplications"
)

) || [];

applications.push(applicationData);

localStorage.setItem(

"raqamliApplications",

JSON.stringify(applications)

);

// Firestore save
if(typeof FirebasexFirestore !== "undefined"){

FirebasexFirestore.addDocumentToFirestoreCollection(

applicationData,

"applications",

true,

function(documentId){

document.getElementById(
"applicationStatus"
).innerHTML =

"☁ Firestore bazaga yuborildi";

alert(
"🔥 Ariza Firestore ga yuborildi\nID: " +
documentId
);

},

function(error){

console.log(error);

document.getElementById(
"applicationStatus"
).innerHTML =

"❌ Firestore xatosi";

alert(
"Firestore Error: " + error
);

}

);

}else{

document.getElementById(
"applicationStatus"
).innerHTML =

"⚠ Firestore plugin topilmadi";

alert(
"Firestore plugin mavjud emas"
);

}

document.getElementById(
"applicationTitle"
).value = "";

document.getElementById(
"applicationText"
).value = "";

document.getElementById(
"applicationFile"
).value = "";

};
window.loadApplications = function(){

let applications = JSON.parse(

localStorage.getItem(
"raqamliApplications"
)

) || [];

let html = "";

applications.forEach(function(app){

html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px 0;border-radius:10px'>" +
"<b>" + app.title + "</b><br><br>" +
app.text +
"<br><br>" +
"📎 " + app.fileName +
"</div>";

});

if(html === ""){

html = "Arizalar topilmadi";

}

document.getElementById(
"applicationsList"
).innerHTML = html;

};