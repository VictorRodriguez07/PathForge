import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ================================================================
// seedConcepts
// 60 conceptos con contenido completo para producción
// ================================================================
export async function seedConcepts() {
  const javascript = await prisma.subject.findUniqueOrThrow({ where: { slug: "javascript" } });
  const typescript = await prisma.subject.findUniqueOrThrow({ where: { slug: "typescript" } });
  const react      = await prisma.subject.findUniqueOrThrow({ where: { slug: "react" } });
  const nodejs     = await prisma.subject.findUniqueOrThrow({ where: { slug: "nodejs" } });
  const python     = await prisma.subject.findUniqueOrThrow({ where: { slug: "python" } });
  const aws        = await prisma.subject.findUniqueOrThrow({ where: { slug: "aws" } });

  const concepts = [

    // ════════════════════════════════════════
    // JAVASCRIPT
    // ════════════════════════════════════════
    {
      name: "Variables, tipos de datos y operadores",
      slug: "js-variables",
      level: "BEGINNER" as const,
      subjectId: javascript.id,
      description: "Las variables son los contenedores donde guardas información en tu programa. JavaScript tiene tres formas de declararlas: var, let y const, y maneja siete tipos de datos primitivos.",
      whyMatters: "Sin variables no hay programa. Son la base absoluta de cualquier lógica que escribas, desde guardar el nombre de un usuario hasta almacenar el resultado de un cálculo complejo.",
      explanation: `Imagina que tu programa es una cocina. Las variables son los recipientes donde guardas ingredientes: un tazón para la harina, otro para el azúcar. Cada recipiente tiene un nombre y un contenido.

En JavaScript tienes tres tipos de recipientes:
- **const**: un recipiente sellado. Una vez que pones algo adentro, no puedes cambiarlo. Úsalo por defecto.
- **let**: un recipiente normal. Puedes cambiar su contenido cuando quieras.
- **var**: el recipiente viejo con comportamientos extraños. Evítalo en código moderno.

Los tipos de datos son la naturaleza de lo que guardas:
- **string**: texto, siempre entre comillas. "Hola mundo"
- **number**: números. 42, 3.14, -7
- **boolean**: verdadero o falso. true / false
- **null**: ausencia intencional de valor
- **undefined**: variable declarada pero sin valor asignado
- **object**: colección de datos relacionados
- **symbol**: identificador único (uso avanzado)`,
      codeExample: `// ✅ Buenas prácticas modernas
const nombre = "María";          // string — no cambiará
const edad = 28;                 // number
const esDeveloper = true;        // boolean
let puntuacion = 0;              // let porque cambiará

// ❌ Evita var — tiene scoping confuso
var otraVariable = "no usar";

// Operadores básicos
const suma = 10 + 5;             // 15
const resultado = suma * 2;      // 30
const texto = "Hola " + nombre; // "Hola María" (concatenación)

// Template literals — la forma moderna de unir texto
const saludo = \`Hola \${nombre}, tienes \${edad} años\`;
console.log(saludo); // "Hola María, tienes 28 años"

// typeof — para saber el tipo de una variable
console.log(typeof nombre);      // "string"
console.log(typeof edad);        // "number"
console.log(typeof null);        // "object" ← bug histórico de JS, cuidado`,
      practicalTips: [
        "Usa const por defecto. Solo cambia a let cuando sepas que el valor va a cambiar. Nunca uses var.",
        "Los nombres de variables deben ser descriptivos: 'userAge' es mejor que 'x' o 'a'.",
        "JavaScript distingue mayúsculas: 'nombre' y 'Nombre' son variables diferentes.",
        "Usa camelCase para nombrar variables: nombreCompleto, fechaNacimiento, esActivo.",
        "null y undefined no son lo mismo: null es 'no hay valor intencionalmente', undefined es 'nunca se asignó'.",
      ],
      commonMistakes: [
        "Usar var en lugar de const/let. var tiene function scope y hoisting, lo que genera bugs difíciles de encontrar.",
        "Confundir == y ===. Usa siempre === (igualdad estricta). El == hace conversiones de tipo automáticas que dan resultados inesperados: '5' == 5 es true.",
        "Olvidar que typeof null devuelve 'object', no 'null'. Para verificar null usa: variable === null.",
        "Declarar una variable sin asignarle valor y después usarla sin verificar que no sea undefined.",
      ],
      resources: [
        { title: "MDN: Variables en JavaScript", url: "https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Variables", type: "doc" },
        { title: "MDN: Tipos de datos en JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures", type: "doc" },
        { title: "JavaScript.info: Variables", url: "https://javascript.info/variables", type: "article" },
      ],
    },

    {
      name: "Funciones y scope",
      slug: "js-functions",
      level: "BEGINNER" as const,
      subjectId: javascript.id,
      description: "Las funciones son bloques de código reutilizables que ejecutan una tarea específica. El scope define desde dónde puedes acceder a cada variable en tu programa.",
      whyMatters: "Las funciones son el mecanismo principal para organizar y reutilizar código. Sin ellas, repetirías el mismo código cientos de veces. Entender el scope evita la mayoría de los bugs de 'variable no definida' o 'valor incorrecto'.",
      explanation: `Una función es como una receta de cocina: defines los pasos una vez y los ejecutas cuantas veces necesites, con diferentes ingredientes (parámetros) cada vez.

**Formas de declarar funciones:**

1. **Declaración de función** — se puede llamar antes de declararla (hoisting)
2. **Expresión de función** — se asigna a una variable
3. **Arrow function** — la sintaxis moderna, más corta

**Scope (alcance):**
El scope determina la visibilidad de las variables. Piénsalo como habitaciones en una casa:
- El **scope global** es el jardín: todos pueden verlo
- El **scope de función** es una habitación: solo lo que está adentro puede ver lo que hay adentro
- El **scope de bloque** (let/const) es un cajón dentro de la habitación: aún más específico`,
      codeExample: `// 1. Declaración de función (hoisting: funciona aunque la llames antes)
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
console.log(saludar("Ana")); // "Hola, Ana!"

// 2. Arrow function — la más usada en código moderno
const sumar = (a, b) => a + b;
console.log(sumar(3, 4)); // 7

// 3. Función con valor por defecto
const crearUsuario = (nombre, rol = "estudiante") => {
  return { nombre, rol };
};
console.log(crearUsuario("Luis"));        // { nombre: "Luis", rol: "estudiante" }
console.log(crearUsuario("Ana", "admin")); // { nombre: "Ana", rol: "admin" }

// ── SCOPE ──────────────────────────────
const idioma = "español"; // scope global

function mostrarIdioma() {
  const mensaje = "El idioma es"; // scope local — solo existe aquí
  console.log(\`\${mensaje}: \${idioma}\`); // puede acceder al global
}

mostrarIdioma(); // "El idioma es: español"
// console.log(mensaje); // ❌ ReferenceError — mensaje no existe fuera

// Scope de bloque con let/const
if (true) {
  let dentroDelBloque = "solo aquí";
  console.log(dentroDelBloque); // ✅ funciona
}
// console.log(dentroDelBloque); // ❌ ReferenceError`,
      practicalTips: [
        "Prefiere arrow functions para funciones cortas y callbacks. Usa function declarations para funciones principales que necesites que sean hoisted.",
        "Una función debe hacer UNA sola cosa bien. Si su nombre tiene 'y' (calcularYMostrar), probablemente deba ser dos funciones.",
        "Si una función tiene más de 3-4 parámetros, considera pasar un objeto como parámetro: funcion({ nombre, edad, email }).",
        "El nombre de la función debe ser un verbo: calcularTotal, obtenerUsuario, validarEmail.",
      ],
      commonMistakes: [
        "Olvidar el return. Una función sin return devuelve undefined. Si usas arrow function con llaves {}, necesitas return explícito.",
        "Modificar variables globales desde dentro de una función (efectos secundarios no intencionados). Las funciones deben depender solo de sus parámetros.",
        "Confundir parámetros con argumentos: los parámetros son los nombres en la definición, los argumentos son los valores que pasas al llamarla.",
        "Llamar una función como variable: const resultado = saludar en lugar de const resultado = saludar().",
      ],
      resources: [
        { title: "MDN: Funciones en JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions", type: "doc" },
        { title: "JavaScript.info: Funciones", url: "https://javascript.info/function-basics", type: "article" },
        { title: "JavaScript.info: Arrow functions", url: "https://javascript.info/arrow-functions-basics", type: "article" },
      ],
    },

    {
      name: "Arrays y objetos",
      slug: "js-arrays-objects",
      level: "BEGINNER" as const,
      subjectId: javascript.id,
      description: "Los arrays almacenan listas ordenadas de elementos. Los objetos almacenan colecciones de pares clave-valor. Son las estructuras de datos más usadas en JavaScript.",
      whyMatters: "El 80% de los datos que manejarás en aplicaciones reales son arrays y objetos: listas de usuarios, configuraciones, respuestas de APIs. Dominarlos es dominar la manipulación de datos.",
      explanation: `**Arrays** son listas ordenadas. Piénsalos como una fila de casilleros numerados donde cada número (índice) guarda algo.

**Objetos** son colecciones de propiedades. Piénsalos como una ficha técnica de una persona: nombre, edad, email son las claves y sus valores son los datos.

Los métodos modernos de array (map, filter, reduce) son la forma profesional de transformar datos sin escribir loops manuales.`,
      codeExample: `// ── ARRAYS ──────────────────────────────
const frutas = ["manzana", "banana", "naranja"];
console.log(frutas[0]);        // "manzana" — índice empieza en 0
console.log(frutas.length);    // 3

// Métodos esenciales
frutas.push("uva");            // agrega al final
frutas.pop();                  // elimina el último

// Los tres métodos más importantes — apréndetelos bien:
const numeros = [1, 2, 3, 4, 5];

// map — transforma cada elemento, devuelve nuevo array
const dobles = numeros.map(n => n * 2);
console.log(dobles); // [2, 4, 6, 8, 10]

// filter — filtra elementos que cumplan condición
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]

// reduce — acumula un resultado
const suma = numeros.reduce((acum, n) => acum + n, 0);
console.log(suma); // 15

// ── OBJETOS ─────────────────────────────
const usuario = {
  nombre: "Laura",
  edad: 30,
  email: "laura@email.com",
  esActivo: true,
};

// Acceso a propiedades
console.log(usuario.nombre);         // "Laura"
console.log(usuario["email"]);       // "laura@email.com"

// Desestructuración — extraer propiedades en variables
const { nombre, edad } = usuario;
console.log(nombre, edad);           // "Laura" 30

// Spread operator — copiar/fusionar objetos
const usuarioActualizado = { ...usuario, edad: 31 };

// Array de objetos — lo más común en apps reales
const usuarios = [
  { id: 1, nombre: "Ana", rol: "admin" },
  { id: 2, nombre: "Luis", rol: "user" },
];

const admins = usuarios.filter(u => u.rol === "admin");`,
      practicalTips: [
        "Usa map, filter y reduce en lugar de loops for cuando transformes arrays. Tu código será más legible y funcional.",
        "Nunca modifiques un array con índices directamente en React o código funcional. Crea siempre un nuevo array.",
        "El spread operator {...obj} hace una copia shallow (superficial). Para objetos anidados profundos necesitas otras técnicas.",
        "find() devuelve el primer elemento que cumple la condición. findIndex() devuelve su posición. some() devuelve boolean.",
      ],
      commonMistakes: [
        "Mutar arrays directamente con push/splice en contextos donde necesitas inmutabilidad (React state). Usa siempre [...arr, nuevoElemento].",
        "Olvidar que los índices de arrays empiezan en 0. El último elemento es array[array.length - 1].",
        "Comparar objetos con == o ===. Los objetos se comparan por referencia, no por valor: {} === {} es false.",
        "Olvidar el valor inicial en reduce(). Sin él, el primer elemento se usa como acumulador inicial, lo que falla con arrays vacíos.",
      ],
      resources: [
        { title: "MDN: Array", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array", type: "doc" },
        { title: "JavaScript.info: Arrays", url: "https://javascript.info/array", type: "article" },
        { title: "JavaScript.info: Métodos de array", url: "https://javascript.info/array-methods", type: "article" },
      ],
    },

    {
      name: "Manipulación del DOM",
      slug: "js-dom",
      level: "BEGINNER" as const,
      subjectId: javascript.id,
      description: "El DOM (Document Object Model) es la representación en memoria de tu página HTML. JavaScript puede seleccionar, modificar, crear y eliminar cualquier elemento de la página en tiempo real.",
      whyMatters: "El DOM es el puente entre tu código JavaScript y lo que el usuario ve en la pantalla. Sin manipulación del DOM, tus páginas serían estáticas e incapaces de responder a las acciones del usuario.",
      explanation: `Cuando el navegador carga tu HTML, lo convierte en un árbol de objetos en memoria llamado DOM. JavaScript puede acceder y modificar ese árbol, y el navegador actualiza la pantalla automáticamente.

Piénsalo como un árbol genealógico: el documento es el abuelo, el body es el padre, y todos los elementos HTML son hijos y nietos. JavaScript puede cambiar cualquier nodo de ese árbol.`,
      codeExample: `// ── SELECCIONAR ELEMENTOS ───────────────
// querySelector — devuelve el PRIMERO que coincide
const titulo = document.querySelector("h1");
const boton = document.querySelector("#miBoton");      // por ID
const tarjeta = document.querySelector(".card");       // por clase

// querySelectorAll — devuelve TODOS (NodeList)
const items = document.querySelectorAll(".item");

// ── LEER Y MODIFICAR ────────────────────
titulo.textContent = "Nuevo título";          // cambia el texto
titulo.innerHTML = "<span>Título</span>";     // cambia el HTML interno
titulo.style.color = "blue";                  // estilo inline

// Clases CSS (la forma correcta)
tarjeta.classList.add("activo");
tarjeta.classList.remove("oculto");
tarjeta.classList.toggle("destacado");        // alterna
tarjeta.classList.contains("activo");         // boolean

// Atributos
const link = document.querySelector("a");
link.getAttribute("href");
link.setAttribute("href", "https://google.com");

// ── CREAR Y AGREGAR ELEMENTOS ────────────
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy nuevo aquí";
nuevoParrafo.classList.add("texto-nuevo");
document.body.appendChild(nuevoParrafo);

// ── ELIMINAR ELEMENTOS ───────────────────
const elementoViejo = document.querySelector(".eliminar");
elementoViejo.remove();`,
      practicalTips: [
        "Prefiere querySelector sobre getElementById o getElementsByClassName. Es más versátil y soporta cualquier selector CSS.",
        "Usa textContent para texto plano e innerHTML solo cuando necesites insertar HTML. innerHTML con datos del usuario es un riesgo de seguridad (XSS).",
        "classList.toggle, classList.add y classList.remove son mucho mejores que manipular style directamente. Mantén los estilos en CSS.",
        "Si necesitas modificar muchos elementos, guarda la referencia en una variable en lugar de hacer querySelector múltiples veces.",
      ],
      commonMistakes: [
        "Ejecutar código DOM antes de que el HTML esté cargado. Usa DOMContentLoaded o coloca el script al final del body.",
        "Usar innerHTML con datos del usuario sin sanitizar — vulnerabilidad de seguridad XSS.",
        "Olvidar que querySelectorAll devuelve un NodeList, no un Array. Necesitas Array.from() para usar métodos como map.",
        "Seleccionar elementos dentro de un loop costoso sin cachear la referencia fuera del loop.",
      ],
      resources: [
        { title: "MDN: Introducción al DOM", url: "https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction", type: "doc" },
        { title: "JavaScript.info: El DOM", url: "https://javascript.info/dom-nodes", type: "article" },
      ],
    },

    {
      name: "Eventos del navegador",
      slug: "js-events",
      level: "BEGINNER" as const,
      subjectId: javascript.id,
      description: "Los eventos son acciones que ocurren en el navegador: clicks, teclas presionadas, formularios enviados, páginas cargadas. JavaScript puede escuchar y responder a cada uno de ellos.",
      whyMatters: "Los eventos son el corazón de la interactividad web. Sin ellos, tu página no puede responder a nada de lo que haga el usuario. Todo lo interactivo que ves en la web — botones, menús, formularios — funciona con eventos.",
      explanation: `Los eventos funcionan con el patrón observador: le dices al navegador "cuando pase X, ejecuta esta función". Cuando X ocurre, el navegador llama tu función automáticamente.

El objeto **event** que recibe tu función tiene información valiosa sobre lo que ocurrió: qué elemento fue clickeado, qué tecla se presionó, la posición del mouse, etc.

**Event bubbling**: cuando haces click en un elemento, el evento "burbujea" hacia arriba por todos sus padres. Esto es importante para la delegación de eventos.`,
      codeExample: `// ── AGREGAR EVENTOS ─────────────────────
const boton = document.querySelector("#miBoton");

boton.addEventListener("click", (event) => {
  console.log("¡Clickeado!");
  console.log(event.target); // el elemento que recibió el click
});

// ── TIPOS DE EVENTOS COMUNES ─────────────
// Click, doble click
elemento.addEventListener("click", handler);
elemento.addEventListener("dblclick", handler);

// Teclado
document.addEventListener("keydown", (e) => {
  console.log(e.key);        // "Enter", "Escape", "a", etc.
  if (e.key === "Enter") { /* hacer algo */ }
});

// Formularios — siempre prevenir el comportamiento por defecto
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que la página se recargue
  const datos = new FormData(form);
  console.log(datos.get("nombre"));
});

// Input — reacciona mientras el usuario escribe
const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  console.log(e.target.value); // el texto actual
});

// ── DELEGACIÓN DE EVENTOS ────────────────
// En lugar de agregar listener a cada elemento de una lista,
// agrégalo al padre y filtra por el target
const lista = document.querySelector("ul");
lista.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completado");
  }
});`,
      practicalTips: [
        "Usa delegación de eventos cuando tengas muchos elementos similares (listas, tablas). Es más eficiente que agregar un listener a cada uno.",
        "Siempre llama e.preventDefault() en el submit de formularios para controlar el envío con JavaScript.",
        "removeEventListener necesita la misma referencia de función para funcionar. Guarda la función en una variable si necesitas removerla.",
        "Para eventos de scroll y resize, usa debounce o throttle para no ejecutar la función cientos de veces por segundo.",
      ],
      commonMistakes: [
        "Olvidar e.preventDefault() en formularios — la página se recarga y pierdes el estado.",
        "Agregar el mismo event listener múltiples veces al mismo elemento (especialmente en frameworks o dentro de loops).",
        "Confundir e.target (el elemento exacto clickeado) con e.currentTarget (el elemento donde está el listener).",
        "No limpiar event listeners en componentes que se desmontan — causa memory leaks.",
      ],
      resources: [
        { title: "MDN: Introducción a eventos", url: "https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events", type: "doc" },
        { title: "JavaScript.info: Eventos del navegador", url: "https://javascript.info/introduction-browser-events", type: "article" },
      ],
    },

    {
      name: "Promesas y async/await",
      slug: "js-async",
      level: "INTERMEDIATE" as const,
      subjectId: javascript.id,
      description: "JavaScript ejecuta código de forma asíncrona para no bloquear el navegador durante operaciones lentas como peticiones HTTP o lectura de archivos. Las Promesas y async/await son las herramientas modernas para manejar esta asincronía.",
      whyMatters: "Cualquier app que consuma APIs, lea archivos o haga consultas a bases de datos necesita asincronía. Entender esto correctamente es lo que separa a los developers junior de los intermedios.",
      explanation: `Imagina que vas a un restaurante. Haces tu pedido (operación asíncrona) y el mesero no se queda parado esperando que cocinen — sigue atendiendo otras mesas (event loop). Cuando tu comida está lista, te la trae.

JavaScript funciona igual: cuando lanzas una operación lenta, el motor sigue ejecutando otro código. Cuando la operación termina, ejecuta el callback/then/await que definiste.

**Promesa**: un objeto que representa un valor que estará disponible en el futuro. Puede estar:
- **pending**: esperando
- **fulfilled**: completada con éxito
- **rejected**: falló

**async/await**: azúcar sintáctica sobre Promesas. Hace que el código asíncrono se vea y se lea como código síncrono.`,
      codeExample: `// ── PROMESAS ────────────────────────────
const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const exito = true;
    if (exito) resolve("¡Datos obtenidos!");
    else reject(new Error("Algo salió mal"));
  }, 1000);
});

miPromesa
  .then(resultado => console.log(resultado))  // éxito
  .catch(error => console.error(error))       // error
  .finally(() => console.log("Siempre corre"));

// ── ASYNC/AWAIT (la forma moderna) ──────
// async convierte una función en asíncrona — siempre devuelve una Promesa
async function obtenerUsuario(id) {
  try {
    const respuesta = await fetch(\`/api/usuarios/\${id}\`);

    if (!respuesta.ok) {
      throw new Error(\`HTTP error! status: \${respuesta.status}\`);
    }

    const usuario = await respuesta.json();
    return usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error; // re-lanzar para que el llamador también lo maneje
  }
}

// Llamar una función async
obtenerUsuario(1).then(usuario => console.log(usuario));

// O dentro de otra función async
async function mostrarUsuario() {
  const usuario = await obtenerUsuario(1);
  console.log(usuario.nombre);
}

// ── PARALELISMO ──────────────────────────
// Promise.all — ejecuta varias promesas en paralelo
async function cargarDashboard() {
  const [usuarios, productos, ventas] = await Promise.all([
    fetch("/api/usuarios").then(r => r.json()),
    fetch("/api/productos").then(r => r.json()),
    fetch("/api/ventas").then(r => r.json()),
  ]);
  // Las tres peticiones corren al mismo tiempo
  return { usuarios, productos, ventas };
}`,
      practicalTips: [
        "Usa async/await en lugar de .then() encadenado. Es más legible y fácil de debuggear.",
        "Siempre envuelve await en try/catch. Una promesa rechazada sin catch es un error no manejado.",
        "Cuando tengas varias operaciones independientes, usa Promise.all para correrlas en paralelo. No las hagas await una por una si no dependen entre sí.",
        "async/await no bloquea Node.js ni el navegador. Solo pausa la ejecución de esa función específica.",
      ],
      commonMistakes: [
        "Olvidar await antes de una función async. Sin await, recibes la Promesa, no el valor resuelto.",
        "Usar await dentro de un forEach — no funciona correctamente. Usa for...of o Promise.all con map.",
        "No manejar errores con try/catch en async/await. Los errores silenciosos son los más difíciles de debuggear.",
        "Hacer await secuencial cuando las operaciones son independientes: await A; await B — es lento. Usa Promise.all([A, B]).",
      ],
      resources: [
        { title: "MDN: Usando Promesas", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises", type: "doc" },
        { title: "JavaScript.info: Promesas", url: "https://javascript.info/promise-basics", type: "article" },
        { title: "JavaScript.info: Async/Await", url: "https://javascript.info/async-await", type: "article" },
      ],
    },

    {
      name: "Closures y callbacks",
      slug: "js-closures",
      level: "INTERMEDIATE" as const,
      subjectId: javascript.id,
      description: "Un closure es una función que recuerda el entorno donde fue creada, incluso después de que ese entorno ya no existe. Los callbacks son funciones que se pasan como argumento para ejecutarse más tarde.",
      whyMatters: "Los closures son uno de los conceptos más poderosos de JavaScript. Se usan para encapsular estado, crear módulos, implementar memoización y son la base de hooks como useState en React.",
      explanation: `Imagina que escribes una nota en un papel y se la das a alguien. Esa persona puede leer la nota más tarde, aunque tú ya no estés ahí. El closure es esa nota: la función "recuerda" las variables de su entorno original.

**Closure**: cuando una función interna accede a variables de su función externa, incluso después de que la externa haya terminado de ejecutarse.

**Callback**: simplemente una función que le pasas a otra función para que la llame en el momento apropiado. Son la base de la asincronía y los eventos.`,
      codeExample: `// ── CLOSURES ────────────────────────────
// La función interna "recuerda" la variable count
function crearContador() {
  let count = 0; // esta variable vive mientras exista el closure

  return {
    incrementar: () => ++count,
    decrementar: () => --count,
    obtener: () => count,
  };
}

const contador = crearContador();
contador.incrementar(); // 1
contador.incrementar(); // 2
contador.decrementar(); // 1
console.log(contador.obtener()); // 1
// count no es accesible desde afuera — está encapsulado

// Caso práctico: función que recuerda un multiplicador
function multiplicadorPor(factor) {
  return (numero) => numero * factor; // closure sobre 'factor'
}
const doble = multiplicadorPor(2);
const triple = multiplicadorPor(3);
console.log(doble(5));  // 10
console.log(triple(5)); // 15

// ── CALLBACKS ────────────────────────────
// Un callback es simplemente una función como argumento
function procesarDato(dato, callback) {
  const resultado = dato.trim().toLowerCase();
  callback(resultado); // llama la función que le pasaron
}

procesarDato("  HOLA MUNDO  ", (texto) => {
  console.log(texto); // "hola mundo"
});

// Los callbacks son la base de los métodos de array
const nombres = ["Ana", "Luis", "María"];
nombres.forEach((nombre) => console.log(nombre)); // callback por cada elemento
const mayusculas = nombres.map((n) => n.toUpperCase()); // callback de transformación`,
      practicalTips: [
        "Los closures son perfectos para crear funciones de fábrica (factory functions) que generan funciones configuradas.",
        "Cuidado con closures en loops — usa let en lugar de var para que cada iteración tenga su propia variable.",
        "Los closures mantienen vivas las variables de su scope externo — pueden causar memory leaks si no se usan correctamente.",
        "En React, los hooks (useState, useEffect) funcionan gracias a closures. Entenderlos profundamente te hace mejor en React.",
      ],
      commonMistakes: [
        "El clásico bug de closures en loops con var: todos los closures comparten la misma variable y terminan con el último valor.",
        "Pasar un callback sin invocarlo: onClick={handleClick} vs onClick={handleClick()} — la segunda se ejecuta inmediatamente al renderizar.",
        "Callback hell: callbacks anidados dentro de callbacks. La solución es Promesas o async/await.",
      ],
      resources: [
        { title: "MDN: Closures", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Closures", type: "doc" },
        { title: "JavaScript.info: Closures", url: "https://javascript.info/closure", type: "article" },
      ],
    },

    {
      name: "Módulos ES6+",
      slug: "js-modules",
      level: "INTERMEDIATE" as const,
      subjectId: javascript.id,
      description: "Los módulos ES6 permiten dividir tu código en archivos separados y reutilizables. Cada archivo es un módulo con su propio scope que puede exportar e importar lo que necesite.",
      whyMatters: "Sin módulos, todo tu código viviría en un solo archivo caótico con variables globales que colisionan entre sí. Los módulos son la base de cualquier proyecto JavaScript profesional.",
      explanation: `Los módulos funcionan como piezas de LEGO: cada pieza (módulo) tiene una forma específica y encaja con otras. Puedes usar la misma pieza en múltiples construcciones sin duplicarla.

Hay dos tipos de exports:
- **Named exports**: exportas cosas por nombre, puedes exportar múltiples por módulo
- **Default export**: exportas una cosa principal, solo una por módulo`,
      codeExample: `// ── ARCHIVO: utils.js ───────────────────
// Named exports
export const PI = 3.14159;

export function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-ES").format(fecha);
}

export const calcularArea = (radio) => PI * radio ** 2;

// ── ARCHIVO: usuario.js ──────────────────
// Default export — la exportación principal del módulo
export default class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }
}

// ── ARCHIVO: main.js ─────────────────────
// Importar named exports — deben ir entre llaves
import { PI, formatearFecha, calcularArea } from "./utils.js";

// Importar default export — sin llaves, cualquier nombre
import Usuario from "./usuario.js";

// Importar todo
import * as Utils from "./utils.js";

console.log(calcularArea(5)); // 78.53...
const user = new Usuario("Ana", "ana@email.com");
console.log(user.saludar()); // "Hola, soy Ana"

// Re-exportar — útil para crear un archivo index.js
export { formatearFecha, calcularArea } from "./utils.js";`,
      practicalTips: [
        "Crea un archivo index.js en cada carpeta que re-exporte lo que los demás necesiten. Simplifica los imports.",
        "Prefiere named exports para la mayoría de cosas — son más fáciles de refactorizar porque el nombre es explícito.",
        "El default export es bueno para el componente o clase principal de un módulo (ej: el componente React de un archivo).",
        "Evita imports circulares (A importa B, B importa A) — causan bugs difíciles de rastrear.",
      ],
      commonMistakes: [
        "Confundir la sintaxis de CommonJS (require/module.exports) con ES Modules (import/export). No los mezcles.",
        "Olvidar las llaves en named imports: import calcularArea from './utils' importa el default, no el named export.",
        "Exportar con default y luego intentar importar por nombre — no funciona.",
      ],
      resources: [
        { title: "MDN: Módulos JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules", type: "doc" },
        { title: "JavaScript.info: Módulos", url: "https://javascript.info/modules-intro", type: "article" },
      ],
    },

    {
      name: "Fetch API y consumo de APIs REST",
      slug: "js-fetch",
      level: "INTERMEDIATE" as const,
      subjectId: javascript.id,
      description: "La Fetch API es la forma nativa de hacer peticiones HTTP desde JavaScript. Te permite comunicarte con servidores para obtener y enviar datos en formato JSON.",
      whyMatters: "Toda aplicación web moderna se comunica con APIs: para obtener datos, autenticar usuarios, guardar información. La Fetch API es la herramienta estándar para esto.",
      explanation: `Una API REST es como un menú de restaurante: tiene endpoints (platos) a los que puedes hacer pedidos (requests) y recibes respuestas. Los verbos HTTP son las acciones: GET para obtener, POST para crear, PUT/PATCH para actualizar, DELETE para eliminar.

fetch() siempre devuelve una Promesa. La respuesta no es directamente los datos — primero debes convertirla con .json().`,
      codeExample: `// ── GET — obtener datos ──────────────────
async function obtenerUsuarios() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(\`Error HTTP: \${response.status}\`);
    }

    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    console.error("Error:", error);
  }
}

// ── POST — crear un recurso ───────────────
async function crearUsuario(nuevoUsuario) {
  const response = await fetch("https://api.ejemplo.com/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${token}\`,
    },
    body: JSON.stringify(nuevoUsuario),
  });

  if (!response.ok) throw new Error("Error al crear usuario");
  return response.json();
}

// ── PUT — actualizar completo ────────────
async function actualizarUsuario(id, datos) {
  const response = await fetch(\`/api/usuarios/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return response.json();
}

// ── DELETE — eliminar ────────────────────
async function eliminarUsuario(id) {
  const response = await fetch(\`/api/usuarios/\${id}\`, {
    method: "DELETE",
  });
  return response.ok; // true si fue exitoso
}

// Uso práctico
const usuarios = await obtenerUsuarios();
usuarios.forEach(u => console.log(u.name));`,
      practicalTips: [
        "Siempre verifica response.ok antes de procesar los datos. Un 404 o 500 no lanza un error automáticamente en fetch.",
        "En proyectos reales, usa axios o crea un wrapper alrededor de fetch para manejar headers comunes (auth token) en un solo lugar.",
        "Guarda las URLs base en constantes o variables de entorno, no las repitas en cada llamada.",
        "Para cancelar peticiones usa AbortController — útil cuando el usuario navega antes de que llegue la respuesta.",
      ],
      commonMistakes: [
        "No llamar .json() para parsear la respuesta — response es un objeto Response, no los datos directamente.",
        "No manejar errores HTTP (4xx, 5xx). fetch solo lanza error en fallos de red, no en respuestas de error del servidor.",
        "Olvidar el header 'Content-Type': 'application/json' en POST/PUT — el servidor no sabrá cómo interpretar el body.",
        "Exponer tokens de autenticación en el código del cliente en repositorios públicos.",
      ],
      resources: [
        { title: "MDN: Fetch API", url: "https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch", type: "doc" },
        { title: "JavaScript.info: Fetch", url: "https://javascript.info/fetch", type: "article" },
      ],
    },

    {
      name: "Patrones de diseño en JavaScript",
      slug: "js-patterns",
      level: "ADVANCED" as const,
      subjectId: javascript.id,
      description: "Los patrones de diseño son soluciones probadas a problemas comunes en el desarrollo de software. En JavaScript los más relevantes son Module, Observer, Factory, Singleton y Strategy.",
      whyMatters: "Los patrones de diseño son el vocabulario común de los developers senior. Te permiten comunicar soluciones arquitectónicas rápidamente y escribir código más mantenible y escalable.",
      explanation: `Los patrones de diseño son como recetas de cocina profesional: no inventas cómo hacer una béchamel cada vez, usas la técnica establecida. En código, aplicas soluciones que ya saben que funcionan para problemas recurrentes.

Los más usados en JavaScript moderno:
- **Module**: encapsular código privado y exponer solo lo necesario
- **Observer/EventEmitter**: notificar a múltiples partes cuando algo cambia
- **Factory**: crear objetos sin exponer la lógica de creación
- **Singleton**: asegurar que solo existe una instancia de algo`,
      codeExample: `// ── MODULE PATTERN ──────────────────────
// Encapsula estado privado
const CarritoDeCompras = (() => {
  const items = []; // privado

  return {
    agregar: (producto) => items.push(producto),
    eliminar: (id) => {
      const i = items.findIndex(p => p.id === id);
      if (i !== -1) items.splice(i, 1);
    },
    obtenerTotal: () => items.reduce((sum, p) => sum + p.precio, 0),
    obtenerItems: () => [...items], // devuelve copia
  };
})();

// ── OBSERVER PATTERN ─────────────────────
class EventEmitter {
  constructor() { this.listeners = {}; }

  on(evento, callback) {
    if (!this.listeners[evento]) this.listeners[evento] = [];
    this.listeners[evento].push(callback);
  }

  emit(evento, datos) {
    (this.listeners[evento] || []).forEach(cb => cb(datos));
  }
}

const store = new EventEmitter();
store.on("cambio", (datos) => console.log("Cambió:", datos));
store.emit("cambio", { usuario: "Ana" }); // notifica a todos los listeners

// ── FACTORY PATTERN ──────────────────────
function crearAnimal(tipo, nombre) {
  const comportamientos = {
    perro: { sonido: () => "Guau", correr: () => "corre rápido" },
    gato:  { sonido: () => "Miau", correr: () => "corre elegante" },
  };

  return {
    nombre,
    ...comportamientos[tipo],
  };
}

const miPerro = crearAnimal("perro", "Rex");
console.log(miPerro.sonido()); // "Guau"`,
      practicalTips: [
        "No sobre-ingenierices. Aplica patrones cuando tengas el problema, no de forma preventiva.",
        "El patrón Observer es la base de React, Redux y la mayoría de frameworks modernos. Entenderlo bien te da ventaja.",
        "En JavaScript moderno, los módulos ES6 reemplazan en muchos casos al Module Pattern clásico.",
      ],
      commonMistakes: [
        "Aplicar patrones de diseño sin que el problema los requiera — añade complejidad innecesaria.",
        "Implementar Singleton con estado global mutable — dificulta el testing.",
      ],
      resources: [
        { title: "Patterns.dev — Patrones en JavaScript", url: "https://www.patterns.dev/posts", type: "article" },
        { title: "JavaScript.info: Patrones de diseño", url: "https://javascript.info/", type: "article" },
        { title: "Refactoring Guru: Patrones de diseño", url: "https://refactoring.guru/es/design-patterns", type: "article" },
      ],
    },

    {
      name: "Performance y optimización",
      slug: "js-performance",
      level: "ADVANCED" as const,
      subjectId: javascript.id,
      description: "Optimizar JavaScript significa hacer que tu aplicación sea más rápida y eficiente: menor tiempo de carga, mejor respuesta a interacciones y menor uso de memoria.",
      whyMatters: "El 53% de los usuarios abandona una app si tarda más de 3 segundos en cargar. La performance no es un lujo — es parte de la experiencia de usuario y afecta directamente las métricas de negocio.",
      explanation: `La optimización de JavaScript tiene tres frentes:
1. **Tiempo de carga**: cuánto tarda en descargar y ejecutar el código
2. **Tiempo de ejecución**: cuánto tarda tu código en responder a acciones
3. **Memoria**: cuánta RAM consume tu aplicación

Las herramientas de DevTools del navegador (Performance, Memory) son tus mejores aliados para identificar problemas reales antes de optimizar.`,
      codeExample: `// ── DEBOUNCE — evita ejecutar demasiado seguido ──
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// La búsqueda solo se ejecuta 300ms después de que el usuario para de escribir
const buscarProductos = debounce(async (termino) => {
  const resultados = await fetch(\`/api/buscar?q=\${termino}\`);
  return resultados.json();
}, 300);

// ── MEMOIZACIÓN — cachear resultados costosos ──
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const resultado = fn(...args);
    cache.set(key, resultado);
    return resultado;
  };
}

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// ── LAZY LOADING ────────────────────────
// Cargar código solo cuando se necesita
async function cargarGrafico() {
  const { Chart } = await import("./chart.js"); // importación dinámica
  new Chart(/* ... */);
}

// ── EVITAR LAYOUTS FORZADOS ──────────────
// ❌ Mal — lee y escribe el DOM en cada iteración
items.forEach(item => {
  item.style.height = item.parentNode.clientHeight + "px"; // fuerza reflow
});

// ✅ Bien — lee todo primero, luego escribe
const altura = items[0].parentNode.clientHeight;
items.forEach(item => { item.style.height = altura + "px"; });`,
      practicalTips: [
        "Mide antes de optimizar. Usa Chrome DevTools Performance para identificar el verdadero cuello de botella.",
        "Lazy loading de módulos con import() dinámico puede mejorar drásticamente el tiempo de carga inicial.",
        "Evita manipulaciones del DOM dentro de loops — cada cambio puede causar un reflow costoso.",
        "Web Workers para código CPU-intensivo que bloquearía el hilo principal.",
      ],
      commonMistakes: [
        "Optimizar prematuramente sin medir primero — gastas tiempo en cosas que no impactan.",
        "No usar debounce/throttle en event listeners de scroll, resize o input.",
        "Memory leaks por event listeners no removidos o closures que mantienen referencias grandes.",
      ],
      resources: [
        { title: "web.dev: Performance", url: "https://web.dev/performance/", type: "article" },
        { title: "MDN: Optimización de rendimiento", url: "https://developer.mozilla.org/es/docs/Web/Performance", type: "doc" },
      ],
    },

    {
      name: "Testing con Jest",
      slug: "js-testing",
      level: "ADVANCED" as const,
      subjectId: javascript.id,
      description: "Jest es el framework de testing más popular de JavaScript. Permite escribir tests unitarios y de integración para verificar que tu código funciona correctamente.",
      whyMatters: "El código sin tests es código que no sabes si funciona. Los tests te dan confianza para refactorizar, agregan documentación ejecutable y evitan regresiones — bugs que reaparecen después de haberlos corregido.",
      explanation: `Testing tiene tres niveles principales:
- **Unitario**: prueba una función o módulo aislado
- **Integración**: prueba cómo interactúan múltiples partes
- **E2E**: prueba el flujo completo desde el usuario

Jest proporciona: un runner de tests, funciones de aserción (expect), mocks para aislar dependencias y cobertura de código.`,
      codeExample: `// ── ARCHIVO: calculos.js ────────────────
export function sumar(a, b) { return a + b; }
export function dividir(a, b) {
  if (b === 0) throw new Error("División por cero");
  return a / b;
}

// ── ARCHIVO: calculos.test.js ────────────
import { sumar, dividir } from "./calculos";

describe("Funciones matemáticas", () => {
  // Test básico
  test("suma dos números correctamente", () => {
    expect(sumar(2, 3)).toBe(5);
    expect(sumar(-1, 1)).toBe(0);
  });

  // Test de error
  test("lanza error al dividir por cero", () => {
    expect(() => dividir(10, 0)).toThrow("División por cero");
  });

  // Test con objetos
  test("retorna el usuario correcto", async () => {
    const usuario = await obtenerUsuario(1);
    expect(usuario).toMatchObject({
      id: 1,
      nombre: expect.any(String),
    });
  });
});

// ── MOCKS ────────────────────────────────
import { enviarEmail } from "./email";
jest.mock("./email"); // mock automático del módulo

test("llama a enviarEmail con los datos correctos", async () => {
  enviarEmail.mockResolvedValue({ enviado: true });

  await registrarUsuario({ email: "test@test.com" });

  expect(enviarEmail).toHaveBeenCalledWith({
    para: "test@test.com",
    asunto: expect.stringContaining("Bienvenido"),
  });
});`,
      practicalTips: [
        "Escribe tests para la lógica de negocio crítica primero, no para todo el código.",
        "Un buen test es: Arrange (preparar datos), Act (ejecutar función), Assert (verificar resultado).",
        "Los mocks son para aislar dependencias externas (BD, APIs, email). No mockees la función que estás testeando.",
        "Apunta a 70-80% de cobertura de código crítico, no al 100% de todo — el último 20% suele ser boilerplate.",
      ],
      commonMistakes: [
        "Tests que testean los internos de la implementación en lugar del comportamiento. Si refactorizas sin cambiar comportamiento, los tests no deben romperse.",
        "Tests demasiado acoplados entre sí — cada test debe poder correr de forma independiente.",
        "No testear los casos de error y edge cases — solo el happy path.",
      ],
      resources: [
        { title: "Documentación oficial de Jest", url: "https://jestjs.io/es-ES/docs/getting-started", type: "doc" },
        { title: "Testing JavaScript — Kent C. Dodds", url: "https://testingjavascript.com/", type: "article" },
      ],
    },

    // ════════════════════════════════════════
    // TYPESCRIPT
    // ════════════════════════════════════════
    {
      name: "Tipos básicos y anotaciones",
      slug: "ts-basic-types",
      level: "BEGINNER" as const,
      subjectId: typescript.id,
      description: "TypeScript añade tipos estáticos a JavaScript. Las anotaciones de tipo le dicen al compilador qué tipo de dato espera cada variable, parámetro y función.",
      whyMatters: "Los tipos atrapan errores en tiempo de compilación antes de que lleguen a producción. Un error de tipo detectado en el editor vale por cientos de bugs reportados por usuarios.",
      explanation: `TypeScript es JavaScript con un casco de seguridad. No cambia cómo funciona el código — solo añade verificaciones en tiempo de desarrollo que desaparecen al compilar.

Piénsalo como diferencia entre un contrato verbal (JS) y uno escrito (TS): ambos pueden funcionar, pero el escrito deja claro exactamente qué se acordó y detecta malentendidos antes de que sean problemas.`,
      codeExample: `// ── TIPOS PRIMITIVOS ────────────────────
const nombre: string = "Ana";
const edad: number = 28;
const esActivo: boolean = true;
const nulo: null = null;
const indefinido: undefined = undefined;

// TypeScript infiere el tipo — no siempre necesitas anotarlo
const ciudad = "Madrid"; // TypeScript sabe que es string

// ── FUNCIONES TIPADAS ────────────────────
function saludar(nombre: string): string {
  return \`Hola, \${nombre}\`;
}

// Parámetro opcional con ?
function crearUrl(base: string, path?: string): string {
  return path ? \`\${base}/\${path}\` : base;
}

// ── ARRAYS Y OBJETOS ─────────────────────
const numeros: number[] = [1, 2, 3];
const nombres: Array<string> = ["Ana", "Luis"]; // sintaxis alternativa

// Tipo objeto inline
const usuario: { nombre: string; edad: number; email?: string } = {
  nombre: "Luis",
  edad: 25,
};

// ── any, unknown, never ──────────────────
let cualquierCosa: any = "texto"; // ❌ evitar — desactiva el tipado
cualquierCosa = 42; // sin error, pero perdiste type safety

let seguro: unknown = "texto";    // ✅ mejor que any
if (typeof seguro === "string") {
  console.log(seguro.toUpperCase()); // ahora TypeScript sabe que es string
}

function fallar(mensaje: string): never { // never: nunca retorna
  throw new Error(mensaje);
}`,
      practicalTips: [
        "Activa strict: true en tsconfig.json desde el principio. Es más difícil activarlo después.",
        "Deja que TypeScript infiera los tipos cuando puede. Solo anota explícitamente cuando la inferencia es incorrecta o poco clara.",
        "Nunca uses any. Si necesitas flexibilidad, usa unknown y luego narrowing con typeof o instanceof.",
        "Los tipos son solo en tiempo de compilación — no existen en el JavaScript final.",
      ],
      commonMistakes: [
        "Usar any para escapar de errores de tipo — el tipo correcto es unknown o un tipo específico.",
        "Anotar todo explícitamente incluso cuando TypeScript puede inferirlo — código más verboso sin beneficio.",
        "Confundir type assertions (as Type) con type narrowing. Las assertions son una declaración al compilador, no una conversión real.",
      ],
      resources: [
        { title: "Documentación oficial TypeScript", url: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html", type: "doc" },
        { title: "TypeScript Playground", url: "https://www.typescriptlang.org/play", type: "article" },
      ],
    },

    {
      name: "Interfaces y type aliases",
      slug: "ts-interfaces",
      level: "BEGINNER" as const,
      subjectId: typescript.id,
      description: "Las interfaces y type aliases definen la forma de los objetos en TypeScript. Son contratos que especifican qué propiedades y métodos debe tener un objeto.",
      whyMatters: "Modelar tus datos correctamente con interfaces hace que TypeScript te ayude a detectar errores cuando accedes a propiedades que no existen o pasas el tipo de dato incorrecto.",
      explanation: `Una interfaz es como un formulario en blanco que defines: especifica exactamente qué campos tiene y de qué tipo son. Cualquier objeto que quieras que "sea" ese tipo debe tener esos campos.

**Interface vs Type**: 
- Las interfaces son extensibles (pueden crecer con declaration merging)
- Los type aliases son más flexibles (pueden ser union types, tipos primitivos, etc.)
- En la práctica: usa interface para objetos/clases, type para todo lo demás`,
      codeExample: `// ── INTERFACE ────────────────────────────
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number;           // propiedad opcional
  readonly createdAt: Date; // solo lectura — no se puede modificar
}

// Uso
const user: Usuario = {
  id: 1,
  nombre: "Ana",
  email: "ana@email.com",
  createdAt: new Date(),
};

// ── EXTENSIÓN DE INTERFACES ───────────────
interface Empleado extends Usuario {
  empresa: string;
  salario: number;
}

// ── TYPE ALIAS ────────────────────────────
type ID = string | number; // union type — no se puede hacer con interface
type Coordenadas = { lat: number; lng: number };
type NombreCompleto = string; // alias para un primitivo

// Mejor para funciones
type HandlerClick = (event: MouseEvent) => void;

// ── INTERSECTION TYPES ────────────────────
type Admin = Usuario & { permisos: string[] }; // combina dos tipos

// ── INTERFACE CON MÉTODOS ─────────────────
interface Repositorio<T> {
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}`,
      practicalTips: [
        "Usa interface para describir la forma de objetos y clases. Usa type para unions, intersections y aliases.",
        "Los nombres de interfaces suelen ser PascalCase: Usuario, ProductoDTO, ApiResponse.",
        "No pongas la I de prefijo (IUsuario) — es una convención antigua que TypeScript mismo no recomienda.",
        "Para las respuestas de API, crea interfaces que reflejen exactamente lo que devuelve el backend.",
      ],
      commonMistakes: [
        "Crear interfaces gigantes en lugar de componerlas desde interfaces más pequeñas.",
        "Usar any como tipo de propiedad dentro de una interface — anula el propósito del tipado.",
        "Declaration merging accidental: si declaras dos interfaces con el mismo nombre en el mismo scope, TypeScript las fusiona.",
      ],
      resources: [
        { title: "TypeScript: Interfaces", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html", type: "doc" },
        { title: "TypeScript: Type Aliases", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases", type: "doc" },
      ],
    },

    {
      name: "Funciones tipadas",
      slug: "ts-functions",
      level: "BEGINNER" as const,
      subjectId: typescript.id,
      description: "TypeScript permite tipar completamente las funciones: parámetros, valores de retorno, callbacks y sobrecargas. Esto garantiza que las funciones se usen correctamente.",
      whyMatters: "Las funciones mal tipadas son la fuente #1 de bugs en proyectos TypeScript. Tipar correctamente los parámetros y retornos te da autocompletado preciso y detección de errores inmediata.",
      explanation: `Tipar funciones en TypeScript tiene tres partes:
1. Los parámetros — qué recibe la función
2. El retorno — qué devuelve
3. El tipo de la función en sí — útil cuando pasas funciones como argumentos`,
      codeExample: `// ── FUNCIONES BÁSICAS ───────────────────
function multiplicar(a: number, b: number): number {
  return a * b;
}

// Arrow function tipada
const dividir = (a: number, b: number): number => a / b;

// Parámetros opcionales y por defecto
function saludar(nombre: string, saludo: string = "Hola"): string {
  return \`\${saludo}, \${nombre}\`;
}

// ── VOID Y NEVER ─────────────────────────
function log(mensaje: string): void {  // no retorna nada útil
  console.log(mensaje);
}

function lanzarError(msg: string): never { // nunca retorna
  throw new Error(msg);
}

// ── TIPOS DE FUNCIÓN ─────────────────────
type Comparador = (a: number, b: number) => number;

const ordenarAscendente: Comparador = (a, b) => a - b;
const ordenarDescendente: Comparador = (a, b) => b - a;

[3, 1, 4, 1, 5].sort(ordenarAscendente); // [1, 1, 3, 4, 5]

// ── FUNCIONES GENÉRICAS ───────────────────
function primero<T>(arr: T[]): T | undefined {
  return arr[0];
}

const primerNumero = primero([1, 2, 3]);       // tipo: number | undefined
const primerNombre = primero(["Ana", "Luis"]);  // tipo: string | undefined

// ── OVERLOADS ────────────────────────────
function formatear(valor: string): string;
function formatear(valor: number): string;
function formatear(valor: string | number): string {
  if (typeof valor === "number") return valor.toFixed(2);
  return valor.trim();
}`,
      practicalTips: [
        "Anota siempre el tipo de retorno en funciones públicas de librerías o utilidades. En funciones internas, la inferencia suele ser suficiente.",
        "El tipo void significa 'no me importa el retorno'. Un callback tipado como void puede devolver algo — simplemente se ignora.",
        "Usa tipos de función (type Callback = () => void) cuando el mismo tipo de función se repite en múltiples lugares.",
      ],
      commonMistakes: [
        "Olvidar que async functions siempre devuelven Promise<T>, no T directamente.",
        "Usar any como tipo de parámetro de callback cuando el tipo es desconocido — usa un genérico <T> en su lugar.",
      ],
      resources: [
        { title: "TypeScript: Funciones", url: "https://www.typescriptlang.org/docs/handbook/2/functions.html", type: "doc" },
      ],
    },

    {
      name: "Generics",
      slug: "ts-generics",
      level: "INTERMEDIATE" as const,
      subjectId: typescript.id,
      description: "Los generics permiten escribir código que funciona con múltiples tipos sin perder type safety. Son como parámetros para tipos, igual que los parámetros son valores para funciones.",
      whyMatters: "Sin generics, tendrías que duplicar funciones para cada tipo o usar any. Los generics son la herramienta que hace que las librerías de TypeScript sean tan potentes y seguras.",
      explanation: `Los generics son como plantillas. Imagina una caja: puedes tener una caja de manzanas, una de libros o una de herramientas. La caja en sí es genérica — solo el contenido varía.

Con generics escribes la caja una vez (<T>) y TypeScript se encarga de que cada instancia sea consistente con su tipo específico.`,
      codeExample: `// ── FUNCIÓN GENÉRICA BÁSICA ─────────────
function identidad<T>(valor: T): T {
  return valor;
}

identidad<string>("hola");  // tipo: string
identidad<number>(42);      // tipo: number
identidad("hola");          // TypeScript infiere: string

// ── GENÉRICO CON CONSTRAINT ──────────────
// T debe tener al menos la propiedad length
function logLongitud<T extends { length: number }>(valor: T): T {
  console.log(valor.length);
  return valor;
}

logLongitud("hola");        // ✅ string tiene length
logLongitud([1, 2, 3]);     // ✅ array tiene length
// logLongitud(42);         // ❌ number no tiene length

// ── GENÉRICO EN INTERFACES ───────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Reutilizable para cualquier tipo de respuesta
type UsuariosResponse = ApiResponse<Usuario[]>;
type ProductoResponse = ApiResponse<Producto>;

// ── MÚLTIPLES TIPOS GENÉRICOS ─────────────
function mapObjeto<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (valor: V) => R
): Record<K, R> {
  const resultado = {} as Record<K, R>;
  for (const clave in obj) {
    resultado[clave] = fn(obj[clave]);
  }
  return resultado;
}

// ── CASO PRÁCTICO: REPOSITORIO GENÉRICO ──
class Repositorio<T extends { id: number }> {
  private items: T[] = [];

  guardar(item: T): T {
    this.items.push(item);
    return item;
  }

  buscarPorId(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}

const repoUsuarios = new Repositorio<Usuario>();`,
      practicalTips: [
        "Usa generics cuando una función o clase funciona igual independientemente del tipo que maneje.",
        "Empieza con nombres descriptivos para los generics: <TItem>, <TResponse>, <TError> en lugar de solo <T> cuando hay múltiples.",
        "Los constraints (extends) son poderosos — limita el generic al mínimo necesario.",
      ],
      commonMistakes: [
        "Usar generics cuando any o union types son más apropiados — los generics son para cuando el tipo de retorno DEPENDE del tipo de entrada.",
        "Constraints demasiado restrictivos que convierten el genérico en un tipo específico.",
      ],
      resources: [
        { title: "TypeScript: Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html", type: "doc" },
      ],
    },

    {
      name: "Utility types",
      slug: "ts-utility-types",
      level: "INTERMEDIATE" as const,
      subjectId: typescript.id,
      description: "TypeScript incluye utility types built-in que transforman tipos existentes: Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType y más.",
      whyMatters: "Los utility types eliminan la necesidad de duplicar definiciones de tipos. Con ellos derivas nuevos tipos a partir de los que ya tienes, manteniendo una única fuente de verdad.",
      explanation: `Los utility types son como herramientas de transformación para tus tipos. En lugar de definir un tipo "UsuarioSinId" desde cero, usas Omit<Usuario, 'id'>. Cuando Usuario cambie, UsuarioSinId se actualiza automáticamente.`,
      codeExample: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  edad: number;
}

// Partial — todas las propiedades opcionales
type ActualizarUsuario = Partial<Usuario>;
// { id?: number; nombre?: string; email?: string; ... }

// Required — todas las propiedades obligatorias
type UsuarioCompleto = Required<Usuario>;

// Pick — seleccionar propiedades específicas
type UsuarioPublico = Pick<Usuario, "id" | "nombre">;
// { id: number; nombre: string }

// Omit — excluir propiedades
type UsuarioSinPassword = Omit<Usuario, "password">;
// { id: number; nombre: string; email: string; edad: number }

// Readonly — todas solo lectura
type UsuarioInmutable = Readonly<Usuario>;

// Record — tipo de objeto con clave/valor
type RolPermisos = Record<"admin" | "user" | "guest", string[]>;
const permisos: RolPermisos = {
  admin: ["leer", "escribir", "eliminar"],
  user: ["leer", "escribir"],
  guest: ["leer"],
};

// ReturnType — tipo de retorno de una función
async function fetchUsuario(): Promise<Usuario> { /* ... */ return {} as Usuario; }
type ResultadoFetch = Awaited<ReturnType<typeof fetchUsuario>>;
// Usuario

// Parameters — tipos de los parámetros de una función
function crearPost(titulo: string, contenido: string, autorId: number) {}
type ParamsPost = Parameters<typeof crearPost>;
// [titulo: string, contenido: string, autorId: number]`,
      practicalTips: [
        "Omit<T, K> y Pick<T, K> son los más usados en la práctica — especialmente para DTOs de API.",
        "Usa Partial<T> para tipos de actualización/PATCH donde no todos los campos son requeridos.",
        "Combina utility types: Readonly<Partial<Usuario>> — usuario parcialmente opcional e inmutable.",
      ],
      commonMistakes: [
        "Crear tipos manualmente cuando un utility type existente lo haría de forma más mantenible.",
        "No conocer Awaited<T> para extraer el tipo de una Promesa — muy útil con funciones async.",
      ],
      resources: [
        { title: "TypeScript: Utility Types", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html", type: "doc" },
      ],
    },

    {
      name: "Decoradores",
      slug: "ts-decorators",
      level: "ADVANCED" as const,
      subjectId: typescript.id,
      description: "Los decoradores son funciones especiales que modifican clases, métodos, propiedades y parámetros. Son ampliamente usados en frameworks como Angular y NestJS.",
      whyMatters: "En NestJS y Angular, los decoradores son fundamentales: @Controller, @Injectable, @Get, @Column. Entenderlos te permite usar estos frameworks correctamente y crear los tuyos propios.",
      explanation: `Un decorador es una función que envuelve a otra para modificar su comportamiento sin cambiarla directamente. Piénsalo como un regalo envuelto: el regalo (la clase/método) no cambia, pero el papel de regalo (decorador) añade algo alrededor.`,
      codeExample: `// ── DECORADOR DE CLASE ───────────────────
function Serializable(constructor: Function) {
  constructor.prototype.serialize = function() {
    return JSON.stringify(this);
  };
}

@Serializable
class Usuario {
  constructor(public nombre: string, public email: string) {}
}

const user = new Usuario("Ana", "ana@email.com");
(user as any).serialize(); // '{"nombre":"Ana","email":"ana@email.com"}'

// ── DECORADOR DE MÉTODO ───────────────────
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Llamando \${key} con:\`, args);
    const resultado = original.apply(this, args);
    console.log(\`\${key} retornó:\`, resultado);
    return resultado;
  };
  return descriptor;
}

class CalculadoraService {
  @Log
  sumar(a: number, b: number): number {
    return a + b;
  }
}

// ── EN NESTJS (uso real) ──────────────────
// @Controller('usuarios')
// export class UsuariosController {
//   constructor(private readonly usuariosService: UsuariosService) {}
//
//   @Get(':id')
//   @UseGuards(AuthGuard)
//   findOne(@Param('id') id: string): Promise<Usuario> {
//     return this.usuariosService.findOne(+id);
//   }
// }`,
      practicalTips: [
        "Habilita experimentalDecorators: true y emitDecoratorMetadata: true en tsconfig para usar decoradores.",
        "Los decoradores stage 3 (TC39) cambiaron la API respecto a los experimentales de TypeScript. Verifica qué versión usa tu framework.",
        "En NestJS y Angular los decoradores ya están implementados — no necesitas crearlos, solo entender cómo funcionan.",
      ],
      commonMistakes: [
        "Confundir los decoradores experimentales de TypeScript con el estándar de ECMAScript — tienen APIs diferentes.",
        "Crear decoradores con efectos secundarios complejos — dificultan el testing y el debugging.",
      ],
      resources: [
        { title: "TypeScript: Decorators", url: "https://www.typescriptlang.org/docs/handbook/decorators.html", type: "doc" },
        { title: "NestJS: Controllers", url: "https://docs.nestjs.com/controllers", type: "doc" },
      ],
    },

    {
      name: "TypeScript con React",
      slug: "ts-react",
      level: "INTERMEDIATE" as const,
      subjectId: typescript.id,
      description: "TypeScript en React te permite tipar props, state, eventos, refs y hooks personalizados para detectar errores en tiempo de desarrollo y tener un mejor autocompletado.",
      whyMatters: "React + TypeScript es el stack más usado en el mercado para frontend profesional. Tipar correctamente tus componentes elimina una clase entera de bugs y hace el código autodocumentado.",
      explanation: `En React con TypeScript, lo más importante es tipar correctamente las props de cada componente. El resto (state, eventos) TypeScript suele inferirlo bien si las props están bien definidas.`,
      codeExample: `import React, { useState, useRef, useCallback } from "react";

// ── TIPAR PROPS ──────────────────────────
interface BotonProps {
  label: string;
  onClick: () => void;
  variante?: "primario" | "secundario";
  deshabilitado?: boolean;
  children?: React.ReactNode; // para componentes que aceptan children
}

const Boton: React.FC<BotonProps> = ({
  label,
  onClick,
  variante = "primario",
  deshabilitado = false,
}) => (
  <button
    onClick={onClick}
    disabled={deshabilitado}
    className={\`btn btn-\${variante}\`}
  >
    {label}
  </button>
);

// ── TIPAR STATE ──────────────────────────
interface Usuario { id: number; nombre: string; }

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(false);

  // ── TIPAR EVENTOS ────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // ── TIPAR REFS ───────────────────────
  const inputRef = useRef<HTMLInputElement>(null);

  // ── TIPAR CALLBACKS ──────────────────
  const handleClick = useCallback((id: number): void => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  }, []);

  return <div>{/* ... */}</div>;
}

// ── HOOK PERSONALIZADO TIPADO ─────────────
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // ... implementación

  return { data, error, loading };
}

// Uso — TypeScript infiere el tipo
const { data } = useFetch<Usuario[]>("/api/usuarios");`,
      practicalTips: [
        "Prefiere definir el tipo de props como interface sobre React.FC — da más control sobre el tipo de retorno.",
        "Para eventos, React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>, etc.",
        "useRef<HTMLElement>(null) para refs del DOM. El null inicial es necesario para elementos del DOM.",
        "Los hooks personalizados tipados con generics son extremadamente poderosos — invierte tiempo en aprenderlos.",
      ],
      commonMistakes: [
        "Usar any para las props de componentes — derrota el propósito de TypeScript en React.",
        "Olvidar que React.FC añade implícitamente children como prop opcional — a veces no es lo que quieres.",
        "No tipar los eventos correctamente — e: any en lugar de e: React.ChangeEvent<HTMLInputElement>.",
      ],
      resources: [
        { title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/", type: "article" },
        { title: "TypeScript con React — documentación oficial", url: "https://react.dev/learn/typescript", type: "doc" },
      ],
    },

    {
      name: "Configuración avanzada de tsconfig",
      slug: "ts-config",
      level: "ADVANCED" as const,
      subjectId: typescript.id,
      description: "El archivo tsconfig.json controla cómo TypeScript compila tu proyecto. Una configuración correcta determina qué errores atrapa y cómo genera el JavaScript de salida.",
      whyMatters: "Una mala configuración de TypeScript puede silenciar errores que deberían detectarse. Saber configurar tsconfig correctamente es la diferencia entre aprovechar TypeScript al máximo o tenerlo de decoración.",
      explanation: `tsconfig.json es el archivo de configuración del compilador de TypeScript. Las opciones más críticas son las de strictness — que determinan qué tan estricto es el compilador al verificar tu código.`,
      codeExample: `// tsconfig.json para proyecto Node.js/React en producción
{
  "compilerOptions": {
    // ── TARGET Y MÓDULOS ──────────────────
    "target": "ES2022",          // versión de JS generada
    "module": "CommonJS",        // para Node.js (ESNext para browser)
    "lib": ["ES2022"],           // APIs disponibles

    // ── STRICTNESS — activa todo ──────────
    "strict": true,              // activa todas las opciones de abajo
    // "noImplicitAny": true,    // incluido en strict
    // "strictNullChecks": true, // incluido en strict
    // "strictFunctionTypes": true,

    // ── EXTRAS RECOMENDADOS ───────────────
    "noUnusedLocals": true,      // error en variables no usadas
    "noUnusedParameters": true,  // error en parámetros no usados
    "noImplicitReturns": true,   // todas las rutas deben retornar
    "exactOptionalPropertyTypes": true,

    // ── OUTPUT ────────────────────────────
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,           // para debugging

    // ── PATHS (aliases) ───────────────────
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],        // import desde '@/utils' en lugar de '../../utils'
      "@/components/*": ["./src/components/*"]
    },

    // ── INTEROP ───────────────────────────
    "esModuleInterop": true,     // mejor compatibilidad con módulos CommonJS
    "resolveJsonModule": true,   // permite importar .json
    "skipLibCheck": true         // no verificar .d.ts de node_modules
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`,
      practicalTips: [
        "Siempre empieza con strict: true. Mucho más difícil añadirlo después a un proyecto existente.",
        "Configura paths para evitar imports con '../../../'. Hace el código más limpio y fácil de mover archivos.",
        "sourceMap: true es esencial para debuggear — mapea el JS compilado de vuelta al TS original.",
        "Usa diferentes tsconfig para diferentes entornos: tsconfig.json base, tsconfig.build.json para producción.",
      ],
      commonMistakes: [
        "No activar strict: true — pierdes la mayoría de los beneficios de TypeScript.",
        "Incluir dist/ o node_modules/ en el include del tsconfig — TS intentará compilar código ya compilado.",
        "Usar allowJs: true sin entender que mezcla JS y TS con tipado parcial.",
      ],
      resources: [
        { title: "TypeScript: tsconfig reference", url: "https://www.typescriptlang.org/tsconfig", type: "doc" },
        { title: "tsconfig.json de Matt Pocock", url: "https://www.totaltypescript.com/tsconfig-cheat-sheet", type: "article" },
      ],
    },

    // ════════════════════════════════════════
    // REACT
    // ════════════════════════════════════════
    {
      name: "Componentes y JSX",
      slug: "react-components",
      level: "BEGINNER" as const,
      subjectId: react.id,
      description: "Los componentes son los bloques de construcción de React. Cada componente es una función que describe una parte de la UI y devuelve JSX — una sintaxis parecida a HTML que se compila a JavaScript.",
      whyMatters: "React se basa completamente en componentes. Todo lo que ves en una app React — botones, formularios, páginas — es un componente. Entender JSX y componentes es el primer paso obligatorio.",
      explanation: `Piensa en los componentes como piezas de LEGO: cada uno representa una parte de la interfaz. Los combinas para construir pantallas completas. Un componente de botón puede usarse 50 veces en la app.

JSX parece HTML pero tiene diferencias importantes: las propiedades usan camelCase, class se escribe className, y todo JavaScript va entre llaves {}.`,
      codeExample: `// ── COMPONENTE BÁSICO ───────────────────
function Saludo({ nombre }: { nombre: string }) {
  return <h1>Hola, {nombre}!</h1>;
}

// ── JSX: DIFERENCIAS CON HTML ────────────
function Tarjeta() {
  const esActivo = true;
  const estilos = { color: "blue", fontSize: 16 }; // camelCase

  return (
    <div
      className="tarjeta"          // class → className
      style={estilos}              // objeto JS, no string CSS
    >
      {/* Esto es un comentario en JSX */}
      <p>{esActivo ? "Activo" : "Inactivo"}</p>   {/* expresiones JS */}
      {esActivo && <span>✓</span>}                 {/* renderizado condicional */}
    </div>
  );
}

// ── LISTA DE COMPONENTES ─────────────────
interface Producto { id: number; nombre: string; precio: number; }

function ListaProductos({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((producto) => (   // key es obligatoria en listas
        <li key={producto.id}>
          {producto.nombre} — ${producto.precio}
        </li>
      ))}
    </ul>
  );
}

// ── COMPOSICIÓN ──────────────────────────
function App() {
  const productos = [
    { id: 1, nombre: "Laptop", precio: 999 },
    { id: 2, nombre: "Mouse", precio: 29 },
  ];

  return (
    <main>
      <Saludo nombre="Developer" />
      <Tarjeta />
      <ListaProductos productos={productos} />
    </main>
  );
}`,
      practicalTips: [
        "Un componente = una responsabilidad. Si tu componente hace demasiado, divídelo.",
        "Los nombres de componentes siempre en PascalCase: MiComponente, no micomponente.",
        "Extrae componentes cuando uses el mismo JSX en dos lugares, o cuando un componente se vuelve muy largo.",
        "key en listas debe ser estable y único — usa IDs de la base de datos, nunca el índice del array.",
      ],
      commonMistakes: [
        "Usar el índice del array como key — causa bugs visuales cuando el orden de la lista cambia.",
        "Retornar múltiples elementos sin un wrapper — envuelve en <> </> (Fragment) si no quieres div extra.",
        "Modificar JSX directamente como si fuera HTML — recuerda que JSX es JavaScript, no HTML.",
        "Olvidar que las funciones de componentes deben empezar con mayúscula para que React las trate como componentes.",
      ],
      resources: [
        { title: "React: Tu primer componente", url: "https://react.dev/learn/your-first-component", type: "doc" },
        { title: "React: JSX", url: "https://react.dev/learn/writing-markup-with-jsx", type: "doc" },
      ],
    },

    {
      name: "Props y estado con useState",
      slug: "react-state",
      level: "BEGINNER" as const,
      subjectId: react.id,
      description: "Las props son la forma de pasar datos de componente padre a hijo. El estado (useState) permite que un componente recuerde y actualice información que cambia con el tiempo.",
      whyMatters: "Props y state son los dos mecanismos fundamentales de React para manejar datos. Sin entenderlos correctamente, no puedes construir ninguna interfaz interactiva.",
      explanation: `**Props** son como parámetros de función: el padre decide qué envía, el hijo lo recibe y lo usa pero no lo puede cambiar.

**State** es la memoria interna del componente. Cuando el state cambia, React re-renderiza el componente automáticamente mostrando los datos actualizados.

La regla de oro: los datos fluyen hacia abajo (de padre a hijo con props). Los eventos fluyen hacia arriba (el hijo llama funciones que el padre le pasó).`,
      codeExample: `import { useState } from "react";

// ── PROPS ────────────────────────────────
interface BotonContadorProps {
  titulo: string;
  colorInicial?: string;
}

// ── STATE: useState ───────────────────────
function BotonContador({ titulo, colorInicial = "blue" }: BotonContadorProps) {
  // useState devuelve [valorActual, funcionParaCambiarlo]
  const [contador, setContador] = useState(0);
  const [color, setColor] = useState(colorInicial);

  return (
    <div>
      <h2>{titulo}</h2>
      <p style={{ color }}>Clicks: {contador}</p>
      <button onClick={() => setContador(prev => prev + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContador(0)}>
        Reset
      </button>
    </div>
  );
}

// ── ESTADO COMPARTIDO: ELEVAR EL ESTADO ──
// Cuando dos componentes necesitan el mismo estado,
// lo mueves al padre común y lo bajas por props

function Padre() {
  const [usuario, setUsuario] = useState<string>("");

  return (
    <>
      <Input valor={usuario} onChange={setUsuario} />
      <Vista nombre={usuario} />
    </>
  );
}

// El hijo recibe el valor y una función para actualizarlo
function Input({ valor, onChange }: { valor: string; onChange: (v: string) => void }) {
  return (
    <input
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tu nombre"
    />
  );
}

function Vista({ nombre }: { nombre: string }) {
  return <p>Hola, {nombre || "extraño"}!</p>;
}`,
      practicalTips: [
        "Usa la forma funcional del setter cuando el nuevo estado depende del anterior: setCount(prev => prev + 1).",
        "No modifiques el estado directamente (state.propiedad = valor). Siempre usa el setter.",
        "Las actualizaciones de estado en React son asíncronas — no esperes que el valor cambie inmediatamente después del setter.",
        "Si necesitas estado compartido entre componentes hermanos, elévalo al componente padre más cercano.",
      ],
      commonMistakes: [
        "Mutar el estado directamente: state.items.push(item) — React no detecta el cambio. Usa setItems([...items, item]).",
        "Crear demasiado estado local cuando puede derivarse de otro: si tienes nombre y apellido como state, nombreCompleto no debe ser state.",
        "Olvidar que useState no fusiona objetos como setState en class components — debes hacer el merge manualmente.",
      ],
      resources: [
        { title: "React: Estado: la memoria de un componente", url: "https://react.dev/learn/state-a-components-memory", type: "doc" },
        { title: "React: Pasar props a un componente", url: "https://react.dev/learn/passing-props-to-a-component", type: "doc" },
      ],
    },

    {
      name: "useEffect y ciclo de vida",
      slug: "react-effects",
      level: "BEGINNER" as const,
      subjectId: react.id,
      description: "useEffect permite sincronizar tu componente con sistemas externos: APIs, el DOM, suscripciones, timers. Se ejecuta después de cada render, o solo cuando ciertas dependencias cambian.",
      whyMatters: "useEffect es el hook más poderoso y más mal usado de React. Entenderlo correctamente es crucial para evitar bugs sutiles como bucles infinitos, peticiones duplicadas o memory leaks.",
      explanation: `useEffect tiene tres formas según el array de dependencias:
1. **Sin array**: se ejecuta después de CADA render
2. **Array vacío []**: se ejecuta solo al montar el componente (como componentDidMount)
3. **Array con valores**: se ejecuta cuando esos valores cambian

La función de limpieza (cleanup) que puede devolver se ejecuta antes del siguiente efecto y al desmontar — para limpiar suscripciones, timers, etc.`,
      codeExample: `import { useState, useEffect } from "react";

// ── CASO 1: Petición al montar ────────────
function PerfilUsuario({ userId }: { userId: number }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false; // evita actualizar estado en componente desmontado

    async function cargar() {
      setCargando(true);
      try {
        const res = await fetch(\`/api/usuarios/\${userId}\`);
        const data = await res.json();
        if (!cancelado) setUsuario(data);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargar();

    return () => { cancelado = true; }; // cleanup
  }, [userId]); // se re-ejecuta si userId cambia

  if (cargando) return <p>Cargando...</p>;
  return <div>{usuario?.nombre}</div>;
}

// ── CASO 2: Suscripción con cleanup ──────
function RelojEnTiempoReal() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Cleanup: limpia el timer al desmontar
    return () => clearInterval(intervalo);
  }, []); // solo al montar

  return <p>{hora.toLocaleTimeString()}</p>;
}

// ── CASO 3: Sincronizar título ────────────
function Pagina({ titulo }: { titulo: string }) {
  useEffect(() => {
    document.title = titulo; // efecto secundario
    return () => { document.title = "Mi App"; }; // restaurar al desmontar
  }, [titulo]);

  return <h1>{titulo}</h1>;
}`,
      practicalTips: [
        "Siempre incluye en el array de dependencias TODAS las variables que usas dentro del efecto. ESLint con exhaustive-deps te ayuda.",
        "Para peticiones HTTP en componentes, considera usar TanStack Query en lugar de useEffect — maneja caching, loading y error automáticamente.",
        "Un efecto que hace fetch en useEffect y no tiene cleanup puede actualizar el estado después de desmontar — siempre usa una variable de cancelación.",
        "useEffect no es para sincronizar estado derivado — usa useMemo o calcula directamente en el render.",
      ],
      commonMistakes: [
        "Array de dependencias vacío cuando el efecto usa props o state — el efecto verá valores obsoletos (stale closure).",
        "Actualizar state dentro de un efecto sin condición — causa un bucle infinito si ese state está en las dependencias.",
        "Hacer fetch directo sin manejo de cleanup — race conditions cuando el usuario navega rápido.",
        "Poner objetos o arrays en el array de dependencias — son nuevos en cada render y el efecto corre siempre.",
      ],
      resources: [
        { title: "React: Sincronizar con efectos", url: "https://react.dev/learn/synchronizing-with-effects", type: "doc" },
        { title: "React: Puede que no necesites un efecto", url: "https://react.dev/learn/you-might-not-need-an-effect", type: "doc" },
      ],
    },

    {
      name: "Manejo de formularios",
      slug: "react-forms",
      level: "INTERMEDIATE" as const,
      subjectId: react.id,
      description: "Los formularios en React pueden ser controlados (el estado de React es la fuente de verdad) o no controlados (el DOM mantiene el estado). React Hook Form con Zod es el estándar profesional.",
      whyMatters: "Los formularios son uno de los puntos más complejos de React. Manejarlos incorrectamente genera re-renders innecesarios y código difícil de mantener. React Hook Form resuelve esto elegantemente.",
      explanation: `Un formulario controlado significa que cada cambio en un input actualiza el estado de React y React re-renderiza. Funciona bien para formularios simples, pero es ineficiente para formularios grandes.

React Hook Form usa una estrategia de "uncontrolled with ref" internamente — solo re-renderiza cuando es necesario y te da toda la validación sin el boilerplate.`,
      codeExample: `import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Define el schema de validación
const esquemaRegistro = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmarPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmarPassword,
  { message: "Las contraseñas no coinciden", path: ["confirmarPassword"] }
);

type FormularioRegistro = z.infer<typeof esquemaRegistro>;

// 2. Componente del formulario
function FormularioRegistroComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormularioRegistro>({
    resolver: zodResolver(esquemaRegistro),
  });

  const onSubmit = async (datos: FormularioRegistro) => {
    try {
      await fetch("/api/registro", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" },
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("nombre")} placeholder="Nombre" />
        {errors.nombre && <p>{errors.nombre.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("password")} type="password" placeholder="Contraseña" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}`,
      practicalTips: [
        "Usa React Hook Form + Zod para cualquier formulario con validación. La combinación es el estándar de la industria.",
        "z.infer<typeof schema> genera automáticamente el tipo TypeScript desde el schema Zod — evita duplicación.",
        "El spread {...register('campo')} conecta el input con React Hook Form — no lo olvides.",
        "isSubmitting de formState deshabilita el botón automáticamente durante el submit — úsalo siempre.",
      ],
      commonMistakes: [
        "Crear estado useState para cada campo del formulario — es lo que React Hook Form elimina.",
        "No usar zodResolver y hacer la validación manualmente — duplicas lógica.",
        "Olvidar el type='submit' en el botón — el formulario no se enviará.",
      ],
      resources: [
        { title: "React Hook Form — documentación oficial", url: "https://react-hook-form.com/get-started", type: "doc" },
        { title: "Zod — documentación oficial", url: "https://zod.dev/", type: "doc" },
      ],
    },

    {
      name: "Context API y useContext",
      slug: "react-context",
      level: "INTERMEDIATE" as const,
      subjectId: react.id,
      description: "Context API permite compartir datos entre componentes sin pasar props manualmente por cada nivel del árbol. Es ideal para datos globales como usuario autenticado, tema o idioma.",
      whyMatters: "Sin Context, tendrías que pasar el usuario autenticado como prop por todos los componentes intermedios aunque no lo necesiten (prop drilling). Context resuelve esto elegantemente.",
      explanation: `Context funciona como una "transmisión de radio": el Provider emite la señal y cualquier componente descendiente puede "sintonizarla" con useContext, sin importar qué tan profundo esté en el árbol.

Importante: cuando el valor del Context cambia, TODOS los componentes que usan ese Context se re-renderizan. Por eso, separa contextos por dominio (AuthContext, ThemeContext) y no pongas todo en uno.`,
      codeExample: `import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define el tipo del contexto
interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// 2. Crea el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Crea el Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setUsuario(data.usuario);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      login,
      logout,
      isAuthenticated: !!usuario,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Hook personalizado para usar el contexto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

// 5. Uso en cualquier componente
function NavBar() {
  const { usuario, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Hola, {usuario?.nombre}</span>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <a href="/login">Iniciar sesión</a>
      )}
    </nav>
  );
}`,
      practicalTips: [
        "Crea siempre un hook personalizado (useAuth, useTheme) en lugar de usar useContext directamente — encapsula el error check.",
        "Separa contextos por dominio. No pongas todo en un AppContext gigante.",
        "Para estado global complejo (carrito, filtros, múltiples estados relacionados), considera Zustand en lugar de Context.",
        "Context no es un reemplazo del estado del servidor — usa TanStack Query para datos de API.",
      ],
      commonMistakes: [
        "Un Context con demasiados datos — cualquier cambio re-renderiza todos los consumidores.",
        "Usar Context para datos de servidor en lugar de una librería de fetching como TanStack Query.",
        "No memoizar el value del Provider — crea un nuevo objeto en cada render y re-renderiza todos los consumidores.",
      ],
      resources: [
        { title: "React: Pasar datos en profundidad con Context", url: "https://react.dev/learn/passing-data-deeply-with-context", type: "doc" },
      ],
    },

    {
      name: "Custom hooks",
      slug: "react-custom-hooks",
      level: "INTERMEDIATE" as const,
      subjectId: react.id,
      description: "Los hooks personalizados son funciones que extraen lógica stateful de los componentes para reutilizarla. Cualquier función que empiece con 'use' y use hooks de React es un custom hook.",
      whyMatters: "Los custom hooks son el mecanismo principal de reutilización de lógica en React moderno. Te permiten abstraer comportamientos complejos (fetch, formularios, timers, media queries) en una API limpia.",
      explanation: `Antes de los hooks, la reutilización de lógica stateful requería patrones complejos como HOCs o render props. Los custom hooks lo simplifican: extraes la lógica a una función y la llamas desde donde la necesites.

La regla: si en dos componentes diferentes ves el mismo bloque de useState/useEffect, ese código merece ser un custom hook.`,
      codeExample: `// ── useFetch — peticiones HTTP reutilizables ──
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);

    fetch(url)
      .then(res => { if (!res.ok) throw new Error(\`HTTP \${res.status}\`); return res.json(); })
      .then(data => { if (!cancelado) setData(data); })
      .catch(err => { if (!cancelado) setError(err); })
      .finally(() => { if (!cancelado) setLoading(false); });

    return () => { cancelado = true; };
  }, [url]);

  return { data, loading, error };
}

// ── useLocalStorage — persistir estado ───
function useLocalStorage<T>(clave: string, valorInicial: T) {
  const [estado, setEstado] = useState<T>(() => {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  const setValue = (valor: T | ((prev: T) => T)) => {
    const nuevoValor = valor instanceof Function ? valor(estado) : valor;
    setEstado(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  };

  return [estado, setValue] as const;
}

// ── useDebounce — debounce de valores ────
function useDebounce<T>(valor: T, delay: number): T {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorDebounced(valor), delay);
    return () => clearTimeout(timer);
  }, [valor, delay]);

  return valorDebounced;
}

// ── Uso en componentes ────────────────────
function BuscadorProductos() {
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 300);
  const { data, loading } = useFetch<Producto[]>(\`/api/productos?q=\${busquedaDebounced}\`);
  const [favoritos, setFavoritos] = useLocalStorage<number[]>("favoritos", []);

  return (/* ... */);
}`,
      practicalTips: [
        "El nombre debe empezar con 'use' — no es solo convención, React lo usa para aplicar las reglas de hooks.",
        "Un custom hook puede devolver cualquier cosa: un valor, un array, un objeto, una función.",
        "Librerías como VueUse (para Vue) o react-use/usehooks.com tienen docenas de hooks listos — úsalos antes de reinventar la rueda.",
        "Los custom hooks hacen el testing más fácil — puedes testear la lógica del hook de forma aislada.",
      ],
      commonMistakes: [
        "Crear custom hooks demasiado genéricos que hacen demasiado — mantén el principio de una responsabilidad.",
        "Llamar hooks dentro de condiciones o loops — viola las reglas de hooks.",
        "No retornar las funciones de limpieza en useEffect dentro del custom hook.",
      ],
      resources: [
        { title: "React: Reutilizando lógica con custom hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks", type: "doc" },
        { title: "usehooks.com — colección de custom hooks", url: "https://usehooks.com/", type: "article" },
      ],
    },

    {
      name: "React Router y navegación",
      slug: "react-router",
      level: "INTERMEDIATE" as const,
      subjectId: react.id,
      description: "React Router v6 es la librería estándar para routing en React. Permite crear SPAs con múltiples 'páginas' sin recargar el navegador, usando la URL para determinar qué mostrar.",
      whyMatters: "Sin routing, tu React app es una sola pantalla. Con React Router, creas aplicaciones multi-página con navegación, URLs compartibles, historial de navegación y rutas protegidas.",
      explanation: `En una SPA (Single Page Application), el servidor siempre devuelve el mismo HTML. React Router intercepta los cambios de URL y muestra el componente correspondiente sin hacer peticiones al servidor.

React Router v6 introdujo cambios importantes: useNavigate reemplaza useHistory, las rutas anidadas usan Outlet, y Routes reemplaza Switch.`,
      codeExample: `import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet, Navigate } from "react-router-dom";

// ── CONFIGURACIÓN DE RUTAS ───────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<DetalleProducto />} />

          {/* Rutas protegidas */}
          <Route element={<RutaProtegida />}>
            <Route path="perfil" element={<Perfil />} />
            <Route path="ajustes" element={<Ajustes />} />
          </Route>

          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ── LAYOUT CON OUTLET ────────────────────
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
      <main>
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </main>
    </div>
  );
}

// ── PARÁMETROS DE URL ────────────────────
function DetalleProducto() {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetch<Producto>(\`/api/productos/\${id}\`);
  return <div>{data?.nombre}</div>;
}

// ── NAVEGACIÓN PROGRAMÁTICA ──────────────
function FormularioLogin() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(/* ... */);
    navigate("/perfil", { replace: true }); // replace evita volver al login
  };

  return <button onClick={handleLogin}>Entrar</button>;
}

// ── RUTA PROTEGIDA ────────────────────────
function RutaProtegida() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}`,
      practicalTips: [
        "Usa <Link> en lugar de <a> para navegación interna — Link previene la recarga de página.",
        "Navigate to='/ruta' replace={true} para redirecciones post-login — evita que el usuario pueda volver con el botón atrás.",
        "Nested routes con Outlet son perfectos para layouts compartidos (navbar, sidebar).",
        "useSearchParams es el hook para leer y actualizar los query params de la URL (?tab=perfil&pagina=2).",
      ],
      commonMistakes: [
        "Usar window.location.href para navegar dentro de la app — recarga la página completa.",
        "Olvidar el Outlet en el componente padre de rutas anidadas — las rutas hijas no se renderizan.",
        "No manejar la ruta 404 con path='*' — el usuario ve una pantalla en blanco.",
      ],
      resources: [
        { title: "React Router v6 — documentación oficial", url: "https://reactrouter.com/en/main", type: "doc" },
        { title: "React Router: Tutorial", url: "https://reactrouter.com/en/main/start/tutorial", type: "doc" },
      ],
    },

    {
      name: "Estado global con Zustand",
      slug: "react-zustand",
      level: "INTERMEDIATE" as const,
      subjectId: react.id,
      description: "Zustand es una librería minimalista para estado global en React. Más simple que Redux, más potente que Context para estado complejo.",
      whyMatters: "Cuando múltiples componentes necesitan acceder y modificar el mismo estado (carrito de compras, usuario autenticado, configuración), necesitas gestión de estado global. Zustand es la opción más simple y efectiva.",
      explanation: `Zustand funciona con stores: objetos que contienen el estado y las funciones para modificarlo. Cualquier componente puede suscribirse a un store y solo se re-renderiza cuando las partes que usa cambian.

A diferencia de Context, Zustand no re-renderiza componentes que no usan el estado que cambió.`,
      codeExample: `import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── STORE BÁSICO ─────────────────────────
interface CarritoStore {
  items: ItemCarrito[];
  total: number;
  agregarItem: (producto: Producto) => void;
  eliminarItem: (id: string) => void;
  limpiar: () => void;
}

const useCarrito = create<CarritoStore>()(
  persist( // middleware para persistir en localStorage
    (set, get) => ({
      items: [],
      total: 0,

      agregarItem: (producto) => set((state) => {
        const itemExistente = state.items.find(i => i.id === producto.id);
        const nuevosItems = itemExistente
          ? state.items.map(i =>
              i.id === producto.id
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            )
          : [...state.items, { ...producto, cantidad: 1 }];

        return {
          items: nuevosItems,
          total: nuevosItems.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
        };
      }),

      eliminarItem: (id) => set((state) => {
        const nuevosItems = state.items.filter(i => i.id !== id);
        return {
          items: nuevosItems,
          total: nuevosItems.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
        };
      }),

      limpiar: () => set({ items: [], total: 0 }),
    }),
    { name: "carrito-storage" } // clave en localStorage
  )
);

// ── USO EN COMPONENTES ───────────────────
function IconoCarrito() {
  // Solo suscribe al total — no re-renderiza si cambian los items
  const total = useCarrito((state) => state.total);
  const items = useCarrito((state) => state.items);

  return <span>🛒 {items.length} — ${total.toFixed(2)}</span>;
}

function BotonAgregar({ producto }: { producto: Producto }) {
  const agregarItem = useCarrito((state) => state.agregarItem);

  return (
    <button onClick={() => agregarItem(producto)}>
      Agregar al carrito
    </button>
  );
}`,
      practicalTips: [
        "Usa el selector en useCarrito((state) => state.campo) para suscribirte solo a lo que necesitas — mejor performance.",
        "El middleware persist de Zustand guarda el store en localStorage automáticamente.",
        "Para stores grandes, separa la lógica en slices y combínalas.",
        "Zustand funciona bien fuera de componentes React también — puedes llamar useStore.getState() en cualquier parte.",
      ],
      commonMistakes: [
        "Seleccionar el store completo: useStore() — el componente se re-renderiza con cualquier cambio.",
        "Mutar el estado directamente dentro de set — siempre retorna un nuevo objeto.",
        "Usar Zustand para estado de servidor (datos de API) — usa TanStack Query para eso.",
      ],
      resources: [
        { title: "Zustand — documentación oficial", url: "https://zustand-demo.pmnd.rs/", type: "doc" },
        { title: "Zustand GitHub", url: "https://github.com/pmndrs/zustand", type: "doc" },
      ],
    },

    {
      name: "Optimización con useMemo y useCallback",
      slug: "react-optimization",
      level: "ADVANCED" as const,
      subjectId: react.id,
      description: "useMemo memoriza el resultado de un cálculo costoso. useCallback memoriza una función. Ambos evitan trabajo innecesario en cada render, pero solo deben usarse cuando hay un problema real de performance.",
      whyMatters: "El 90% del tiempo NO necesitas estos hooks. Pero cuando sí los necesitas — listas grandes, cálculos pesados, componentes que se renderizan cientos de veces — la diferencia es dramática.",
      explanation: `React re-renderiza un componente cada vez que su estado o props cambian. Normalmente esto es rápido. Pero si tienes:
- Un cálculo costoso (filtrar 10,000 items)
- Una función que se pasa a un hijo memoizado con React.memo

Entonces useMemo y useCallback evitan trabajo redundante.

**Regla de oro**: mide primero con DevTools Profiler. Solo optimiza si hay un problema real.`,
      codeExample: `import { useMemo, useCallback, memo } from "react";

// ── useMemo — memorizar cálculos ─────────
function ListaFiltrada({ productos, busqueda, minPrecio }: Props) {
  // ❌ Sin useMemo: filtra en cada render aunque busqueda no cambie
  // const filtrados = productos.filter(p => p.nombre.includes(busqueda));

  // ✅ Con useMemo: solo re-filtra cuando cambia productos o busqueda
  const filtrados = useMemo(() => {
    console.log("Filtrando..."); // solo corre cuando las deps cambian
    return productos
      .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
      .filter(p => p.precio >= minPrecio)
      .sort((a, b) => a.precio - b.precio);
  }, [productos, busqueda, minPrecio]);

  return (
    <ul>
      {filtrados.map(p => <ItemProducto key={p.id} producto={p} />)}
    </ul>
  );
}

// ── useCallback — memorizar funciones ────
function Padre() {
  const [contador, setContador] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // ❌ Sin useCallback: nueva función en cada render del Padre
  // const handleEliminar = (id: string) => setItems(prev => prev.filter(i => i !== id));

  // ✅ Con useCallback: misma referencia entre renders si deps no cambian
  const handleEliminar = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i !== id));
  }, []); // vacío porque no depende de nada del render

  return (
    <>
      <button onClick={() => setContador(c => c + 1)}>{contador}</button>
      <ListaMemoizada items={items} onEliminar={handleEliminar} />
    </>
  );
}

// ── React.memo — evitar re-renders del hijo ──
// Solo re-renderiza si sus props cambian
const ListaMemoizada = memo(function Lista({
  items,
  onEliminar,
}: {
  items: string[];
  onEliminar: (id: string) => void;
}) {
  console.log("Lista renderizada"); // solo cuando items u onEliminar cambian
  return (
    <ul>
      {items.map(item => (
        <li key={item}>
          {item}
          <button onClick={() => onEliminar(item)}>×</button>
        </li>
      ))}
    </ul>
  );
});`,
      practicalTips: [
        "La trinidad de optimización: React.memo + useCallback + useMemo trabajan juntos. Solo tiene sentido si el hijo está envuelto en memo.",
        "Usa React DevTools Profiler para identificar re-renders innecesarios ANTES de optimizar.",
        "useMemo tiene un costo propio (guardar el valor, comparar dependencias). Para cálculos baratos, es más lento que no usarlo.",
        "useCallback es útil principalmente cuando pasas la función a un componente memoizado o como dependencia de useEffect.",
      ],
      commonMistakes: [
        "Usar useMemo/useCallback en todos lados por defecto — añade complejidad sin beneficio.",
        "Incluir objetos o arrays en las dependencias sin useMemo/useRef — son nuevos en cada render.",
        "Olvidar React.memo en el componente hijo — useCallback no sirve de nada si el hijo siempre re-renderiza.",
      ],
      resources: [
        { title: "React: useMemo", url: "https://react.dev/reference/react/useMemo", type: "doc" },
        { title: "React: useCallback", url: "https://react.dev/reference/react/useCallback", type: "doc" },
        { title: "React: Optimización del rendimiento", url: "https://react.dev/learn/render-and-commit", type: "doc" },
      ],
    },

    {
      name: "Testing de componentes",
      slug: "react-testing",
      level: "ADVANCED" as const,
      subjectId: react.id,
      description: "Testing Library es el estándar para testear componentes React. Su filosofía: testea el comportamiento que ve el usuario, no los detalles de implementación.",
      whyMatters: "Los tests de componentes te dan confianza para refactorizar UI sin romper funcionalidad. Con Testing Library, tus tests se parecen a cómo un usuario interactúa con la app.",
      explanation: `La filosofía de Testing Library es: "Cuanto más se parezcan tus tests a cómo los usuarios usan el software, más confianza te darán."

No testeas el estado interno ni los props — testeas lo que el usuario VE y HACE: textos en pantalla, formularios que se envían, botones que cambian cosas.`,
      codeExample: `import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormularioLogin } from "./FormularioLogin";

describe("FormularioLogin", () => {
  // ── TEST DE RENDERIZADO ───────────────
  test("muestra los campos de email y contraseña", () => {
    render(<FormularioLogin onLogin={jest.fn()} />);

    // Queries por rol/texto — como lo vería un usuario
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  // ── TEST DE INTERACCIÓN ───────────────
  test("llama onLogin con las credenciales correctas", async () => {
    const user = userEvent.setup();
    const mockLogin = jest.fn().mockResolvedValue(undefined);

    render(<FormularioLogin onLogin={mockLogin} />);

    // Simula interacción del usuario
    await user.type(screen.getByLabelText(/email/i), "ana@test.com");
    await user.type(screen.getByLabelText(/contraseña/i), "password123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "ana@test.com",
      password: "password123",
    });
  });

  // ── TEST DE VALIDACIÓN ────────────────
  test("muestra error si el email es inválido", async () => {
    const user = userEvent.setup();
    render(<FormularioLogin onLogin={jest.fn()} />);

    await user.type(screen.getByLabelText(/email/i), "noesvalido");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
  });

  // ── TEST ASÍNCRONO ────────────────────
  test("muestra cargando mientras hace login", async () => {
    const user = userEvent.setup();
    const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<FormularioLogin onLogin={mockLogin} />);
    await user.type(screen.getByLabelText(/email/i), "ana@test.com");
    await user.type(screen.getByLabelText(/contraseña/i), "password123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument());
  });
});`,
      practicalTips: [
        "Prioriza queries en este orden: getByRole > getByLabelText > getByText > getByTestId. Los primeros son más accesibles.",
        "Usa userEvent en lugar de fireEvent — simula eventos del usuario de forma más realista.",
        "findBy* queries son para elementos asíncronos — esperan hasta que aparezcan o lanzan error.",
        "Envuelve el componente en sus Providers necesarios (AuthProvider, QueryClientProvider) en el render.",
      ],
      commonMistakes: [
        "Testear implementación (useState, clases CSS) en lugar de comportamiento visible.",
        "Usar getByTestId para todo — es el último recurso, no el primero.",
        "No limpiar mocks entre tests — puede causar falsos positivos/negativos.",
      ],
      resources: [
        { title: "Testing Library — documentación", url: "https://testing-library.com/docs/react-testing-library/intro/", type: "doc" },
        { title: "Guías de queries", url: "https://testing-library.com/docs/queries/about", type: "doc" },
      ],
    },

    // ════════════════════════════════════════
    // NODE.JS
    // ════════════════════════════════════════
    {
      name: "Módulos y sistema de archivos",
      slug: "node-modules",
      level: "BEGINNER" as const,
      subjectId: nodejs.id,
      description: "Node.js tiene un sistema de módulos (CommonJS y ES Modules) y acceso al sistema de archivos del servidor a través del módulo fs. Son la base de cualquier aplicación Node.",
      whyMatters: "Node.js no es el navegador — tiene acceso directo al sistema operativo. Leer configuraciones, procesar archivos subidos, generar reportes, son tareas del día a día que requieren el módulo fs.",
      explanation: `Node.js usa el sistema de módulos para organizar el código. Históricamente usaba CommonJS (require/module.exports), y ahora soporta ES Modules (import/export).

El módulo fs (file system) permite leer, escribir, crear y eliminar archivos. La versión fs/promises usa async/await para operaciones no bloqueantes.`,
      codeExample: `// ── MÓDULOS COMMONJS (tradicional) ───────
const path = require("path");
const fs = require("fs/promises");
const { EventEmitter } = require("events");

// ── ES MODULES (moderno, en package.json: "type": "module") ──
import path from "path";
import fs from "fs/promises";
import { readFile, writeFile } from "fs/promises";

// ── MÓDULO PATH ───────────────────────────
const rutaCompleta = path.join(__dirname, "datos", "usuarios.json");
const extension = path.extname("archivo.pdf");   // ".pdf"
const nombreBase = path.basename("/ruta/arch.ts"); // "arch.ts"

// ── MÓDULO FS — operaciones de archivo ───
async function leerConfiguracion() {
  try {
    const contenido = await fs.readFile("config.json", "utf-8");
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Archivo no encontrado, usando defaults");
      return {};
    }
    throw error;
  }
}

async function guardarDatos(ruta: string, datos: object) {
  // Asegura que el directorio existe
  await fs.mkdir(path.dirname(ruta), { recursive: true });
  await fs.writeFile(ruta, JSON.stringify(datos, null, 2), "utf-8");
}

async function listarArchivos(directorio: string) {
  const archivos = await fs.readdir(directorio, { withFileTypes: true });
  return archivos
    .filter(a => a.isFile())
    .map(a => a.name);
}

async function copiarArchivo(origen: string, destino: string) {
  await fs.copyFile(origen, destino);
}

// ── USO PRÁCTICO ──────────────────────────
async function procesarUpload(archivoTemp: string, userId: string) {
  const destino = path.join("uploads", userId, path.basename(archivoTemp));
  await guardarDatos(\`logs/\${userId}.json\`, { uploadedAt: new Date() });
  await fs.rename(archivoTemp, destino);
  return destino;
}`,
      practicalTips: [
        "Usa siempre fs/promises en lugar de los callbacks de fs. El código async/await es mucho más legible.",
        "path.join() en lugar de concatenar strings para rutas — maneja separadores en Windows y Unix automáticamente.",
        "__dirname está disponible en CommonJS pero no en ES Modules. En ESM usa: import.meta.dirname.",
        "Para operaciones de streaming de archivos grandes, usa fs.createReadStream/createWriteStream en lugar de readFile.",
      ],
      commonMistakes: [
        "Leer archivos con rutas relativas desde la raíz del proceso en lugar de __dirname — el path cambia según dónde corres Node.",
        "Usar la versión callback de fs en lugar de fs/promises.",
        "No manejar el error ENOENT (archivo no encontrado) — es el más común en producción.",
      ],
      resources: [
        { title: "Node.js: Módulo fs", url: "https://nodejs.org/api/fs.html", type: "doc" },
        { title: "Node.js: Sistema de módulos", url: "https://nodejs.org/api/modules.html", type: "doc" },
      ],
    },

    {
      name: "HTTP nativo y Express básico",
      slug: "node-express-basic",
      level: "BEGINNER" as const,
      subjectId: nodejs.id,
      description: "Node.js incluye un módulo http nativo para crear servidores. Express es el framework más popular que simplifica el manejo de rutas, middleware y respuestas HTTP.",
      whyMatters: "Express es el framework más descargado del ecosistema Node.js. Entender cómo funciona HTTP y cómo Express lo abstrae te da la base para construir cualquier API backend.",
      explanation: `HTTP es el protocolo de comunicación de la web. Cuando un cliente (browser, app móvil) hace una petición, el servidor la procesa y devuelve una respuesta.

Express simplifica esto con un sistema de routing (qué código corre para cada URL) y middleware (funciones que procesan la petición antes de llegar al handler final).`,
      codeExample: `import express, { Request, Response, NextFunction } from "express";

const app = express();

// ── MIDDLEWARE GLOBAL ─────────────────────
app.use(express.json()); // parsea body JSON automáticamente
app.use(express.urlencoded({ extended: true })); // parsea form data

// Middleware de logging custom
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.path}\`);
  next(); // SIEMPRE llama next() o la petición se queda colgada
});

// ── RUTAS ────────────────────────────────
// GET — obtener datos
app.get("/usuarios", async (req: Request, res: Response) => {
  const usuarios = await db.usuario.findMany();
  res.json(usuarios);
});

// Parámetros de URL
app.get("/usuarios/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await db.usuario.findUnique({ where: { id } });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
});

// POST — crear
app.post("/usuarios", async (req: Request, res: Response) => {
  const { nombre, email } = req.body;
  const usuario = await db.usuario.create({ data: { nombre, email } });
  res.status(201).json(usuario);
});

// ── QUERY PARAMS ─────────────────────────
// GET /productos?pagina=2&limite=10&buscar=laptop
app.get("/productos", (req: Request, res: Response) => {
  const { pagina = "1", limite = "10", buscar } = req.query;
  // ... usar en la query de BD
  res.json({ pagina, limite, buscar });
});

// ── MANEJO DE ERRORES ────────────────────
// Middleware de error (4 parámetros — Express lo identifica así)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));`,
      practicalTips: [
        "El orden de los middleware importa — se ejecutan en el orden que los defines con app.use().",
        "Siempre llama next() en los middleware o la petición se queda esperando.",
        "Para APIs grandes, organiza las rutas en routers separados: express.Router().",
        "express.json() debe ir ANTES de las rutas que leen req.body — si no, body es undefined.",
      ],
      commonMistakes: [
        "Olvidar next() en middleware — la petición se queda colgada.",
        "El middleware de error debe tener exactamente 4 parámetros (err, req, res, next) o Express no lo trata como error handler.",
        "No manejar errores en rutas async — si throw sin try/catch, Express no los captura automáticamente en versiones < 5.",
      ],
      resources: [
        { title: "Express.js — documentación oficial", url: "https://expressjs.com/es/guide/routing.html", type: "doc" },
        { title: "Node.js: módulo HTTP", url: "https://nodejs.org/api/http.html", type: "doc" },
      ],
    },

    {
      name: "Manejo de rutas y middlewares",
      slug: "node-routes",
      level: "BEGINNER" as const,
      subjectId: nodejs.id,
      description: "Organizar rutas con express.Router() y crear middlewares reutilizables es la base de una API mantenible. Los middlewares son funciones que se ejecutan en secuencia procesando la petición.",
      whyMatters: "Una API real tiene decenas o cientos de endpoints. Sin organización en routers y middleware reutilizable, el código se vuelve inmantenible rápidamente.",
      explanation: `Express.Router() crea mini-aplicaciones Express con sus propias rutas y middleware. Puedes crear un router para usuarios, otro para productos, y montarlos en la app principal con un prefijo.

Los middleware son el corazón de Express: autenticación, validación, logging, compresión — todo se implementa como middleware.`,
      codeExample: `import express, { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ── ROUTER DE USUARIOS ────────────────────
// archivo: routes/usuarios.router.ts
export const usuariosRouter = Router();

usuariosRouter.get("/", listarUsuarios);
usuariosRouter.get("/:id", obtenerUsuario);
usuariosRouter.post("/", crearUsuario);
usuariosRouter.put("/:id", actualizarUsuario);
usuariosRouter.delete("/:id", eliminarUsuario);

// ── MIDDLEWARE DE AUTENTICACIÓN ───────────
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload; // agregar usuario al request
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// ── MIDDLEWARE DE ROLES ───────────────────
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Sin permisos" });
    }
    next();
  };
}

// ── MIDDLEWARE DE VALIDACIÓN ──────────────
import { AnyZodObject } from "zod";

export function validar(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      res.status(400).json({ error: "Datos inválidos", detalles: error });
    }
  };
}

// ── APP PRINCIPAL ─────────────────────────
// archivo: app.ts
const app = express();
app.use(express.json());

// Rutas públicas
app.use("/auth", authRouter);

// Rutas protegidas — requireAuth aplica a TODO el router
app.use("/usuarios", requireAuth, usuariosRouter);
app.use("/admin", requireAuth, requireRole("admin"), adminRouter);`,
      practicalTips: [
        "Organiza los routers por dominio de negocio: usuarios, productos, pedidos — cada uno en su archivo.",
        "Los middleware de autenticación y autorización deben ir ANTES del router que protegen.",
        "Extend la interfaz Request de Express con declaration merging para tipar req.user correctamente.",
        "Un middleware de manejo de errores al final del archivo app.ts captura todos los errores no manejados.",
      ],
      commonMistakes: [
        "Montar el error handler middleware ANTES de las rutas — nunca se ejecutará.",
        "Crear middleware con lógica de negocio compleja — los middleware deben ser pequeños y reutilizables.",
        "No pasar el error a next(error) cuando ocurre en rutas async.",
      ],
      resources: [
        { title: "Express.js: Router", url: "https://expressjs.com/es/guide/routing.html", type: "doc" },
        { title: "Express.js: Middleware", url: "https://expressjs.com/es/guide/using-middleware.html", type: "doc" },
      ],
    },

    {
      name: "Conexión a bases de datos con Prisma",
      slug: "node-prisma",
      level: "INTERMEDIATE" as const,
      subjectId: nodejs.id,
      description: "Prisma es un ORM moderno para Node.js con TypeScript. Genera un cliente completamente tipado desde tu schema, haciendo las queries a la base de datos seguras en tiempo de compilación.",
      whyMatters: "Prisma elimina las queries SQL manuales propensas a errores y te da autocompletado completo de tu base de datos. Es el ORM más adoptado en el ecosistema Node.js/TypeScript.",
      explanation: `Prisma funciona en tres capas:
1. **Schema** (schema.prisma): defines tus modelos como fuente de verdad
2. **Migrations**: Prisma genera y ejecuta el SQL por ti
3. **Client**: Prisma genera código TypeScript para consultar tu BD con type safety total

Es como tener un asistente que conoce perfectamente tu base de datos y escribe el SQL correcto por ti.`,
      codeExample: `// ── schema.prisma ────────────────────────
// model Usuario {
//   id        String   @id @default(uuid())
//   nombre    String
//   email     String   @unique
//   posts     Post[]
//   createdAt DateTime @default(now())
// }

// ── INICIALIZAR PRISMA CLIENT ─────────────
import { PrismaClient } from "@prisma/client";

// Singleton — una sola instancia en toda la app
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["query", "error"], // logs en development
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ── CRUD BÁSICO ───────────────────────────
// CREATE
const nuevoUsuario = await prisma.usuario.create({
  data: { nombre: "Ana", email: "ana@email.com" },
});

// READ — findUnique, findFirst, findMany
const usuario = await prisma.usuario.findUnique({
  where: { id: "uuid-aqui" },
  include: { posts: true }, // join automático
});

const usuarios = await prisma.usuario.findMany({
  where: {
    createdAt: { gte: new Date("2024-01-01") },
    posts: { some: { publicado: true } }, // tiene al menos un post publicado
  },
  orderBy: { createdAt: "desc" },
  take: 10, // limit
  skip: 20, // offset
  select: { id: true, nombre: true }, // solo estos campos
});

// UPDATE
const actualizado = await prisma.usuario.update({
  where: { id: "uuid-aqui" },
  data: { nombre: "Ana García" },
});

// DELETE
await prisma.usuario.delete({ where: { id: "uuid-aqui" } });

// ── TRANSACCIONES ─────────────────────────
const [pedido, inventario] = await prisma.$transaction([
  prisma.pedido.create({ data: { usuarioId, productoId, cantidad: 2 } }),
  prisma.producto.update({
    where: { id: productoId },
    data: { stock: { decrement: 2 } },
  }),
]);`,
      practicalTips: [
        "Siempre usa una instancia singleton de PrismaClient — múltiples instancias pueden agotar el pool de conexiones.",
        "Las relaciones de Prisma (include, select) hacen JOINs eficientes — evita N+1 queries.",
        "Prisma.$transaction() garantiza que múltiples operaciones se ejecuten atómicamente.",
        "Usa prisma.$queryRaw para queries SQL complejas que Prisma no puede expresar de forma limpia.",
      ],
      commonMistakes: [
        "Crear una nueva instancia de PrismaClient en cada petición — agota el pool de conexiones.",
        "Usar findMany sin límite en datos de producción — puede traer millones de registros.",
        "Olvidar manejar errores de Prisma: P2002 (unique constraint), P2025 (record not found).",
      ],
      resources: [
        { title: "Prisma: Documentación oficial", url: "https://www.prisma.io/docs", type: "doc" },
        { title: "Prisma: CRUD", url: "https://www.prisma.io/docs/orm/prisma-client/queries/crud", type: "doc" },
      ],
    },

    {
      name: "Autenticación y JWT",
      slug: "node-auth",
      level: "INTERMEDIATE" as const,
      subjectId: nodejs.id,
      description: "JWT (JSON Web Token) es el estándar para autenticación stateless en APIs REST. Un sistema completo incluye access tokens de corta vida y refresh tokens para renovarlos.",
      whyMatters: "La autenticación es la puerta de entrada de cualquier aplicación. Implementarla incorrectamente es la causa de brechas de seguridad. Aprender el patrón correcto desde el principio es crítico.",
      explanation: `Un JWT tiene tres partes: header (algoritmo), payload (datos) y firma (verificación). El servidor firma el token con un secreto — cualquier modificación invalida la firma.

**Access token**: válido por 15 minutos. Se envía en cada petición.
**Refresh token**: válido por 7-30 días. Solo se usa para obtener nuevos access tokens.

Este patrón de dos tokens limita el daño si un access token es robado — expira pronto. Y permite invalidar sesiones revocando el refresh token.`,
      codeExample: `import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// ── GENERAR TOKENS ────────────────────────
function generarTokens(userId: string, role: string) {
  const accessToken = jwt.sign(
    { userId, role },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}

// ── LOGIN ─────────────────────────────────
export async function login(email: string, password: string) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    // Mismo error para usuario no encontrado y password incorrecto
    // Evita revelar si el email existe
    throw new Error("Credenciales inválidas");
  }

  const passwordValido = await bcrypt.compare(password, usuario.passwordHash);
  if (!passwordValido) throw new Error("Credenciales inválidas");

  const tokens = generarTokens(usuario.id, usuario.role);

  // Guardar refresh token hasheado en BD
  const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
  await prisma.refreshToken.create({
    data: {
      usuarioId: usuario.id,
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return tokens;
}

// ── REFRESH ───────────────────────────────
export async function refreshAccessToken(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: string };

    const tokens = await prisma.refreshToken.findMany({
      where: { usuarioId: payload.userId, expiresAt: { gt: new Date() } },
    });

    const tokenValido = await Promise.any(
      tokens.map(t => bcrypt.compare(refreshToken, t.tokenHash))
    );

    if (!tokenValido) throw new Error("Refresh token inválido");

    const usuario = await prisma.usuario.findUniqueOrThrow({
      where: { id: payload.userId },
    });

    return generarTokens(usuario.id, usuario.role);
  } catch {
    throw new Error("Refresh token inválido o expirado");
  }
}`,
      practicalTips: [
        "Nunca almacenes el refresh token en localStorage — usa httpOnly cookies para protegerlo de XSS.",
        "El mismo mensaje de error para usuario no encontrado y contraseña incorrecta — evita enumeración de usuarios.",
        "Usa bcrypt con cost factor 10-12 para hash de passwords. Más alto es más seguro pero más lento.",
        "Invalida todos los refresh tokens de un usuario cuando cambia su contraseña.",
      ],
      commonMistakes: [
        "Guardar el JWT_SECRET en el código — siempre en variables de entorno.",
        "No verificar la expiración del token — jwt.verify() lo hace automáticamente si el token tiene exp.",
        "Access tokens con vida muy larga (días) — si se comprometen, el atacante tiene acceso por mucho tiempo.",
        "No implementar logout real — con JWT stateless necesitas una lista de tokens revocados o refresh tokens en BD.",
      ],
      resources: [
        { title: "JWT.io — introducción y herramienta", url: "https://jwt.io/introduction", type: "doc" },
        { title: "OWASP: Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", type: "article" },
      ],
    },

    {
      name: "Validación con Zod",
      slug: "node-validation",
      level: "INTERMEDIATE" as const,
      subjectId: nodejs.id,
      description: "Zod es una librería de validación y parsing con TypeScript. Valida datos en runtime y genera los tipos TypeScript automáticamente desde los schemas.",
      whyMatters: "Los datos que llegan a tu API no son de confianza. Validar todo lo que entra protege tu aplicación de datos malformados, crashes inesperados y vulnerabilidades de seguridad.",
      explanation: `Zod valida datos en dos pasos: define el schema (la forma esperada) y lo usa para parsear datos reales. Si los datos no coinciden, Zod lanza un error detallado indicando exactamente qué falló.

La ventaja sobre otras librerías es que z.infer<typeof schema> genera automáticamente el tipo TypeScript — una sola fuente de verdad para validación y tipado.`,
      codeExample: `import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

// ── SCHEMAS DE VALIDACIÓN ─────────────────
const CrearUsuarioSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(50),
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número"),
  edad: z.number().int().min(18, "Debes ser mayor de edad").optional(),
  rol: z.enum(["admin", "user", "guest"]).default("user"),
});

// Tipo TypeScript generado automáticamente
type CrearUsuarioDTO = z.infer<typeof CrearUsuarioSchema>;

// ── MIDDLEWARE DE VALIDACIÓN GENÉRICO ─────
function validar(schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const resultado = await schema.safeParseAsync(req.body);

    if (!resultado.success) {
      const errores = resultado.error.issues.map(issue => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      }));
      return res.status(400).json({ error: "Validación fallida", errores });
    }

    req.body = resultado.data; // datos limpios y transformados
    next();
  };
}

// ── USO EN RUTAS ──────────────────────────
app.post("/usuarios",
  validar(CrearUsuarioSchema),
  async (req: Request, res: Response) => {
    const datos: CrearUsuarioDTO = req.body; // ya validado y tipado
    const usuario = await crearUsuario(datos);
    res.status(201).json(usuario);
  }
);

// ── SCHEMAS AVANZADOS ─────────────────────
// Schemas anidados
const DireccionSchema = z.object({
  calle: z.string(),
  ciudad: z.string(),
  codigoPostal: z.string().regex(/^\d{5}$/),
});

const PedidoSchema = z.object({
  items: z.array(
    z.object({
      productoId: z.string().uuid(),
      cantidad: z.number().int().positive(),
    })
  ).min(1, "Debe tener al menos un item"),
  direccion: DireccionSchema,
  metodoPago: z.enum(["tarjeta", "transferencia", "efectivo"]),
});

// Transformaciones
const QuerySchema = z.object({
  pagina: z.string().transform(Number).pipe(z.number().int().positive()),
  limite: z.string().transform(Number).pipe(z.number().int().max(100)).default("10"),
});`,
      practicalTips: [
        "Usa schema.safeParseAsync() en lugar de parseAsync() — no lanza excepciones, devuelve { success, data | error }.",
        "Los schemas de Zod pueden reutilizarse para frontend y backend si compartes código.",
        "z.infer<typeof Schema> genera el tipo automáticamente — nunca declares el tipo manualmente por separado.",
        "Crea schemas reutilizables para patrones comunes: emailSchema, passwordSchema, paginacionSchema.",
      ],
      commonMistakes: [
        "Validar solo el body y olvidar params y query — son vectores de entrada igual de importantes.",
        "No sanitizar strings — zod.string().trim() elimina espacios, .toLowerCase() normaliza emails.",
        "Usar .parse() en lugar de .safeParse() — lanza excepciones que debes capturar manualmente.",
      ],
      resources: [
        { title: "Zod — documentación oficial", url: "https://zod.dev/", type: "doc" },
        { title: "Zod: Validaciones comunes", url: "https://zod.dev/?id=strings", type: "doc" },
      ],
    },

    {
      name: "Testing con Jest y Supertest",
      slug: "node-testing",
      level: "ADVANCED" as const,
      subjectId: nodejs.id,
      description: "Jest es el framework de testing de Node.js. Supertest permite probar endpoints HTTP sin levantar el servidor. Juntos forman el stack de testing estándar para APIs Express.",
      whyMatters: "Una API sin tests es código que funciona 'por ahora'. Los tests de integración con Supertest verifican que tus endpoints responden correctamente end-to-end, incluyendo validación, autenticación y base de datos.",
      explanation: `El testing de APIs tiene dos niveles principales:
- **Unit tests**: prueban funciones individuales en aislamiento con mocks
- **Integration tests**: prueban endpoints completos con la base de datos real (o una de test)

Supertest permite hacer peticiones HTTP a tu app Express sin levantarla como un servidor real — ideal para CI/CD.`,
      codeExample: `// ── CONFIGURACIÓN ────────────────────────
// jest.config.ts
// {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   globalSetup: "./src/test/setup.ts",
//   globalTeardown: "./src/test/teardown.ts"
// }

// ── SETUP DE BASE DE DATOS DE TEST ────────
// src/test/setup.ts
import { execSync } from "child_process";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test_db";
execSync("npx prisma migrate reset --force --skip-seed");

// ── TEST DE ENDPOINT ──────────────────────
import request from "supertest";
import { app } from "../app";
import { prisma } from "../prisma";

describe("POST /auth/login", () => {
  beforeEach(async () => {
    // Limpiar y crear datos de prueba
    await prisma.usuario.deleteMany();
    await prisma.usuario.create({
      data: {
        email: "test@test.com",
        passwordHash: await bcrypt.hash("Password123", 10),
        nombre: "Test User",
      },
    });
  });

  test("devuelve tokens con credenciales válidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "Password123" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  test("devuelve 401 con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "incorrecta" })
      .expect(401);

    expect(res.body.error).toMatch(/credenciales/i);
  });
});

describe("GET /usuarios/:id — endpoint protegido", () => {
  let token: string;

  beforeEach(async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "Password123" });
    token = res.body.accessToken;
  });

  test("devuelve el usuario con token válido", async () => {
    const res = await request(app)
      .get(\`/usuarios/\${usuarioId}\`)
      .set("Authorization", \`Bearer \${token}\`)
      .expect(200);

    expect(res.body.email).toBe("test@test.com");
  });

  test("devuelve 401 sin token", async () => {
    await request(app)
      .get(\`/usuarios/\${usuarioId}\`)
      .expect(401);
  });
});`,
      practicalTips: [
        "Usa una base de datos de test separada — nunca corras tests contra la BD de producción.",
        "beforeEach para limpiar datos entre tests garantiza que los tests son independientes.",
        "Supertest acepta la app Express directamente — no necesitas app.listen().",
        "Para mocks de servicios externos (email, SMS), usa jest.mock() — no hagas llamadas reales en tests.",
      ],
      commonMistakes: [
        "Tests que dependen del orden de ejecución — cada test debe poder correr de forma independiente.",
        "No limpiar la BD entre tests — los datos del test anterior afectan al siguiente.",
        "Hacer peticiones HTTP reales a APIs externas en tests — son lentas e inconsistentes.",
      ],
      resources: [
        { title: "Jest — documentación oficial", url: "https://jestjs.io/es-ES/", type: "doc" },
        { title: "Supertest — GitHub", url: "https://github.com/ladjs/supertest", type: "doc" },
      ],
    },

    {
      name: "Deploy y variables de entorno",
      slug: "node-deploy",
      level: "ADVANCED" as const,
      subjectId: nodejs.id,
      description: "Desplegar una API Node.js en producción requiere gestionar configuración con variables de entorno, optimizar el servidor, configurar PM2 o Docker, y establecer un pipeline de CI/CD.",
      whyMatters: "Escribir código es solo la mitad del trabajo. Saber llevarlo a producción de forma segura, reproducible y con capacidad de recuperación es lo que hace a un developer completo.",
      explanation: `El deploy tiene tres fases:
1. **Preparación**: variables de entorno, build de TypeScript, dependencias de producción
2. **Ejecución**: servidor de proceso (PM2) o contenedor (Docker)
3. **Observabilidad**: logs estructurados, health checks, métricas

Las variables de entorno son la forma estándar de configurar apps para diferentes entornos sin cambiar código.`,
      codeExample: `// ── GESTIÓN DE VARIABLES DE ENTORNO ──────
// .env (desarrollo — no committear)
// DATABASE_URL=postgresql://...
// JWT_SECRET=supersecretkey
// PORT=3000

// Validación de variables de entorno al arranque — con Zod
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  PORT: z.string().transform(Number).default("3000"),
});

export const env = EnvSchema.parse(process.env);
// Si falta una variable, la app falla al arrancar con un error claro

// ── HEALTH CHECK ─────────────────────────
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw\`SELECT 1\`; // verifica conexión a BD
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({ status: "error", mensaje: "BD no disponible" });
  }
});

// ── LOGGING ESTRUCTURADO (Pino) ───────────
import pino from "pino";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport: env.NODE_ENV !== "production"
    ? { target: "pino-pretty" }
    : undefined,
});

// Uso en rutas
app.post("/usuarios", async (req, res) => {
  logger.info({ body: req.body }, "Creando usuario");
  try {
    const usuario = await crearUsuario(req.body);
    logger.info({ usuarioId: usuario.id }, "Usuario creado");
    res.status(201).json(usuario);
  } catch (error) {
    logger.error({ error }, "Error creando usuario");
    res.status(500).json({ error: "Error interno" });
  }
});

// ── GRACEFUL SHUTDOWN ─────────────────────
process.on("SIGTERM", async () => {
  logger.info("SIGTERM recibido, cerrando servidor...");
  await prisma.$disconnect();
  server.close(() => {
    logger.info("Servidor cerrado limpiamente");
    process.exit(0);
  });
});`,
      practicalTips: [
        "Valida las variables de entorno al arranque de la app con Zod — falla rápido con un mensaje claro si falta algo.",
        "Nunca hardcodees credenciales en el código. Nunca subas .env a git — añádelo al .gitignore.",
        "Usa logging estructurado (JSON) en producción — es indexable y búscable en herramientas como Datadog o CloudWatch.",
        "Implementa graceful shutdown para cerrar conexiones a BD antes de que el proceso termine.",
      ],
      commonMistakes: [
        "Subir el archivo .env a git — uno de los errores de seguridad más comunes y costosos.",
        "No tener health check endpoint — los balanceadores de carga y plataformas de deploy lo necesitan.",
        "Usar console.log en producción — no tiene timestamps, niveles, ni es estructurado.",
        "No manejar SIGTERM — el proceso se mata abruptamente y puede dejar transacciones a medias.",
      ],
      resources: [
        { title: "12 Factor App — configuración", url: "https://12factor.net/es/config", type: "article" },
        { title: "Pino — logger para Node.js", url: "https://getpino.io/", type: "doc" },
      ],
    },

    // ════════════════════════════════════════
    // PYTHON
    // ════════════════════════════════════════
    {
      name: "Variables, tipos y estructuras de datos",
      slug: "py-basics",
      level: "BEGINNER" as const,
      subjectId: python.id,
      description: "Python tiene tipado dinámico y una sintaxis limpia. Los tipos de datos fundamentales son int, float, str, bool, y las estructuras principales son listas, diccionarios, tuplas y sets.",
      whyMatters: "Conocer bien los tipos y estructuras de datos de Python es la base para escribir código eficiente. Elegir la estructura incorrecta puede hacer que tu código sea 100x más lento de lo necesario.",
      explanation: `Python es famoso por su legibilidad. Las variables se declaran sin tipo explícito (aunque puedes añadirlo con type hints para claridad).

La estructura de datos más importante en Python data science es el diccionario — mapea claves a valores y es la base de DataFrames, JSON, y la mayoría de APIs.`,
      codeExample: `# ── TIPOS BÁSICOS ────────────────────────
nombre = "Ana"              # str
edad = 28                   # int
altura = 1.65               # float
es_developer = True         # bool
nada = None                 # NoneType (equivalente a null)

# Type hints (no cambia el comportamiento, mejora la legibilidad)
def saludar(nombre: str, edad: int) -> str:
    return f"Hola {nombre}, tienes {edad} años"

# ── LISTAS ───────────────────────────────
frutas = ["manzana", "banana", "naranja"]
frutas.append("uva")        # agregar al final
frutas.pop()                # eliminar el último
frutas[0]                   # "manzana" — indexado desde 0
frutas[-1]                  # último elemento
frutas[1:3]                 # slice: ["banana", "naranja"]

# List comprehensions — la forma pythónica
numeros = [1, 2, 3, 4, 5]
dobles = [n * 2 for n in numeros]                    # [2, 4, 6, 8, 10]
pares = [n for n in numeros if n % 2 == 0]           # [2, 4]

# ── DICCIONARIOS ──────────────────────────
usuario = {
    "nombre": "Luis",
    "email": "luis@email.com",
    "edad": 30,
}

usuario["nombre"]           # "Luis"
usuario.get("telefono", "Sin teléfono")  # valor por defecto si no existe
usuario["ciudad"] = "Madrid"  # agregar clave

# Dict comprehension
cuadrados = {n: n**2 for n in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# ── TUPLAS — inmutables ───────────────────
coordenadas = (40.4168, -3.7038)
lat, lng = coordenadas  # desempaquetado

# ── SETS — sin duplicados ─────────────────
lenguajes = {"Python", "JavaScript", "Python"}  # {"Python", "JavaScript"}
lenguajes.add("Go")
"Python" in lenguajes   # True`,
      practicalTips: [
        "Usa list comprehensions en lugar de loops para transformar listas — es más pythónico y eficiente.",
        "dict.get(clave, default) es más seguro que dict[clave] — no lanza KeyError si la clave no existe.",
        "Las tuplas son inmutables — úsalas cuando los datos no deben cambiar (coordenadas, colores RGB).",
        "Los sets son perfectos para verificar membresía (in operator) y eliminar duplicados.",
      ],
      commonMistakes: [
        "Modificar una lista mientras iteras sobre ella — usa una copia o list comprehension.",
        "Confundir = (asignación) con == (comparación) — en Python las asignaciones dentro de condiciones son un error de sintaxis.",
        "Olvidar que las listas y diccionarios se pasan por referencia — modificar uno modifica el original.",
      ],
      resources: [
        { title: "Python: Tipos de datos", url: "https://docs.python.org/es/3/library/stdtypes.html", type: "doc" },
        { title: "Real Python: Python Data Structures", url: "https://realpython.com/python-data-structures/", type: "article" },
      ],
    },

    {
      name: "Funciones y módulos",
      slug: "py-functions",
      level: "BEGINNER" as const,
      subjectId: python.id,
      description: "Las funciones en Python son ciudadanos de primera clase: se pueden pasar como argumentos, devolver desde otras funciones y guardar en variables. Los módulos organizan el código en archivos reutilizables.",
      whyMatters: "Las funciones bien diseñadas hacen el código reutilizable y testeable. Entender *args y **kwargs es esencial para trabajar con librerías como NumPy, Pandas y Django.",
      explanation: `Python tiene varias formas de definir funciones según la complejidad. La lambda es para funciones de una línea. Los *args y **kwargs permiten funciones que aceptan cualquier número de argumentos — por eso muchas librerías Python tienen APIs tan flexibles.`,
      codeExample: `# ── FUNCIONES BÁSICAS ────────────────────
def saludar(nombre: str, saludo: str = "Hola") -> str:
    """Docstring: describe qué hace la función."""
    return f"{saludo}, {nombre}!"

print(saludar("Ana"))           # "Hola, Ana!"
print(saludar("Ana", "Buenos días"))  # "Buenos días, Ana!"

# ── *ARGS Y **KWARGS ──────────────────────
def sumar(*numeros: float) -> float:  # *args: tupla de argumentos posicionales
    return sum(numeros)

sumar(1, 2, 3)        # 6
sumar(1, 2, 3, 4, 5)  # 15

def configurar(**opciones):  # **kwargs: dict de argumentos con nombre
    for clave, valor in opciones.items():
        print(f"{clave}: {valor}")

configurar(debug=True, log_level="INFO", timeout=30)

# ── FUNCIONES COMO OBJETOS ────────────────
def aplicar(fn, valor):
    return fn(valor)

resultado = aplicar(str.upper, "hola")  # "HOLA"

# Lambda — para funciones simples de una expresión
doble = lambda x: x * 2
ordenar_por_edad = sorted(usuarios, key=lambda u: u["edad"])

# ── MÓDULOS ───────────────────────────────
# math — operaciones matemáticas
import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.ceil(3.2)   # 4

# datetime — fechas y horas
from datetime import datetime, timedelta
ahora = datetime.now()
manana = ahora + timedelta(days=1)
formato = ahora.strftime("%d/%m/%Y %H:%M")

# os y pathlib — sistema de archivos
from pathlib import Path
ruta = Path("data") / "usuarios.json"  # maneja separadores automáticamente
ruta.exists()
ruta.read_text(encoding="utf-8")

# random — números aleatorios
import random
random.choice(["a", "b", "c"])
random.randint(1, 10)`,
      practicalTips: [
        "Escribe docstrings en todas tus funciones públicas — documenta parámetros, retorno y ejemplos.",
        "Los parámetros por defecto mutables (listas, dicts) son un bug famoso: def f(items=[]). Usa None y crea dentro de la función.",
        "Usa *args para funciones de utilidad que aplican a cualquier número de elementos.",
        "**kwargs es perfecto para funciones de configuración donde no sabes de antemano todas las opciones.",
      ],
      commonMistakes: [
        "Parámetro por defecto mutable: def agregar(item, lista=[]) — la lista persiste entre llamadas.",
        "Modificar variables globales dentro de funciones sin declarar global — genera bugs confusos.",
        "Olvidar return — Python devuelve None implícitamente si no hay return.",
      ],
      resources: [
        { title: "Python: Funciones", url: "https://docs.python.org/es/3/tutorial/controlflow.html#defining-functions", type: "doc" },
        { title: "Real Python: Python args y kwargs", url: "https://realpython.com/python-kwargs-and-args/", type: "article" },
      ],
    },

    {
      name: "POO en Python",
      slug: "py-oop",
      level: "INTERMEDIATE" as const,
      subjectId: python.id,
      description: "Python es multi-paradigma y soporta POO con clases, herencia, encapsulamiento y polimorfismo. Los métodos especiales (dunder methods) integran tus clases con el lenguaje Python.",
      whyMatters: "Para proyectos serios — APIs con Django/FastAPI, librerías, scripts complejos — la POO en Python te permite modelar dominios complejos de forma organizada y mantenible.",
      explanation: `En Python, todo es un objeto — incluyendo funciones, clases y módulos. Las clases son plantillas para crear objetos con atributos (datos) y métodos (comportamiento).

Los **dunder methods** (double underscore: __str__, __len__, __eq__) son los que hacen que tus objetos se integren con Python. Cuando haces len(mi_objeto) o print(mi_objeto), Python llama __len__ y __str__ automáticamente.`,
      codeExample: `from dataclasses import dataclass
from typing import Optional

# ── CLASE BÁSICA ──────────────────────────
class Producto:
    categoria_defecto = "General"  # atributo de clase

    def __init__(self, nombre: str, precio: float, stock: int = 0):
        self.nombre = nombre        # atributo de instancia
        self.precio = precio
        self._stock = stock         # _ convención de "protegido"

    # Dunder methods
    def __repr__(self) -> str:
        return f"Producto({self.nombre!r}, {self.precio})"

    def __str__(self) -> str:
        return f"{self.nombre} — ${self.precio:.2f}"

    def __eq__(self, other) -> bool:
        if not isinstance(other, Producto): return NotImplemented
        return self.nombre == other.nombre

    # Properties — getters/setters pythónicos
    @property
    def stock(self) -> int:
        return self._stock

    @stock.setter
    def stock(self, valor: int):
        if valor < 0:
            raise ValueError("El stock no puede ser negativo")
        self._stock = valor

    def aplicar_descuento(self, porcentaje: float) -> "Producto":
        """Devuelve un nuevo Producto con el descuento aplicado."""
        return Producto(self.nombre, self.precio * (1 - porcentaje / 100), self._stock)

# ── HERENCIA ──────────────────────────────
class ProductoDigital(Producto):
    def __init__(self, nombre: str, precio: float, url_descarga: str):
        super().__init__(nombre, precio, stock=999)  # digital: stock infinito
        self.url_descarga = url_descarga

    def __str__(self) -> str:
        return f"{super().__str__()} [Digital]"

# ── DATACLASSES — para objetos de datos ──
@dataclass
class PuntoGeografico:
    latitud: float
    longitud: float
    altitud: float = 0.0

    def distancia_a(self, otro: "PuntoGeografico") -> float:
        # Fórmula simplificada
        return ((self.latitud - otro.latitud)**2 +
                (self.longitud - otro.longitud)**2) ** 0.5

p1 = PuntoGeografico(40.4168, -3.7038)
p2 = PuntoGeografico(41.3874, 2.1686)
print(p1.distancia_a(p2))`,
      practicalTips: [
        "Usa @dataclass para clases que principalmente almacenan datos — genera __init__, __repr__ y __eq__ automáticamente.",
        "La convención _ (un guión bajo) indica 'protegido por convención'. Python no tiene private real.",
        "Prefiere composición sobre herencia cuando la relación no es claramente 'es-un'.",
        "Los dunder methods __enter__ y __exit__ hacen que tu clase sea compatible con 'with' statements.",
      ],
      commonMistakes: [
        "Olvidar self en los métodos de instancia — causa TypeError inesperado.",
        "Herencia múltiple sin entender MRO (Method Resolution Order) — puede causar comportamiento inesperado.",
        "Usar atributos mutables de clase en lugar de de instancia: todos los objetos compartirían la misma lista.",
      ],
      resources: [
        { title: "Python: Clases", url: "https://docs.python.org/es/3/tutorial/classes.html", type: "doc" },
        { title: "Real Python: Python OOP", url: "https://realpython.com/python3-object-oriented-programming/", type: "article" },
      ],
    },

    {
      name: "NumPy y operaciones vectorizadas",
      slug: "py-numpy",
      level: "INTERMEDIATE" as const,
      subjectId: python.id,
      description: "NumPy es la librería de computación numérica de Python. Sus arrays N-dimensionales y operaciones vectorizadas son hasta 100x más rápidos que las listas de Python para operaciones matemáticas.",
      whyMatters: "NumPy es la base de todo el stack científico de Python: Pandas, scikit-learn, TensorFlow y PyTorch están construidos sobre NumPy. No puedes hacer Data Science o ML sin entenderlo.",
      explanation: `La clave de NumPy es la **vectorización**: en lugar de escribir un loop para operar sobre cada elemento, le dices a NumPy qué operación hacer y la ejecuta en C internamente sobre todos los elementos a la vez.

Un array NumPy de 1 millón de elementos se multiplica por 2 en ~1ms. El mismo loop en Python tardaría ~200ms.`,
      codeExample: `import numpy as np

# ── CREAR ARRAYS ──────────────────────────
a = np.array([1, 2, 3, 4, 5])          # 1D
b = np.array([[1, 2, 3], [4, 5, 6]])   # 2D
c = np.zeros((3, 4))                    # 3x4 de ceros
d = np.ones((2, 3))                     # 2x3 de unos
e = np.arange(0, 10, 2)               # [0, 2, 4, 6, 8]
f = np.linspace(0, 1, 5)              # [0, .25, .5, .75, 1]
aleatorio = np.random.rand(3, 3)       # 3x3 aleatorio [0,1)

print(a.shape)    # (5,)
print(b.shape)    # (2, 3)
print(b.dtype)    # int64

# ── OPERACIONES VECTORIZADAS ──────────────
# Se aplican elemento a elemento — sin loops
a * 2          # [2, 4, 6, 8, 10]
a + b          # error si shapes incompatibles
a ** 2         # [1, 4, 9, 16, 25]
np.sqrt(a)     # [1, 1.41, 1.73, 2, 2.24]

# Operaciones entre arrays (broadcasting)
precios = np.array([10.0, 20.0, 30.0])
descuentos = np.array([0.1, 0.2, 0.15])
precios_finales = precios * (1 - descuentos)  # [9, 16, 25.5]

# ── INDEXING Y SLICING ────────────────────
matriz = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
matriz[0, 0]      # 1
matriz[1, :]      # [4, 5, 6] — segunda fila completa
matriz[:, 1]      # [2, 5, 8] — segunda columna completa
matriz[0:2, 0:2]  # [[1,2],[4,5]] — submatriz

# Boolean indexing — filtra sin loop
datos = np.array([1, -2, 3, -4, 5])
positivos = datos[datos > 0]  # [1, 3, 5]

# ── OPERACIONES ESTADÍSTICAS ──────────────
ventas = np.array([1200, 850, 2100, 750, 1800])
print(ventas.mean())    # promedio
print(ventas.std())     # desviación estándar
print(ventas.max())     # máximo
print(ventas.argmax())  # índice del máximo
print(np.percentile(ventas, 75))  # percentil 75`,
      practicalTips: [
        "Nunca uses loops de Python sobre arrays NumPy — siempre hay una operación vectorizada que hace lo mismo más rápido.",
        "Broadcasting: NumPy puede operar arrays de diferentes formas si son compatibles. Entiende las reglas para evitar errores.",
        "reshape(-1, 1) convierte un array 1D en columna. Muy útil cuando scikit-learn espera una forma específica.",
        "np.nan es diferente a None — usa np.isnan() para detectar valores faltantes, no comparaciones.",
      ],
      commonMistakes: [
        "Usar listas de Python donde debería ir un array NumPy — 100x más lento para operaciones numéricas.",
        "Copiar arrays con b = a — b es una vista, no una copia. Usa b = a.copy().",
        "Confundir np.dot() (producto matricial) con el operador * (producto elemento a elemento).",
      ],
      resources: [
        { title: "NumPy: User Guide", url: "https://numpy.org/doc/stable/user/", type: "doc" },
        { title: "NumPy 100 Exercises", url: "https://github.com/rougier/numpy-100", type: "article" },
      ],
    },

    {
      name: "Pandas y análisis de datos",
      slug: "py-pandas",
      level: "INTERMEDIATE" as const,
      subjectId: python.id,
      description: "Pandas provee DataFrames y Series para análisis de datos tabulares. Es la herramienta estándar para cargar, limpiar, transformar y explorar datasets en Python.",
      whyMatters: "Pandas es la navaja suiza del Data Science. Cualquier tarea de análisis de datos en Python pasa por Pandas: limpiar datos, agrupar, pivotar, unir tablas. Es imprescindible.",
      explanation: `Un DataFrame de Pandas es como una hoja de Excel potenciada con código. Tiene filas con un índice y columnas con nombre, y puedes hacer operaciones SQL-like con código Python.

La curva de aprendizaje es alta, pero dominar Pandas te hace 10x más productivo en análisis de datos.`,
      codeExample: `import pandas as pd
import numpy as np

# ── CREAR Y CARGAR DATOS ──────────────────
df = pd.read_csv("ventas.csv")                 # desde CSV
df = pd.read_json("datos.json")                # desde JSON
df = pd.read_sql("SELECT * FROM ventas", conn) # desde SQL

# DataFrame desde diccionario
df = pd.DataFrame({
    "nombre": ["Ana", "Luis", "María"],
    "ventas": [1200, 850, 2100],
    "región": ["Norte", "Sur", "Norte"],
})

# ── EXPLORACIÓN ───────────────────────────
df.shape           # (3, 3) — filas, columnas
df.dtypes          # tipos de cada columna
df.describe()      # estadísticas descriptivas
df.head(5)         # primeras 5 filas
df.isnull().sum()  # valores nulos por columna

# ── SELECCIÓN Y FILTRADO ──────────────────
df["nombre"]                           # una columna (Serie)
df[["nombre", "ventas"]]              # múltiples columnas

df[df["ventas"] > 1000]               # filtrar filas
df[(df["ventas"] > 1000) & (df["región"] == "Norte")]  # múltiples condiciones

df.loc[0]            # fila por índice label
df.iloc[0]           # fila por posición

# ── TRANSFORMACIÓN ────────────────────────
df["ventas_k"] = df["ventas"] / 1000         # nueva columna
df["nombre"] = df["nombre"].str.upper()       # aplicar función de string
df["categoria"] = df["ventas"].apply(         # función custom
    lambda v: "alta" if v > 1500 else "baja"
)

# ── GROUPBY — como GROUP BY en SQL ────────
resumen = df.groupby("región").agg({
    "ventas": ["sum", "mean", "count"],
    "nombre": "count",
}).reset_index()

# ── MERGE — como JOIN en SQL ──────────────
clientes = pd.DataFrame({"cliente_id": [1, 2], "nombre": ["Ana", "Luis"]})
pedidos = pd.DataFrame({"cliente_id": [1, 1, 2], "monto": [100, 200, 150]})

resultado = pedidos.merge(clientes, on="cliente_id", how="left")

# ── LIMPIEZA DE DATOS ─────────────────────
df.dropna()                                    # eliminar filas con nulos
df.fillna({"ventas": 0, "región": "Desconocida"})  # rellenar nulos
df.drop_duplicates()                           # eliminar duplicados
df["fecha"] = pd.to_datetime(df["fecha"])      # convertir tipo`,
      practicalTips: [
        "Evita loops sobre DataFrames — usa vectorized operations, apply() o groupby(). Son mucho más rápidos.",
        "df.copy() cuando modifiques un subconjunto — evita el SettingWithCopyWarning.",
        "Convierte columnas al tipo correcto después de cargar datos: astype(), pd.to_datetime(), pd.to_numeric().",
        "query() es más legible para filtros complejos: df.query('ventas > 1000 and region == \"Norte\"').",
      ],
      commonMistakes: [
        "Modificar una vista (slice) del DataFrame en lugar del original — usa .copy() o .loc para asignación.",
        "Olvidar reset_index() después de groupby() — el índice es el resultado del groupby.",
        "Usar loops sobre filas con iterrows() — es extremadamente lento. Usa vectorized operations.",
      ],
      resources: [
        { title: "Pandas: Getting started", url: "https://pandas.pydata.org/docs/getting_started/", type: "doc" },
        { title: "10 minutos con Pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", type: "doc" },
      ],
    },

    {
      name: "Visualización con Matplotlib",
      slug: "py-matplotlib",
      level: "INTERMEDIATE" as const,
      subjectId: python.id,
      description: "Matplotlib es la librería base de visualización en Python. Seaborn la extiende con gráficas estadísticas de alto nivel. Juntas permiten crear cualquier tipo de gráfica para análisis y presentación.",
      whyMatters: "Los datos sin visualización son incomprensibles para la mayoría de personas. La habilidad de crear gráficas claras e informativas es lo que hace que un análisis tenga impacto real.",
      explanation: `Matplotlib tiene dos APIs: una procedural estilo MATLAB (plt.plot()) y una orientada a objetos (fig, ax). La OO es más poderosa para figuras complejas y es la que debes aprender.

Seaborn simplifica la creación de gráficas estadísticas complejas con una sola línea de código.`,
      codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# ── GRÁFICA BÁSICA CON matplotlib ─────────
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Línea
meses = ["Ene", "Feb", "Mar", "Abr"]
ventas = [1200, 1850, 1400, 2100]
axes[0].plot(meses, ventas, marker="o", color="#2563EB", linewidth=2)
axes[0].set_title("Ventas Mensuales")
axes[0].set_ylabel("Ventas ($)")
axes[0].grid(True, alpha=0.3)

# Barras
categorias = ["A", "B", "C"]
valores = [45, 72, 38]
axes[1].bar(categorias, valores, color=["#2563EB", "#10B981", "#F59E0B"])
axes[1].set_title("Ventas por Categoría")

plt.tight_layout()
plt.savefig("dashboard.png", dpi=150, bbox_inches="tight")
plt.show()

# ── SEABORN — gráficas estadísticas ───────
# Datos de ejemplo
df = pd.DataFrame({
    "edad": np.random.normal(35, 10, 200),
    "salario": np.random.normal(45000, 15000, 200),
    "departamento": np.random.choice(["Tech", "Ventas", "RRHH"], 200),
})

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
sns.set_theme(style="whitegrid")

# Distribución
sns.histplot(df["edad"], kde=True, ax=axes[0, 0], color="#2563EB")
axes[0, 0].set_title("Distribución de Edades")

# Boxplot por categoría
sns.boxplot(data=df, x="departamento", y="salario", ax=axes[0, 1])
axes[0, 1].set_title("Salario por Departamento")

# Scatterplot con regresión
sns.regplot(data=df, x="edad", y="salario", ax=axes[1, 0], scatter_kws={"alpha": 0.3})
axes[1, 0].set_title("Edad vs Salario")

# Heatmap de correlaciones
correlaciones = df[["edad", "salario"]].corr()
sns.heatmap(correlaciones, annot=True, fmt=".2f", cmap="coolwarm", ax=axes[1, 1])

plt.tight_layout()
plt.show()`,
      practicalTips: [
        "La API orientada a objetos (fig, ax = plt.subplots()) es más flexible y controlable que la procedural (plt.plot()).",
        "sns.set_theme() al inicio del notebook mejora el aspecto de todas las gráficas.",
        "Para dashboards interactivos, considera Plotly o Streamlit en lugar de Matplotlib.",
        "figsize=(ancho, alto) en pulgadas. Para presentaciones, 14x8 suele funcionar bien.",
      ],
      commonMistakes: [
        "Olvidar plt.tight_layout() — los títulos y labels se superponen entre subplots.",
        "No guardar la figura antes de plt.show() — después de show() la figura se borra.",
        "Hacer gráficas sin contexto (títulos, labels de ejes, unidades) — nadie sabrá qué representa.",
      ],
      resources: [
        { title: "Matplotlib: User Guide", url: "https://matplotlib.org/stable/users/index.html", type: "doc" },
        { title: "Seaborn: Tutorial", url: "https://seaborn.pydata.org/tutorial.html", type: "doc" },
      ],
    },

    {
      name: "Machine Learning con scikit-learn",
      slug: "py-sklearn",
      level: "ADVANCED" as const,
      subjectId: python.id,
      description: "scikit-learn es la librería de ML más usada en Python. Provee algoritmos de clasificación, regresión, clustering y dimensionalidad, con una API consistente para todos.",
      whyMatters: "scikit-learn es el punto de entrada estándar al Machine Learning. Dominar su API y flujo de trabajo te permite construir modelos predictivos reales, no solo teóricos.",
      explanation: `scikit-learn tiene una API consistente para todos sus algoritmos: instanciar el modelo, llamar .fit(X, y) para entrenar, y .predict(X) para predecir. Esta consistencia hace que cambiar entre algoritmos sea trivial.

El flujo de trabajo de ML tiene pasos definidos: preparar datos → dividir → entrenar → evaluar → optimizar → desplegar.`,
      codeExample: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline

# ── DATOS DE EJEMPLO ──────────────────────
df = pd.read_csv("churn.csv")  # predecir si un cliente cancela

# ── 1. PREPARAR DATOS ─────────────────────
X = df.drop("churn", axis=1)
y = df["churn"]

# Codificar variables categóricas
X_encoded = pd.get_dummies(X, drop_first=True)

# ── 2. DIVIDIR EN TRAIN/TEST ──────────────
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y,
    test_size=0.2,   # 20% para test
    random_state=42, # reproducibilidad
    stratify=y       # mantener proporción de clases
)

# ── 3. PIPELINE — preprocesamiento + modelo ──
pipeline = Pipeline([
    ("scaler", StandardScaler()),           # normalizar features
    ("modelo", RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )),
])

# ── 4. ENTRENAR ───────────────────────────
pipeline.fit(X_train, y_train)

# ── 5. EVALUAR ────────────────────────────
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))
# Muestra precision, recall, f1-score por clase

# Cross-validation — evaluación más robusta
scores = cross_val_score(pipeline, X_encoded, y, cv=5, scoring="f1")
print(f"F1 medio: {scores.mean():.3f} (+/- {scores.std():.3f})")

# ── 6. FEATURE IMPORTANCE ─────────────────
importancias = pd.Series(
    pipeline.named_steps["modelo"].feature_importances_,
    index=X_encoded.columns
).sort_values(ascending=False)

print("\nTop 5 features más importantes:")
print(importancias.head(5))

# ── HACER PREDICCIONES ────────────────────
nuevo_cliente = X_encoded.iloc[[0]]  # mantener estructura
prediccion = pipeline.predict(nuevo_cliente)
probabilidad = pipeline.predict_proba(nuevo_cliente)
print(f"Churn: {prediccion[0]}, Probabilidad: {probabilidad[0][1]:.2%}")`,
      practicalTips: [
        "Siempre usa Pipeline para encadenar preprocesamiento y modelo — evita data leakage en cross-validation.",
        "Entrena el scaler solo con X_train, no con X_test — para evitar que el test 'contamine' el entrenamiento.",
        "cross_val_score es más confiable que una sola división train/test para evaluar el modelo.",
        "Siempre mira classification_report completo, no solo accuracy — una clase desbalanceada puede dar alta accuracy engañosa.",
      ],
      commonMistakes: [
        "Data leakage: escalar todo el dataset antes de dividir — el scaler 've' los datos de test.",
        "Usar accuracy como única métrica en datasets desbalanceados — usa F1, precision, recall.",
        "No establecer random_state — los resultados no son reproducibles.",
        "Olvidar que predict() espera la misma estructura de features que recibió fit().",
      ],
      resources: [
        { title: "scikit-learn: User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "doc" },
        { title: "Kaggle: Intro to Machine Learning", url: "https://www.kaggle.com/learn/intro-to-machine-learning", type: "article" },
      ],
    },

    {
      name: "Deep Learning básico",
      slug: "py-deep-learning",
      level: "ADVANCED" as const,
      subjectId: python.id,
      description: "El Deep Learning usa redes neuronales con múltiples capas para aprender patrones complejos. TensorFlow/Keras y PyTorch son los frameworks principales. Es la base de visión computacional, NLP e IA generativa.",
      whyMatters: "El Deep Learning impulsa las aplicaciones de IA más impactantes: reconocimiento de imágenes, traducción automática, generación de texto. Entender los fundamentos te prepara para este campo en crecimiento exponencial.",
      explanation: `Una red neuronal es una cadena de capas de transformaciones matemáticas. Cada capa extrae patrones más abstractos: en visión, la primera capa detecta bordes, la segunda formas, la tercera objetos completos.

El entrenamiento ajusta los pesos de la red usando backpropagation y gradient descent para minimizar el error.`,
      codeExample: `import tensorflow as tf
from tensorflow import keras
import numpy as np

# ── CLASIFICACIÓN DE IMÁGENES MNIST ──────
# Cargar datos (dígitos escritos a mano, 28x28 pixels)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalizar pixels a [0, 1]
X_train = X_train.astype("float32") / 255.0
X_test = X_test.astype("float32") / 255.0

# ── CONSTRUIR EL MODELO ───────────────────
modelo = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),  # 784 neuronas
    keras.layers.Dense(128, activation="relu"),   # capa oculta
    keras.layers.Dropout(0.2),                    # regularización
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(10, activation="softmax"), # 10 clases (0-9)
])

modelo.summary()  # muestra arquitectura y parámetros

# ── COMPILAR ──────────────────────────────
modelo.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

# ── ENTRENAR ──────────────────────────────
history = modelo.fit(
    X_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.1,  # 10% para validación
    callbacks=[
        keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True),
        keras.callbacks.ReduceLROnPlateau(patience=2),
    ],
)

# ── EVALUAR ───────────────────────────────
test_loss, test_acc = modelo.evaluate(X_test, y_test, verbose=0)
print(f"Accuracy en test: {test_acc:.4f}")  # ~0.98

# ── PREDECIR ──────────────────────────────
predicciones = modelo.predict(X_test[:5])
clases = np.argmax(predicciones, axis=1)
print(f"Predicciones: {clases}")
print(f"Real:         {y_test[:5]}")

# Guardar el modelo
modelo.save("modelo_mnist.keras")
modelo_cargado = keras.models.load_model("modelo_mnist.keras")`,
      practicalTips: [
        "Empieza siempre con un modelo simple — agregar complejidad solo si los resultados no son suficientes.",
        "EarlyStopping con restore_best_weights=True evita el sobreentrenamiento automáticamente.",
        "La normalización de inputs ([0,1] o media 0 std 1) es casi siempre necesaria.",
        "Para proyectos reales, usa modelos preentrenados (transfer learning) — no entrenes desde cero.",
      ],
      commonMistakes: [
        "No normalizar los datos de entrada — las redes son muy sensibles a la escala.",
        "Entrenando con todos los datos sin validation set — no puedes saber si estás haciendo overfitting.",
        "Usar demasiadas capas desde el principio — empieza simple.",
      ],
      resources: [
        { title: "TensorFlow/Keras: Quickstart", url: "https://www.tensorflow.org/tutorials/quickstart/beginner", type: "doc" },
        { title: "fast.ai: Practical Deep Learning", url: "https://course.fast.ai/", type: "article" },
      ],
    },

    // ════════════════════════════════════════
    // AWS
    // ════════════════════════════════════════
    {
      name: "Fundamentos de cloud y regiones",
      slug: "aws-fundamentals",
      level: "BEGINNER" as const,
      subjectId: aws.id,
      description: "AWS es la plataforma cloud más grande del mundo. Entender su modelo de responsabilidad compartida, regiones, zonas de disponibilidad y los modelos IaaS/PaaS/SaaS es la base de todo lo demás.",
      whyMatters: "AWS tiene más del 32% del mercado cloud global. Conocer sus fundamentos abre puertas a roles de backend, DevOps, arquitectura y data engineering. Es la habilidad cloud más demandada del mercado.",
      explanation: `Cloud computing es alquilar infraestructura en lugar de comprarla. AWS opera 99 zonas de disponibilidad (AZs) en 31 regiones geográficas. Distribuir tu aplicación en múltiples AZs la hace resistente a fallos de hardware.

El **modelo de responsabilidad compartida** define qué seguridad gestiona AWS (física, hipervisor, red) y qué eres tú quien gestiona (configuración, datos, identidad).`,
      codeExample: `// AWS CLI — comandos básicos de orientación
// Verificar identidad configurada
aws sts get-caller-identity

// Listar regiones disponibles
aws ec2 describe-regions --query "Regions[].RegionName" --output table

// Ver zonas de disponibilidad en la región actual
aws ec2 describe-availability-zones --query "AvailabilityZones[].ZoneName"

// Modelos de servicio en AWS:
// IaaS (Infrastructure as Service):
//   EC2 — servidores virtuales que gestionas tú
//   EBS — discos virtuales
//   VPC — redes virtuales
//
// PaaS (Platform as Service):
//   RDS — base de datos gestionada (parches, backups: AWS)
//   Lambda — código serverless sin gestionar servidores
//   Elastic Beanstalk — deploy de apps sin gestionar infraestructura
//
// SaaS (Software as Service):
//   Amazon WorkMail — email gestionado
//   Amazon Chime — videoconferencias

// Modelo de precios AWS:
// - Pay-as-you-go: pagas solo lo que usas
// - Reserved: compromiso de 1-3 años, hasta 72% descuento
// - Spot: capacidad no usada de AWS, hasta 90% descuento`,
      practicalTips: [
        "Elige siempre la región más cercana a tus usuarios para menor latencia — us-east-1 es la más barata pero no siempre la mejor.",
        "Nunca uses la cuenta root para operaciones del día a día — crea usuarios IAM con el mínimo privilegio necesario.",
        "Activa el free tier alert en Billing para no llevarte sorpresas al fin de mes.",
        "Multi-AZ para aplicaciones de producción — una sola AZ es un single point of failure.",
      ],
      commonMistakes: [
        "Usar las credenciales root de AWS para todo — es el riesgo de seguridad más grave.",
        "No activar MFA en la cuenta root y usuarios con privilegios elevados.",
        "Olvidar apagar recursos de prueba — EC2, RDS y NAT Gateway corren aunque no los uses.",
      ],
      resources: [
        { title: "AWS: Infraestructura global", url: "https://aws.amazon.com/es/about-aws/global-infrastructure/", type: "doc" },
        { title: "AWS: Modelo de responsabilidad compartida", url: "https://aws.amazon.com/es/compliance/shared-responsibility-model/", type: "doc" },
        { title: "AWS Free Tier", url: "https://aws.amazon.com/es/free/", type: "doc" },
      ],
    },

    {
      name: "IAM y gestión de permisos",
      slug: "aws-iam",
      level: "BEGINNER" as const,
      subjectId: aws.id,
      description: "IAM (Identity and Access Management) es el sistema de seguridad central de AWS. Controla quién puede hacer qué en tu cuenta mediante usuarios, grupos, roles y políticas.",
      whyMatters: "Una configuración incorrecta de IAM es la causa más común de brechas de seguridad en AWS. Entenderlo correctamente desde el principio te ahorra problemas costosos en producción.",
      explanation: `IAM funciona con el **principio de mínimo privilegio**: cada entidad (usuario, servicio, aplicación) tiene solo los permisos que necesita para hacer su trabajo, nada más.

Los **roles** son especialmente importantes: en lugar de crear credenciales para que EC2 acceda a S3, le asignas un rol. Las credenciales rotan automáticamente y nunca se exponen.`,
      codeExample: `// ── POLÍTICA IAM (JSON) ───────────────────
// Ejemplo: permitir a una Lambda leer de S3 y escribir en DynamoDB
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LeerS3",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::mi-bucket",
        "arn:aws:s3:::mi-bucket/*"
      ]
    },
    {
      "Sid": "EscribirDynamoDB",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:UpdateItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789:table/mi-tabla"
    }
  ]
}

// ── AWS CLI: crear y gestionar IAM ────────
// Crear usuario
aws iam create-user --user-name developer-ana

// Crear grupo y asignar política
aws iam create-group --group-name developers
aws iam attach-group-policy --group-name developers \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

// Agregar usuario al grupo
aws iam add-user-to-group --user-name developer-ana --group-name developers

// Crear rol para EC2 (trust policy)
aws iam create-role --role-name EC2-S3-Role \\
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }]
  }'

// Asignar política al rol
aws iam attach-role-policy --role-name EC2-S3-Role \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`,
      practicalTips: [
        "Nunca crees credenciales de acceso (access keys) para servicios de AWS — usa roles IAM siempre.",
        "Usa AWS IAM Access Analyzer para detectar permisos demasiado amplios automáticamente.",
        "Activa CloudTrail para auditar quién hace qué en tu cuenta — es esencial para debugging de permisos.",
        "Las políticas de AWS siguen el principio de deny por defecto — todo está denegado hasta que lo permites explícitamente.",
      ],
      commonMistakes: [
        "Usar AdministratorAccess para todo — el principio de mínimo privilegio existe por una razón.",
        "Hardcodear access keys en el código — usa roles IAM para servicios de AWS.",
        "No rotar las access keys de usuarios IAM regularmente.",
        "Confundir políticas de permisos (qué puedes hacer) con políticas de confianza (quién puede asumir el rol).",
      ],
      resources: [
        { title: "AWS IAM: Guía del usuario", url: "https://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/introduction.html", type: "doc" },
        { title: "AWS: Mejores prácticas de IAM", url: "https://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/best-practices.html", type: "doc" },
      ],
    },

    {
      name: "EC2 y cómputo en la nube",
      slug: "aws-ec2",
      level: "BEGINNER" as const,
      subjectId: aws.id,
      description: "EC2 (Elastic Compute Cloud) son servidores virtuales en AWS. Puedes elegir el tipo de instancia (CPU, RAM), el sistema operativo, almacenamiento y red según las necesidades de tu aplicación.",
      whyMatters: "EC2 es el servicio más fundamental de AWS. Aunque Lambda y contenedores son populares, EC2 sigue siendo la base de muchas arquitecturas y es el contexto donde cobra sentido todo lo demás.",
      explanation: `Una instancia EC2 es un servidor virtual. Eliges:
- **Tipo**: t3.micro (desarrollo), m5.large (producción general), c5.xlarge (CPU-intensivo)
- **AMI**: imagen del sistema operativo (Amazon Linux, Ubuntu, Windows)
- **Storage**: EBS para persistencia
- **Red**: VPC, subnets, security groups

Las instancias Spot son idénticas pero hasta 90% más baratas — ideales para batch jobs, ML training, CI/CD.`,
      codeExample: `// ── LANZAR INSTANCIA CON AWS CLI ─────────
aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\     # Amazon Linux 2 AMI
  --instance-type t3.micro \\
  --key-name mi-par-de-claves \\
  --security-group-ids sg-12345678 \\
  --subnet-id subnet-12345678 \\
  --user-data '#!/bin/bash
    yum update -y
    yum install -y nodejs
    npm install -g pm2' \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=mi-servidor}]'

// ── CONECTAR POR SSH ──────────────────────
// ssh -i "mi-par-de-claves.pem" ec2-user@ip-publica

// ── SECURITY GROUP ─────────────────────────
// Reglas de entrada necesarias:
aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 22 \\
  --cidr 0.0.0.0/0   // SSH — en producción, solo tu IP

aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 80 \\
  --cidr 0.0.0.0/0   // HTTP público

aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0   // HTTPS público

// ── TIPOS DE INSTANCIAS COMUNES ───────────
// Prefijo  Caso de uso
// t3       Propósito general, desarrollo, apps pequeñas (burstable)
// m6i      Producción de propósito general (memoria y CPU balanceados)
// c6i      CPU-intensivo: servidores web, gaming, ML inferencia
// r6i      Memory-intensivo: BD en memoria, caches grandes
// p3/p4    GPU: ML training, renderizado`,
      practicalTips: [
        "Usa t3.micro/t3.small para desarrollo — están dentro del free tier y son suficientes para proyectos personales.",
        "Configura el auto-stop con AWS Instance Scheduler o Lambda para apagar instancias de dev fuera del horario de trabajo.",
        "User data es el script que se ejecuta al lanzar la instancia — úsalo para instalar dependencias automáticamente.",
        "Elastic IP para tener una IP fija — la IP pública cambia si reinicias la instancia sin Elastic IP.",
      ],
      commonMistakes: [
        "Olvidar terminar instancias de prueba — siguen facturando aunque no las uses.",
        "Abrir el puerto 22 (SSH) a 0.0.0.0/0 en producción — solo permite tu IP.",
        "No usar múltiples AZs para alta disponibilidad en producción.",
      ],
      resources: [
        { title: "AWS EC2: Guía del usuario", url: "https://docs.aws.amazon.com/es_es/AWSEC2/latest/UserGuide/EC2_GetStarted.html", type: "doc" },
        { title: "AWS: Tipos de instancias EC2", url: "https://aws.amazon.com/es/ec2/instance-types/", type: "doc" },
      ],
    },

    {
      name: "S3 y almacenamiento",
      slug: "aws-s3",
      level: "BEGINNER" as const,
      subjectId: aws.id,
      description: "S3 (Simple Storage Service) es el servicio de almacenamiento de objetos de AWS. Almacena archivos de cualquier tamaño con 99.999999999% (11 nueves) de durabilidad.",
      whyMatters: "S3 se usa para casi todo: almacenar imágenes subidas por usuarios, alojar sitios web estáticos, archivar backups, distribuir assets, guardar logs. Es uno de los servicios más usados de AWS.",
      explanation: `S3 organiza los datos en **buckets** (contenedores) con **objetos** (archivos). Cada objeto tiene una clave (ruta), el contenido y metadatos.

Las **clases de almacenamiento** permiten optimizar costos: S3 Standard para acceso frecuente, S3 Infrequent Access para archivos que se acceden poco, S3 Glacier para archivos de largo plazo.`,
      codeExample: `// ── AWS CLI: operaciones básicas de S3 ────
// Crear bucket
aws s3 mb s3://mi-bucket-unico-2024

// Subir archivo
aws s3 cp archivo.jpg s3://mi-bucket/imagenes/foto.jpg

// Subir directorio completo
aws s3 sync ./dist s3://mi-bucket/web --delete

// Listar objetos
aws s3 ls s3://mi-bucket/imagenes/

// Descargar
aws s3 cp s3://mi-bucket/imagenes/foto.jpg ./descargada.jpg

// Hacer objeto público
aws s3api put-object-acl \\
  --bucket mi-bucket \\
  --key imagenes/foto.jpg \\
  --acl public-read

// ── SDK de Node.js ────────────────────────
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

// Subir archivo
async function subirArchivo(buffer: Buffer, clave: string, tipo: string) {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: clave,
    Body: buffer,
    ContentType: tipo,
  }));
  return \`https://\${process.env.S3_BUCKET}.s3.amazonaws.com/\${clave}\`;
}

// URL firmada para upload directo desde el browser (sin pasar por servidor)
async function generarUrlSubida(clave: string, tipo: string): Promise<string> {
  const comando = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: clave,
    ContentType: tipo,
  });

  return getSignedUrl(s3, comando, { expiresIn: 300 }); // 5 minutos
}

// URL firmada para descarga privada
async function generarUrlDescarga(clave: string): Promise<string> {
  const comando = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: clave,
  });

  return getSignedUrl(s3, comando, { expiresIn: 3600 }); // 1 hora
}`,
      practicalTips: [
        "Las presigned URLs son la forma correcta de que el frontend suba archivos directamente a S3 — sin pasar por tu servidor y sin exponer credenciales.",
        "Activa versionado en buckets importantes — permite recuperar archivos eliminados o sobreescritos.",
        "Usa lifecycle rules para mover automáticamente objetos viejos a clases más baratas (Glacier).",
        "Los nombres de bucket son globales en AWS — elige nombres descriptivos y únicos.",
      ],
      commonMistakes: [
        "Hacer un bucket completamente público sin necesidad — expone todos los datos.",
        "No configurar CORS en S3 cuando el frontend accede directamente al bucket.",
        "Guardar credenciales de AWS en el frontend para subir a S3 — usa presigned URLs.",
      ],
      resources: [
        { title: "AWS S3: Guía del desarrollador", url: "https://docs.aws.amazon.com/es_es/AmazonS3/latest/userguide/Welcome.html", type: "doc" },
        { title: "AWS SDK v3 para JavaScript — S3", url: "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/", type: "doc" },
      ],
    },

    {
      name: "Lambda y serverless",
      slug: "aws-lambda",
      level: "INTERMEDIATE" as const,
      subjectId: aws.id,
      description: "AWS Lambda ejecuta código sin que tengas que gestionar servidores. Solo pagas por el tiempo de ejecución. Es el servicio central de la arquitectura serverless en AWS.",
      whyMatters: "Lambda permite crear backends que escalan automáticamente de 0 a millones de peticiones, con costo casi nulo en proyectos pequeños. Es la base de arquitecturas modernas event-driven.",
      explanation: `Lambda ejecuta tu función cuando se dispara un evento: una petición HTTP, un mensaje en SQS, un archivo subido a S3, un timer, etc.

**Cold start**: la primera invocación después de un periodo de inactividad es más lenta (~200-1000ms) porque Lambda necesita iniciar el contenedor. Para funciones críticas, usa Provisioned Concurrency.

**Límites importantes**: 15 minutos máximo de ejecución, 10GB de memoria, 250MB de código desplegado.`,
      codeExample: `// ── FUNCIÓN LAMBDA BÁSICA ─────────────────
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const { pathParameters, body, queryStringParameters } = event;
    const id = pathParameters?.id;
    const datos = body ? JSON.parse(body) : null;

    // Tu lógica aquí
    const resultado = await procesarPeticion(id, datos);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(resultado),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno" }),
    };
  }
};

// ── LAMBDA PARA PROCESAR SQS ──────────────
import { SQSHandler, SQSEvent } from "aws-lambda";

export const procesarCola: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const mensaje = JSON.parse(record.body);
    console.log("Procesando:", mensaje);

    try {
      await procesarMensaje(mensaje);
    } catch (error) {
      // Si lanzas error, SQS reintentará el mensaje
      console.error("Error procesando:", error);
      throw error;
    }
  }
};

// ── LAMBDA PARA S3 EVENTS ─────────────────
import { S3Handler } from "aws-lambda";

export const procesarImagen: S3Handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);
    console.log(\`Nueva imagen: \${bucket}/\${key}\`);
    await redimensionarImagen(bucket, key);
  }
};

// ── SERVERLESS FRAMEWORK (serverless.yml) ──
// functions:
//   api:
//     handler: src/api.handler
//     events:
//       - httpApi:
//           path: /usuarios/{id}
//           method: GET
//     environment:
//       DATABASE_URL: ${env:DATABASE_URL}`,
      practicalTips: [
        "Inicializa conexiones a BD y clientes de AWS fuera del handler — se reutilizan entre invocaciones en el mismo contenedor.",
        "Mantén el bundle pequeño — menos código = cold starts más rápidos. Usa esbuild para tree-shaking.",
        "Las variables de entorno en Lambda se encriptan con KMS automáticamente — es seguro usarlas para secretos básicos.",
        "CloudWatch Logs captura automáticamente console.log — úsalo para debugging en producción.",
      ],
      commonMistakes: [
        "Crear la conexión a la BD dentro del handler — una nueva conexión por invocación, agota el pool.",
        "Timeout demasiado corto para funciones que hacen peticiones externas.",
        "No manejar errores en funciones de SQS — el mensaje se reintenta hasta el DLQ.",
        "Olvidar cerrar conexiones correctamente — Lambda puede reutilizar el contenedor.",
      ],
      resources: [
        { title: "AWS Lambda: Guía del desarrollador", url: "https://docs.aws.amazon.com/es_es/lambda/latest/dg/welcome.html", type: "doc" },
        { title: "Serverless Framework: Documentación", url: "https://www.serverless.com/framework/docs", type: "doc" },
      ],
    },

    {
      name: "API Gateway",
      slug: "aws-api-gateway",
      level: "INTERMEDIATE" as const,
      subjectId: aws.id,
      description: "API Gateway es el servicio de AWS para crear, publicar y gestionar APIs HTTP y REST. Se integra nativamente con Lambda para crear APIs serverless sin gestionar servidores.",
      whyMatters: "API Gateway es la puerta de entrada de casi toda arquitectura serverless en AWS. Gestiona autenticación, throttling, CORS, logging y enrutamiento — todo sin código adicional.",
      explanation: `API Gateway actúa como un reverse proxy gestionado: recibe las peticiones HTTP de los clientes, las enruta a Lambda (u otros backends) y devuelve las respuestas.

**HTTP API vs REST API**: HTTP API es más nuevo, más barato (70% menos) y más simple. REST API tiene más funcionalidades (caché, validación de request, uso plans). Para la mayoría de casos, usa HTTP API.`,
      codeExample: `// ── serverless.yml — HTTP API con Lambda ──
// provider:
//   name: aws
//   httpApi:
//     cors: true                    // CORS automático
//     authorizers:
//       cognitoAuthorizer:
//         identitySource: $request.header.Authorization
//         issuerUrl: !Sub https://cognito-idp.${AWS::Region}.amazonaws.com/${CognitoUserPoolId}
//         audience: !Ref CognitoUserPoolClient
//
// functions:
//   getUsuario:
//     handler: src/usuarios.get
//     events:
//       - httpApi:
//           path: /usuarios/{id}
//           method: GET
//           authorizer:
//             name: cognitoAuthorizer
//
//   createUsuario:
//     handler: src/usuarios.create
//     events:
//       - httpApi:
//           path: /usuarios
//           method: POST

// ── FUNCIÓN LAMBDA PARA API GATEWAY ───────
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const get: APIGatewayProxyHandlerV2 = async (event) => {
  const { id } = event.pathParameters ?? {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID requerido" }),
    };
  }

  // El usuario autenticado viene en el contexto (si usas Cognito)
  const userId = event.requestContext.authorizer?.jwt?.claims?.sub;

  const usuario = await prisma.usuario.findUnique({ where: { id } });

  if (!usuario) {
    return { statusCode: 404, body: JSON.stringify({ error: "No encontrado" }) };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };
};

// ── THROTTLING Y RATE LIMITING ────────────
// En serverless.yml o CloudFormation:
// httpApi:
//   throttling:
//     burstLimit: 200    # peticiones simultáneas máximas
//     rateLimit: 100     # peticiones por segundo`,
      practicalTips: [
        "Usa HTTP API en lugar de REST API para nuevos proyectos — más barato y suficiente para la mayoría de casos.",
        "Configura CORS a nivel de API Gateway, no en Lambda — es más eficiente y no requiere código.",
        "El throttling de API Gateway protege tu Lambda de picos de tráfico inesperados.",
        "Usa custom domain con certificado ACM para URLs profesionales en lugar del dominio generado por AWS.",
      ],
      commonMistakes: [
        "No configurar CORS y tener errores en el frontend — configúralo desde el principio.",
        "Tener el mismo timeout en API Gateway y Lambda — API Gateway tiene un máximo de 29 segundos.",
        "Exponer la URL de API Gateway directamente — usa un custom domain para que sea estable.",
      ],
      resources: [
        { title: "AWS API Gateway: HTTP API", url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html", type: "doc" },
        { title: "AWS: Elegir entre HTTP API y REST API", url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html", type: "doc" },
      ],
    },

    {
      name: "RDS y bases de datos",
      slug: "aws-rds",
      level: "INTERMEDIATE" as const,
      subjectId: aws.id,
      description: "RDS (Relational Database Service) gestiona bases de datos relacionales en AWS. Se encarga automáticamente de backups, parches, alta disponibilidad y escalado.",
      whyMatters: "Gestionar una base de datos en producción es complejo: backups, replicación, actualizaciones de seguridad, failover. RDS hace todo eso automáticamente para que tú te concentres en el negocio.",
      explanation: `RDS soporta PostgreSQL, MySQL, MariaDB, Oracle y SQL Server. Amazon Aurora es la versión de AWS compatible con MySQL/PostgreSQL pero con rendimiento 3-5x superior.

**Multi-AZ**: RDS mantiene una réplica sincrónica en otra AZ. Si la primaria falla, el failover es automático en ~60 segundos.

**Read Replicas**: réplicas asíncronas solo de lectura para escalar consultas de lectura.`,
      codeExample: `// ── CREAR RDS CON AWS CLI ──────────────────
aws rds create-db-instance \\
  --db-instance-identifier mi-base-datos \\
  --db-instance-class db.t3.micro \\         // free tier
  --engine postgres \\
  --engine-version 15.4 \\
  --master-username admin \\
  --master-user-password \${DB_PASSWORD} \\
  --allocated-storage 20 \\                  // GB
  --storage-type gp3 \\
  --vpc-security-group-ids sg-12345678 \\
  --db-subnet-group-name mi-subnet-group \\
  --no-publicly-accessible \\               // solo acceso desde VPC
  --backup-retention-period 7 \\            // backups por 7 días
  --multi-az                               // alta disponibilidad

// ── CONECTAR DESDE NODE.JS ────────────────
// La URL de conexión viene de Secrets Manager, no hardcodeada
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

async function obtenerConnectionString(): Promise<string> {
  const client = new SecretsManagerClient({ region: "us-east-1" });
  const response = await client.send(new GetSecretValueCommand({
    SecretId: "rds/mi-base-datos/credentials",
  }));
  const { username, password, host, port, dbname } = JSON.parse(response.SecretString!);
  return \`postgresql://\${username}:\${password}@\${host}:\${port}/\${dbname}\`;
}

// ── ESTRATEGIA DE CONEXIÓN EN LAMBDA ──────
// Lambda crea muchas conexiones simultáneas — usa RDS Proxy
// RDS Proxy gestiona el pool de conexiones para Lambda
//
// Sin RDS Proxy: 1000 Lambdas = 1000 conexiones a PostgreSQL
// Con RDS Proxy: 1000 Lambdas = ~50 conexiones gestionadas
//
// En serverless.yml:
// provider:
//   environment:
//     DATABASE_URL: !Sub
//       - "postgresql://user:pass@\${ProxyEndpoint}/mydb"
//       - ProxyEndpoint: !GetAtt RDSProxy.Endpoint`,
      practicalTips: [
        "Nunca accedas a RDS desde internet — siempre dentro de una VPC privada.",
        "Usa RDS Proxy si conectas desde Lambda — evita agotamiento de conexiones.",
        "Aurora Serverless v2 escala automáticamente ACUs — bueno para cargas variables.",
        "Parameter Groups para configurar PostgreSQL (max_connections, shared_buffers) según el tipo de instancia.",
      ],
      commonMistakes: [
        "RDS públicamente accesible en producción — enorme riesgo de seguridad.",
        "No configurar Multi-AZ para bases de datos de producción.",
        "Crear demasiadas conexiones desde Lambda sin RDS Proxy — puede crashear PostgreSQL.",
      ],
      resources: [
        { title: "AWS RDS: Guía del usuario", url: "https://docs.aws.amazon.com/es_es/AmazonRDS/latest/UserGuide/Welcome.html", type: "doc" },
        { title: "AWS RDS Proxy", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html", type: "doc" },
      ],
    },

    {
      name: "VPC y networking",
      slug: "aws-vpc",
      level: "INTERMEDIATE" as const,
      subjectId: aws.id,
      description: "VPC (Virtual Private Cloud) es tu red privada en AWS. Controlas el rango de IPs, las subnets, las tablas de rutas y qué puede comunicarse con qué.",
      whyMatters: "Una arquitectura de red mal diseñada en AWS puede exponer servicios que deben ser privados o crear cuellos de botella de conectividad. Entender VPC es prerequisito para cualquier infraestructura de producción.",
      explanation: `Una VPC bien diseñada tiene dos tipos de subnets:
- **Subnets públicas**: tienen acceso directo a internet (Internet Gateway). Para load balancers, NAT Gateways.
- **Subnets privadas**: sin acceso directo a internet. Para aplicaciones, bases de datos. Acceden a internet mediante NAT Gateway.

Este diseño asegura que tus servidores de aplicación y bases de datos nunca sean accesibles directamente desde internet.`,
      codeExample: `// ── DISEÑO DE VPC PARA PRODUCCIÓN ─────────
// Región: us-east-1
// CIDR: 10.0.0.0/16 (65,536 IPs)
//
// AZ us-east-1a:
//   Subnet pública:   10.0.1.0/24  (load balancer, NAT)
//   Subnet privada:   10.0.2.0/24  (aplicación)
//   Subnet de datos:  10.0.3.0/24  (RDS, ElastiCache)
//
// AZ us-east-1b:
//   Subnet pública:   10.0.4.0/24
//   Subnet privada:   10.0.5.0/24
//   Subnet de datos:  10.0.6.0/24

// ── AWS CLI: crear VPC básica ──────────────
// Crear VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=mi-vpc}]'

// Crear subnets
aws ec2 create-subnet \\
  --vpc-id vpc-12345 \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone us-east-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=publica-1a}]'

// Internet Gateway para subnets públicas
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --internet-gateway-id igw-123 --vpc-id vpc-123

// Security Groups — firewall por instancia
// Regla: solo el Load Balancer puede hablar con la App
aws ec2 create-security-group \\
  --group-name app-sg \\
  --description "Servidores de aplicación" \\
  --vpc-id vpc-12345

// Solo permite tráfico desde el security group del Load Balancer
aws ec2 authorize-security-group-ingress \\
  --group-id sg-app \\
  --protocol tcp \\
  --port 3000 \\
  --source-group sg-load-balancer   // no IPs, sino el SG del LB

// RDS solo permite acceso desde App
aws ec2 authorize-security-group-ingress \\
  --group-id sg-rds \\
  --protocol tcp \\
  --port 5432 \\
  --source-group sg-app`,
      practicalTips: [
        "Siempre 2+ AZs para alta disponibilidad — una por AZ para cada tipo de subnet.",
        "Security Groups son stateful (si permites entrada, la salida automáticamente está permitida). NACLs son stateless.",
        "VPC Endpoints para acceder a S3 y DynamoDB sin salir a internet — más seguro y sin costo de NAT.",
        "NAT Gateway (no NAT Instance) para subnets privadas que necesitan acceso a internet — más confiable y simple.",
      ],
      commonMistakes: [
        "Una sola AZ para toda la infraestructura — single point of failure.",
        "Security Groups demasiado permisivos (0.0.0.0/0 para todo) en subnets privadas.",
        "No usar VPC Endpoints para servicios de AWS — el tráfico sale y entra por internet pagando NAT.",
      ],
      resources: [
        { title: "AWS VPC: Guía del usuario", url: "https://docs.aws.amazon.com/es_es/vpc/latest/userguide/what-is-amazon-vpc.html", type: "doc" },
        { title: "AWS: VPC con subnets públicas y privadas", url: "https://docs.aws.amazon.com/es_es/vpc/latest/userguide/VPC_Scenario2.html", type: "doc" },
      ],
    },

    {
      name: "CloudFormation e IaC",
      slug: "aws-cloudformation",
      level: "ADVANCED" as const,
      subjectId: aws.id,
      description: "CloudFormation permite definir toda tu infraestructura AWS como código YAML/JSON. Infrastructure as Code garantiza ambientes reproducibles, versionados y auditables.",
      whyMatters: "Crear infraestructura manualmente desde la consola es error-prone e irrepetible. Con IaC, toda tu infraestructura vive en Git, puedes recrearla exactamente en minutos y tienes historial de cambios.",
      explanation: `CloudFormation define **stacks** — colecciones de recursos AWS que se crean, actualizan y eliminan juntos. Es declarativo: defines qué quieres, no cómo crearlo.

**SAM** (Serverless Application Model) es una extensión de CloudFormation específica para serverless. **CDK** (Cloud Development Kit) permite definir infraestructura con código TypeScript/Python en lugar de YAML.`,
      codeExample: `# ── CLOUDFORMATION TEMPLATE ──────────────
AWSTemplateFormatVersion: "2010-09-09"
Description: "API serverless con Lambda, API Gateway y DynamoDB"

Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
    Default: dev

Resources:
  # DynamoDB Table
  TablaUsuarios:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub "usuarios-\${Environment}"
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true

  # Lambda Role
  RolLambda:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
      Policies:
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Query"]
                Resource: !GetAtt TablaUsuarios.Arn

  # Lambda Function
  FuncionApi:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Sub "api-usuarios-\${Environment}"
      Runtime: nodejs20.x
      Handler: index.handler
      Role: !GetAtt RolLambda.Arn
      Code:
        S3Bucket: !Ref BucketCodigo
        S3Key: lambda.zip
      Environment:
        Variables:
          TABLA_USUARIOS: !Ref TablaUsuarios
          ENVIRONMENT: !Ref Environment

Outputs:
  TablaUsuariosArn:
    Value: !GetAtt TablaUsuarios.Arn
    Export:
      Name: !Sub "\${AWS::StackName}-TablaUsuariosArn"

# ── DEPLOY ────────────────────────────────
# aws cloudformation deploy \\
#   --template-file template.yaml \\
#   --stack-name mi-api-dev \\
#   --parameter-overrides Environment=dev \\
#   --capabilities CAPABILITY_IAM`,
      practicalTips: [
        "Usa parámetros y condiciones para reutilizar el mismo template en dev, staging y prod.",
        "DeletionPolicy: Retain en recursos críticos (RDS, S3) — evita borrado accidental al eliminar el stack.",
        "Outputs para exportar valores entre stacks — evita hardcodear ARNs.",
        "Para proyectos nuevos, considera CDK — misma potencia que CloudFormation pero con TypeScript.",
      ],
      commonMistakes: [
        "Hardcodear ARNs y nombres de recursos — usa !Ref, !GetAtt y !Sub.",
        "No usar DeletionPolicy en bases de datos — si alguien elimina el stack, se pierde todo.",
        "Cambiar el nombre lógico de un recurso en el template — CloudFormation lo elimina y recrea.",
      ],
      resources: [
        { title: "AWS CloudFormation: Guía del usuario", url: "https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/Welcome.html", type: "doc" },
        { title: "AWS CDK: Guía del desarrollador", url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html", type: "doc" },
      ],
    }