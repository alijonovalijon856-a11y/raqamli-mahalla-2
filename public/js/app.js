function openMenu(){

document.getElementById("sidebar")
.classList.add("active");

document.getElementById("overlay")
.classList.add("active");

}

function closeMenu(){

document.getElementById("sidebar")
.classList.remove("active");

document.getElementById("overlay")
.classList.remove("active");

}

function showSection(id,btn){

document.querySelectorAll(".section")
.forEach(sec=>{

sec.classList.remove("active");

});

document.getElementById(id)
.classList.add("active");

document.querySelectorAll(".menu button")
.forEach(item=>{

item.classList.remove("active");

});

if(btn){

btn.classList.add("active");

}

closeMenu();

}

window.onload = function(){

const savedUser =
localStorage.getItem("raqamliUser");

if(savedUser){

const user = JSON.parse(savedUser);

document.getElementById("userBox")
.style.display = "block";

document.getElementById("userInfo")
.innerHTML =

"👤 " + user.fullname +
"<br>🪪 " + user.passport +
"<br>🆔 " + user.jshshir +
"<br>📞 " + user.phone;

document.getElementById("loginStatus")
.innerHTML =
"✅ Auto Login Successful";

}

};