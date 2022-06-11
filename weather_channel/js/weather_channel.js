let boton = document.querySelector("button");
let input = document.querySelector("input");
let ciudad = input.value;
let span1 = document.querySelector("#ciudad");
let span2 = document.querySelector("#temperatura");
let img = document.querySelector("img");
let span3 = document.querySelector("#descripcion");

function cargarCiudad(){
    ciudad = input.value;
    document.querySelector(".container").style.visibility = "visible";

    $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=95176c8edea30e33338e0eaddd53a916&units=metric",
    
        function(data){
            console.log(data);
            span1.textContent = data.name;
            span2.textContent = data.main.temp + "°C";
            icono = data.weather[0].icon;
            img.setAttribute("src", `http://openweathermap.org/img/w/${icono}.png`);
            span3.textContent = data.weather[0].description;
        }
    ).fail(function(){
            alert("Ciudad no encontrada");
        });
        input.value = ""; 
}

input.value = "";

boton.addEventListener("click", cargarCiudad);

input.addEventListener("keyup", function(e){
    if(e.keyCode === 13){
        cargarCiudad()
    }
})