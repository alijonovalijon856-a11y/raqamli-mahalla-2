document.addEventListener("deviceready", function(){

alert("ADMIN PANEL READY");

window.loadApplications = function(){

FirebasexFirestore.fetchFirestoreCollection(

"applications",

function(documents){

let html = "";

for(const id in documents){

const doc = documents[id];

html +=
"<div style='border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px'>" +
"<h3>" + (doc.title || "") + "</h3>" +
"<p>" + (doc.text || "") + "</p>" +
"<p>📌 " + (doc.status || "Yuborildi") + "</p>" +
"</div>";

}

document.getElementById(
"adminApplications"
).innerHTML = html;

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