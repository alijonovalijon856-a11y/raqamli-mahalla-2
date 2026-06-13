window.onload = function(){

const savedUser =
localStorage.getItem("raqamliUser");

if(savedUser){

const user = JSON.parse(savedUser);

document.getElementById(
"userBox"
).style.display = "block";

document.getElementById(
"userInfo"
).innerHTML =

"👤 " + user.fullname +
"<br>🪪 " + user.passport +
"<br>🆔 " + user.jshshir +
"<br>📞 " + user.phone;

document.getElementById(
"loginStatus"
).innerHTML =

"✅ Auto Login Successful";

}

};