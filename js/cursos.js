// 1.5 JavaScript Básico: valores, tipos, operadores y estructuras de control
// js/cursos.js

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-matricula');
  const lista = document.getElementById('lista-cursos');
  const mensajeError = document.getElementById('mensaje-error');
  const campoHorario = document.getElementById('horario');
  const campoCurso = document.getElementById('curso');
  const campoDocente = document.getElementById('docente');
  const cursosSeleccionados = [];

  // Diccionario de cursos y docentes
  const docentesPorCurso = {
    "Matemática 1": ["JUAN DOMINGUEZ", "ALBERTH ANSTAIN"],
    "Matemática 2": ["ALBERTH ANSTAIN"],
    "Programación": ["LUIS ESPINOZA"],
    "Base de Datos": ["JUAN CARLOS ORTIZ"],
    "Física": ["CHRISTIAN ALONSO VEGA"],
    "Programación Web": ["CHRISTIAN ALONSO VEGA"],
    "Estructura de Datos": ["CRISTIAN RONALDO"]
  };

  // Actualizar docentes según curso seleccionado
  campoCurso.addEventListener('change', () => {
    const cursoSeleccionado = campoCurso.value;
    const docentes = docentesPorCurso[cursoSeleccionado] || [];
    campoDocente.innerHTML = '';
    docentes.forEach(docente => {
      const opcion = document.createElement('option');
      opcion.value = docente;
      opcion.textContent = docente;
      campoDocente.appendChild(opcion);
    });
  });

  // 1.6 Funciones: definición, argumentos, funciones de flecha y recursivas
  const agregarCurso = (nombre, codigo, carrera, ciclo, curso, horario, docente) => {
    const objetoCurso = {
      nombre,
      codigo,
      carrera,
      ciclo,
      curso,
      horario,
      docente,
      mostrar() {
        return `${this.nombre} (${this.codigo}) - ${this.carrera}, ciclo ${this.ciclo}: ${this.curso} (${this.horario}) con ${this.docente}`;
      }
    };

    cursosSeleccionados.push(objetoCurso);
    actualizarLista();
  };

  const actualizarLista = () => {
    lista.innerHTML = '';
    cursosSeleccionados.forEach((c) => {
      const item = document.createElement('li');
      item.textContent = c.mostrar();
      lista.appendChild(item);
    });
  };

  // 1.7 Estructuras de Datos: clases, arrays, objetos, polimorfismo
  class Estudiante {
    constructor(nombre, codigo, carrera, ciclo) {
      this.nombre = nombre;
      this.codigo = codigo;
      this.carrera = carrera;
      this.ciclo = ciclo;
      this.matriculas = [];
    }

    matricular(curso) {
      this.matriculas.push(curso);
    }

    obtenerResumen() {
      return `${this.nombre} (${this.codigo}) tiene ${this.matriculas.length} cursos.`;
    }
  }

  // 1.5 Manejo de Eventos y DOM
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const codigo = document.getElementById('codigo').value.trim();
    const carrera = document.getElementById('carrera').value;
    const ciclo = document.getElementById('ciclo').value;
    const curso = campoCurso.value;
    const horario = campoHorario.value;
    const docente = campoDocente.value;

    // Validar si ya existe un curso en el mismo horario
    const horarioOcupado = cursosSeleccionados.some(c => c.horario === horario);

    if (horarioOcupado) {
      mensajeError.style.display = 'block';
      campoHorario.style.border = '2px solid red';
      alert('No se puede tener dos o más cursos en el mismo horario.');
      return;
    } else {
      mensajeError.style.display = 'none';
      campoHorario.style.border = '';
    }

    if (nombre && docente && codigo && carrera && ciclo) {
      agregarCurso(nombre, codigo, carrera, ciclo, curso, horario, docente);
      formulario.reset();
      campoDocente.innerHTML = ''; // Limpiar opciones de docente después del reset
    }
  });

  // Evento de teclado para Enter
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activo = document.activeElement;
      if (activo.tagName === 'INPUT') {
        e.preventDefault();
      }
    }
  });

  // Evento de carga
  window.addEventListener('load', () => {
    console.log('Página de matrícula cargada correctamente');
  });

  // Temporizador de ejemplo
  setTimeout(() => {
    console.log('¡Gracias por usar el simulador de matrícula!');
  }, 3000);
});
