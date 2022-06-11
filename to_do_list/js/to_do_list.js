let input = document.querySelector(".input");
let agregar = document.querySelector(".boton-agregar");
let container = document.querySelector(".container");

class Item {
  constructor(nuevaTarea) {
    this.crearDiv(nuevaTarea);
  }
  crearDiv(nuevaTarea) {
    let inputItem = document.createElement("input");
    inputItem.disabled = true;
    inputItem.value = nuevaTarea
    inputItem.classList.add("item-input");
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");

    let botonEditar = document.createElement("button")
    botonEditar.innerHTML = `<i class="fas fa-lock"></i>`
    botonEditar.classList.add("boton-editar")

    let botonRemover = document.createElement("button")
    botonRemover.innerHTML = `<i class="fas fa-trash"></i>`
    botonRemover.classList.add("boton-remover")

    newDiv.appendChild(inputItem)
    newDiv.appendChild(botonEditar)
    newDiv.appendChild(botonRemover)
    container.appendChild(newDiv)

    botonEditar.addEventListener("click", function(){
        if(inputItem.disabled === true){
            inputItem.disabled = false
            botonEditar.innerHTML = `<i class="fas fa-lock-open"></i>`
        }else{
            inputItem.disabled = true
           botonEditar.innerHTML = `<i class="fas fa-lock"></i>`
        }

    })
    botonRemover.addEventListener("click", function(){
       container.removeChild(newDiv)
    })
  }
}

function chequearInput(){
    console.log("hola")
    if(input.value){
        let test =  new Item(input.value)
      
        input.value = ""
    }
}
 
agregar.addEventListener("click",chequearInput)
input.addEventListener("keydown", function(e){
  if(e.keyCode === 13){chequearInput()}
});