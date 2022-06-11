let numberSquares = 6
let colors = []
let squares = document.querySelectorAll(".square")
let pickedColor
let messageDisplay = document.querySelector("#message")
let colorDisplay = document.getElementById("colorDisplay")
let h1 = document.querySelector("h1")
let resetBtn = document.querySelector("#reset")
let modeBtn = document.querySelectorAll(".mode")

/*
	* Ejecuta al mismo tiempo, las funciones setupModeBtn(), setColorSquares() y reset(), cuando se carga la página.
*/
init()
function init() {
	setupModeBtn()
	setColorSquares()
	reset()
}

/* 
	* Selecciona los botones y agrega un event listener que le dé la clase selected al botón cliqueado.
	* Actualiza el numberSquare, dependiendo del textContent del botón cliqueado. El valor de numberSquare será
	3 o 6 (modo Easy o Hard).
	* La actualización de su estado se establece cuando se ejecuta la función reset().
*/
function setupModeBtn() {
	for (let i = 0; i < modeBtn.length; i++) {
		modeBtn[i].addEventListener(`click`, function () {
			modeBtn[0].classList.remove("selected")
			modeBtn[1].classList.remove("selected")
			this.classList.add("selected")
			this.textContent === `Easy` ? numberSquares = 3 : numberSquares = 6
			reset();
		});
	}
}

/*
	* Cuando el usuario haga click en un cuadrado, se guarda el código RGB en la variable clickedColor.
	Luego, se le compara con pickedColor y comprueba si el color clickeado es el mismo que el color previamente 
	seleccionado.
	* Cuando el usuario haga click en un cuadrado incorrecto, éste desaparecerá, cambiando su color de fondo
	al mismo que el del <body> y, al mismo tiempo, aparecerá el mensaje "Inténtalo nuevamente".
	* Si el usuario adivina, todos los cuadrados y el <h1>, tendrán el color del cuadrado ganador y aparecerá 
	el mensaje "¡Correcto!". A su vez se le preguntará si desea "¿Jugar otra vez?".
*/
function setColorSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].addEventListener(`click`, function () {
			let clickedColor = this.style.backgroundColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = `¡Correcto!`
				resetBtn.textContent = `¿Jugar otra vez?`
				changeColors(clickedColor)
				h1.style.backgroundColor = clickedColor
			} else {
				this.style.backgroundColor = `#232323`
				messageDisplay.textContent = `Inténtalo otra vez`
			}
		})
	}
}

/* 
	* Genera nuevos colores en el arreglo.
	* Elige un color ganador.
	* Actualiza el display de la página.
	* Se agrega a un event listener, que la establece tanto para modo Easy como Hard.
*/
function reset() {
	colors = generateRandomColors(numberSquares)
	pickedColor = pickColor()
	colorDisplay.textContent = pickedColor
	resetBtn.textContent = `New Colors`
	messageDisplay.textContent = ``
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i]
			squares[i].style.display = `block`
		} else {
			squares[i].style.display = `none`
		}
	}
	h1.style.backgroundColor = `#46b4a2`
}

resetBtn.addEventListener(`click`, function () {
	reset();
})

/* 
	* Toma como argumento un color, itera sobre todos los cuadrados y da el color de fondo del argumento.
	* Se ejecutá en el momento que el usuario hace click en el color correcto y pasa como argumento dicho color.
*/
function changeColors(color) {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.background = color
	}
}

/*
	* Crea un número aleatorio entre los índices del arreglo colors. Usa ese número para devolver un color del 
	arreglo.
	* El arreglo se asigna a la variable pickedColor.
*/
function pickColor() {
	let random = Math.floor(Math.random() * colors.length)
	return colors[random]
}

/*
	* Genera y devulve un color aleatorio.
*/
function randomColor() {
	let r = Math.floor(Math.random() * 256)
	let g = Math.floor(Math.random() * 256)
	let b = Math.floor(Math.random() * 256)
	return `rgb(${r}, ${g}, ${b})`
}

/*
	* Genera de forma aleatoria el arreglo de colores usando la función randomColor.
	* Toma como argumento un número que indica la longitud del arreglo (6 o 3 cuadrados, dependiendo si se está 
	jugando en Easy o Hard Mode).
	* El arreglo que devuelve se le asigna a la variable colors.
*/
function generateRandomColors(number) {
	let randomColors = []
	for (let i=0; i < number; i++) {
		randomColors[i] = randomColor()
	}
	return randomColors
}