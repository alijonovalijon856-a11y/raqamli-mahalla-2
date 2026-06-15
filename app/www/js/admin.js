document.addEventListener("deviceready", function(){

alert("ADMIN VERSION 1002");

window.loadApplications = function(){

alert("ADMIN LOAD ISHLADI");

FirebasexFirestore.fetchFirestoreCollection(

"applications",

function(documents){

alert("ADMIN COLLECTION YUKLANDI");

let html = "";

for(const id in documents){

const doc = documents[id];

html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +
"<h3>" + (doc.title || "Sarlavha yo'q") + "</h3>" +
"<p>" + (doc.text || "") + "</p>" +
"<p>📌 Holat: " + (doc.status || "Yuborildi") + "</p>" +
"<button>Status o'zgartirish</button>" +
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

});