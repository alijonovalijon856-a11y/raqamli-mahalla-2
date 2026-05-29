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

document.getElementById(
"applicationStatus"
).innerHTML =

"☁ Ariza cloud tizimga yuborildi";

alert("🔥 Ariza muvaffaqiyatli yuborildi");

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