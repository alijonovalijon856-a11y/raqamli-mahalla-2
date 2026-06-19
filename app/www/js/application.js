document.addEventListener("deviceready", function(){

alert("APPLICATION VERSION 4");

window.sendApplication = function(){

const title = document.getElementById("applicationTitle").value;
const text = document.getElementById("applicationText").value;

if(title === "" || text === ""){
alert("❌ Arizani to'ldiring");
return;
}
const applicationData = {
    title: title,
    text: text,
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
"📌 Holat: <b>" + (doc.status || "Noma'lum") + "</b>" +
"</div>";


}

if(html === ""){
html = "Arizalar topilmadi";
}

listElement.innerHTML = html;

},

function(error){

alert(
"COLLECTION ERROR:\n\n" +
JSON.stringify(error)
);

}

);

};

});
