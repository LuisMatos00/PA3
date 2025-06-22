// 1.5 JavaScript Básico: valores, tipos, operadores, estructuras de control
console.log("Cargando sistema de matrícula...");

const cursosDisponibles = [
  "Matemática 1",
  "Matemática 2",
  "Programación",
  "Base de Datos",
  "Física",
  "Programación Web",
  "Estructura de Datos"
];

// 1.6 Funciones y funciones de flecha
function crearCurso(nombre, horario, docente) {
  return { nombre, horario, docente };
}

const agregarCursoALista = (curso) => {
  const lista = document.getElementById("lista-cursos");
  const item = document.createElement("li");
  item.textContent = `Curso: ${curso.nombre}, Horario: ${curso.horario}, Docente: ${curso.docente}`;
  lista.appendChild(item);
};

// Función recursiva para contar cursos
function contarCursos(elemento, contador = 0) {
  if (!elemento.nextElementSibling) return contador + 1;
  return contarCursos(elemento.nextElementSibling, contador + 1);
}

// Clase con métodos, encapsulamiento y prototipos
class Matricula {
  #cursos = [];

  agregar(curso) {
    this.#cursos.push(curso);
    agregarCursoALista(curso);
  }

  listar() {
    return this.#cursos;
  }
}

// Polimorfismo con clases
class CursoOnline extends Matricula {
  agregar(curso) {
    curso.modalidad = "Virtual";
    super.agregar(curso);
  }
}

const matricula = new CursoOnline();

// 1.7 Eventos y DOM
window.onload = () => {
  const form = document.getElementById("formulario-matricula");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const cursoNombre = document.getElementById("curso").value;
    const horario = document.getElementById("horario").value;
    const docente = document.getElementById("docente").value;

    const nuevoCurso = crearCurso(cursoNombre, horario, docente);
    matricula.agregar(nuevoCurso);

    alert(`Curso matriculado por ${nombre}`);
  });

  // Evento de teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      alert("Has presionado Escape. Cancelando...");
    }
  });

  // Evento de scroll
  window.addEventListener("scroll", () => {
    console.log("Scroll detectado en la página de cursos");
  });

  // Evento de foco
  document.getElementById("nombre").addEventListener("focus", () => {
    console.log("Campo nombre enfocado");
  });

  // Temporizador
  setTimeout(() => {
    console.log("Sugerencia: no olvides seleccionar un horario válido.");
  }, 3000);
};
