window.openAdminPanel = function(){

window.location.href = "admin.html";

};
window.editProfile = function(){

const user = JSON.parse(
localStorage.getItem("raqamliUser")
);

if(!user){

alert("❌ Foydalanuvchi topilmadi");

return;

}

const fullname = prompt(
"F.I.SH",
user.fullname
);

if(fullname === null){
return;
}

const phone = prompt(
"Telefon",
user.phone
);

if(phone === null){
return;
}

user.fullname = fullname;
user.phone = phone;

localStorage.setItem(
"raqamliUser",
JSON.stringify(user)
);

document.getElementById(
"userInfo"
).innerHTML =

"👤 " + user.fullname +
"<br>🪪 " + user.passport +
"<br>🆔 " + user.jshshir +
"<br>📞 " + user.phone;

alert("✅ Profil yangilandi");

};