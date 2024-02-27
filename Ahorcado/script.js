const palabras = ["GUITARRA", "OCEANO", "MONTAÑA", "FOTOGRAFIA", "PROGRAMACION", "GASTRONOMIA", "HISTORIA", "CULTURA", "AVENTURA", "LITERATURA"];
const canvas = document.getElementById("canvas");
const contexto = canvas.getContext("2d");
let palabraSecreta;
let palabraAdivinada = [];
let intentosRestantes = 7;
let letrasUsadas = [];

function seleccionarPalabraAleatoria() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  palabraAdivinada = Array(palabraSecreta.length).fill("_");
  document.getElementById("palabraActual").textContent = palabraAdivinada.join(" ");
}

function dibujarAhorcado(intentos) {
  contexto.clearRect(0, 0, canvas.width, canvas.height);

  if (intentos < 7) {
    contexto.beginPath();
    contexto.moveTo(50, 350);
    contexto.lineTo(150, 350);
    contexto.lineTo(100, 300);
    contexto.lineTo(50, 350);
    contexto.lineTo(50, 50);
    contexto.lineTo(100, 50);
    contexto.lineTo(100, 100);
    contexto.stroke();
  }

  if (intentos < 6) {
    contexto.beginPath();
    contexto.arc(100, 130, 30, 0, Math.PI * 2);
    contexto.stroke();
  }

  if (intentos < 5) {
    contexto.beginPath();
    contexto.moveTo(100, 160);
    contexto.lineTo(100, 260);
    contexto.stroke();
  }

  if (intentos < 4) {
    contexto.beginPath();
    contexto.moveTo(100, 200);
    contexto.lineTo(60, 160);
    contexto.stroke();
  }

  if (intentos < 3) {
    contexto.beginPath();
    contexto.moveTo(100, 200);
    contexto.lineTo(140, 160);
    contexto.stroke();
  }

  if (intentos < 2) {
    contexto.beginPath();
    contexto.moveTo(100, 260);
    contexto.lineTo(60, 300);
    contexto.stroke();
  }

  if (intentos < 1) {
    contexto.beginPath();
    contexto.moveTo(100, 260);
    contexto.lineTo(140, 300);
    contexto.stroke();
  }
}

function actualizarInterfaz() {
  document.getElementById("intentosRestantes").textContent = intentosRestantes;
  document.getElementById("palabraActual").textContent = palabraAdivinada.join(" ");
  document.getElementById("letrasUsadasTexto").textContent = letrasUsadas.join(", ");
}

function verificarVictoriaDerrota() {
  if (palabraAdivinada.join("") === palabraSecreta) {
    document.getElementById("mensajeFinal").textContent = "¡Has ganado!";
  } else if (intentosRestantes === 0) {
    document.getElementById("mensajeFinal").textContent = "¡Has perdido! La palabra era: " + palabraSecreta;
  }
}

function jugar(letra) {
  letra = letra.toUpperCase();

  if (letrasUsadas.includes(letra)) {
    return;
  }

  letrasUsadas.push(letra);

  if (palabraSecreta.includes(letra)) {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        palabraAdivinada[i] = letra;
      }
    }
    document.getElementById(letra).classList.add("correcto");
    document.getElementById(letra).classList.remove("incorrecto");
  } else {
    intentosRestantes--;
    dibujarAhorcado(intentosRestantes);
    document.getElementById(letra).classList.add("incorrecto");
    document.getElementById(letra).classList.remove("correcto");
  }

  actualizarInterfaz();
  verificarVictoriaDerrota();

  document.getElementById(letra).setAttribute("disabled", true);
}

function reiniciarJuego() {
  intentosRestantes = 7;
  letrasUsadas = [];
  palabraAdivinada = [];
  seleccionarPalabraAleatoria();
  dibujarAhorcado(intentosRestantes);
  actualizarInterfaz();
  verificarVictoriaDerrota();

  const botonesLetras = document.querySelectorAll(".botonLetra");
  botonesLetras.forEach(boton => {
    boton.removeAttribute("disabled");
    boton.classList.remove("correcto", "incorrecto");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const letrasDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasDisponiblesContenedor = document.getElementById("letrasDisponibles");

  for (const letra of letrasDisponibles) {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.id = letra;
    boton.className = "boton botonLetra";
    boton.addEventListener("click", () => {
      if (intentosRestantes > 0 && !letrasUsadas.includes(letra)) {
        jugar(letra);
      }
    });
    letrasDisponiblesContenedor.appendChild(boton);
  }

  seleccionarPalabraAleatoria();
  dibujarAhorcado(intentosRestantes);
  actualizarInterfaz();

  const reiniciarBtn = document.getElementById("reiniciarBtn");
  reiniciarBtn.addEventListener("click", reiniciarJuego);
});
