document.addEventListener("deviceready", function () {

const regions = [
"Andijon",
"Buxoro",
"Farg'ona",
"Jizzax",
"Xorazm",
"Namangan",
"Navoiy",
"Qashqadaryo",
"Qoraqalpog'iston Respublikasi",
"Samarqand",
"Sirdaryo",
"Surxondaryo",
"Toshkent",
"Toshkent shahri"
];

const regionSelect = document.getElementById("region");

regions.forEach(function(region){

const option = document.createElement("option");

option.value = region;
option.textContent = region;

regionSelect.appendChild(option);

});

});