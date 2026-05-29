window.loadProfile = function(){

const savedUser = JSON.parse(

localStorage.getItem(
"raqamliUser"
)

);

if(!savedUser){

return;

}

const profileSection =
document.getElementById(
"profile"
);

profileSection.innerHTML =

`
<div class="card">

<h2>👤 Profil</h2>

<p>
<b>F.I.SH:</b>
${savedUser.fullname}
</p>

<br>

<p>
<b>Passport:</b>
${savedUser.passport}
</p>

<br>

<p>
<b>JSHSHIR:</b>
${savedUser.jshshir}
</p>

<br>

<p>
<b>Telefon:</b>
${savedUser.phone}
</p>

</div>
`;

};

document.addEventListener(

"DOMContentLoaded",

function(){

loadProfile();

}

);