// ============================================
// DINO REQUERIMIENTOS - LEAN EDITION
// Con preguntas definitivas, cinemática mejorada y panel HTML
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ============================================
// PREGUNTAS DE LEAN (26 preguntas únicas)
// ============================================
const PREGUNTAS = [
    { id: 1, texto: "¿Cuál es el objetivo principal de Lean?", opciones: ["Aumentar la cantidad de empleados", "Maximizar el valor para el cliente eliminando desperdicios", "Generar más documentación", "Producir la mayor cantidad posible de productos"], correcta: 1, materia: "LEAN" },
    { id: 2, texto: "¿Dónde nació la metodología Lean?", opciones: ["Google", "Microsoft", "Toyota, en Japón", "Amazon"], correcta: 2, materia: "LEAN" },
    { id: 3, texto: "¿Qué significa el principio de 'Definir el valor'?", opciones: ["Determinar cuánto cuesta el producto", "Entender qué es lo que realmente valora el cliente", "Calcular las ganancias de la empresa", "Diseñar el producto más complejo posible"], correcta: 1, materia: "LEAN" },
    { id: 4, texto: "¿Qué busca eliminar Lean?", opciones: ["Los clientes", "Las ventas", "Los desperdicios o actividades que no aportan valor", "Los productos terminados"], correcta: 2, materia: "LEAN" },
    { id: 5, texto: "¿Qué es el sistema Pull?", opciones: ["Producir solo cuando existe una demanda real", "Trabajar más rápido que la competencia", "Contratar más personal", "Fabricar grandes cantidades por adelantado"], correcta: 0, materia: "LEAN" },
    { id: 6, texto: "¿Cómo se llama la mejora continua en Lean?", opciones: ["Scrum", "Kanban", "Kaizen", "Sprint"], correcta: 2, materia: "LEAN" },
    { id: 7, texto: "¿Cuál de las siguientes opciones es uno de los siete desperdicios de Lean?", opciones: ["Innovación", "Sobreproducción", "Capacitación", "Retroalimentación"], correcta: 1, materia: "LEAN" },
    { id: 8, texto: "¿Quién define qué actividades generan valor?", opciones: ["El gerente", "El líder Lean", "El cliente", "El programador"], correcta: 2, materia: "LEAN" },
    { id: 9, texto: "¿Cuál es una ventaja de Lean?", opciones: ["Mayor desperdicio de recursos", "Menor flexibilidad", "Entregas más rápidas y mejor adaptación a cambios", "Más burocracia"], correcta: 2, materia: "LEAN" },
    { id: 10, texto: "¿Qué significa 'Muda' en Lean?", opciones: ["Mejora continua", "Desperdicio", "Cliente", "Calidad"], correcta: 1, materia: "LEAN" },
    { id: 11, texto: "¿Cuál de estas actividades agrega valor para el cliente en una app?", opciones: ["Reuniones innecesarias", "Tareas duplicadas", "Que la aplicación funcione correctamente", "Esperas entre procesos"], correcta: 2, materia: "LEAN" },
    { id: 12, texto: "¿Qué busca el principio de flujo continuo?", opciones: ["Que el trabajo avance sin interrupciones innecesarias", "Que todos trabajen más horas", "Que se fabriquen más productos", "Que existan más reuniones"], correcta: 0, materia: "LEAN" },
    { id: 13, texto: "¿Qué ocurre cuando una empresa tiene exceso de inventario?", opciones: ["Siempre aumenta sus ganancias", "Genera costos y riesgos innecesarios", "Mejora automáticamente la calidad", "Reduce desperdicios"], correcta: 1, materia: "LEAN" },
    { id: 14, texto: "¿Qué característica diferencia a Lean de muchas metodologías tradicionales?", opciones: ["No acepta cambios", "Solo trabaja al final del proyecto", "Realiza entregas incrementales y acepta cambios", "Exige una planificación rígida"], correcta: 2, materia: "LEAN" },
    { id: 15, texto: "¿Quiénes suelen conocer mejor los problemas del proceso?", opciones: ["Los clientes", "Los directivos", "Las personas que realizan el trabajo diariamente", "Los proveedores"], correcta: 2, materia: "LEAN" },
    { id: 16, texto: "¿Cuál de las siguientes NO es una ventaja de Lean?", opciones: ["Reducción de desperdicios", "Mayor rapidez en las entregas", "Adaptación a cambios", "Acumulación de inventario"], correcta: 3, materia: "LEAN" },
    { id: 17, texto: "¿Qué desperdicio ocurre cuando una persona debe esperar una aprobación para continuar trabajando?", opciones: ["Defectos", "Esperas", "Sobreproducción", "Inventario"], correcta: 1, materia: "LEAN" },
    { id: 18, texto: "¿Qué empresa es considerada el caso más famoso de implementación de Lean?", opciones: ["Netflix", "Samsung", "Toyota", "Facebook"], correcta: 2, materia: "LEAN" },
    { id: 19, texto: "¿Qué busca la mejora continua?", opciones: ["Mantener todo igual", "Mejorar constantemente procesos y productos", "Reducir la participación del equipo", "Aumentar la documentación"], correcta: 1, materia: "LEAN" },
    { id: 20, texto: "¿Cuál de estas reuniones es común en Lean?", opciones: ["Reunión Kaizen", "Reunión de casting", "Reunión de marketing obligatorio", "Reunión anual única"], correcta: 0, materia: "LEAN" },
    { id: 21, texto: "¿Qué significa entregar valor de forma incremental?", opciones: ["Entregar el producto completo al final", "Entregar partes funcionales progresivamente", "Entregar varias copias del mismo producto", "Entregar productos defectuosos"], correcta: 1, materia: "LEAN" },
    { id: 22, texto: "¿Qué desperdicio representan los errores que obligan a rehacer trabajo?", opciones: ["Transporte", "Defectos", "Inventario", "Esperas"], correcta: 1, materia: "LEAN" },
    { id: 23, texto: "¿Cuál es el papel de los directivos en Lean?", opciones: ["Ignorar las mejoras propuestas", "Apoyar la implementación y eliminar obstáculos", "Realizar todas las tareas del equipo", "Reemplazar al cliente"], correcta: 1, materia: "LEAN" },
    { id: 24, texto: "¿Qué principio aplica Toyota cuando produce solo lo necesario?", opciones: ["Kaizen", "Sistema Pull", "Sobreproducción", "Flujo interrumpido"], correcta: 1, materia: "LEAN" },
    { id: 25, texto: "¿Cuál de estas opciones NO forma parte de los siete desperdicios de Lean?", opciones: ["Sobreproducción", "Esperas", "Innovación", "Defectos"], correcta: 2, materia: "LEAN" },
    { id: 26, texto: "Lean se enfoca principalmente en:", opciones: ["Generar más documentos", "Cumplir un plan sin importar el cliente", "Generar valor para el cliente", "Realizar más reuniones"], correcta: 2, materia: "LEAN" }
];

const TOTAL_PREGUNTAS = PREGUNTAS.length;

// ============================================
// SOMBREROS COLECCIONABLES
// ============================================
const SOMBREROS = [
    { id: 0, nombre: "CASUAL", emoji: "🧢", desbloqueado: true },
    { id: 1, nombre: "CHISTERA", emoji: "🎩", desbloqueado: false },
    { id: 2, nombre: "CORONA", emoji: "👑", desbloqueado: false },
    { id: 3, nombre: "VAQUERO", emoji: "🤠", desbloqueado: false },
    { id: 4, nombre: "MAGO", emoji: "🧙", desbloqueado: false },
    { id: 5, nombre: "GRADUADO", emoji: "🎓", desbloqueado: false },
    { id: 6, nombre: "SOLERA PLAYA", emoji: "👒", desbloqueado: false },
    { id: 7, nombre: "MOÑO ROSA", emoji: "🎀", desbloqueado: false },
    { id: 8, nombre: "SCARY PUMPKIN", emoji: "🎃", desbloqueado: false },
    { id: 9, nombre: "TRAGEDY&COMEDY", emoji: "🎭", desbloqueado: false },
    { id: 10, nombre: "GORRO FIESTA", emoji: "🥳", desbloqueado: false },
    { id: 11, nombre: "WINRAR", emoji: "📚", desbloqueado: false },
    { id: 12, nombre: "ESTRELLA DORADA", emoji: "⭐", desbloqueado: false }
];

let skinEstrellaDesbloqueada = localStorage.getItem('skinEstrella') === 'true';
let skinActual = "normal";
let temporizadorMensaje = 0;
let mensajeTemporal = "";

// ============================================
// ESTADO DEL JUEGO
// ============================================
let juego = {
    pantalla: "menu",
    puntuacion: 0,
    record: localStorage.getItem('dinoRecord') ? parseInt(localStorage.getItem('dinoRecord')) : 0,
    intentos: 0,
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
    preguntasRespondidas: [],
    preguntasDisponibles: [],
    modoNoche: false,
    sombreroActual: 0,
    sombreros: JSON.parse(JSON.stringify(SOMBREROS)),
    cinematicFrame: 0,
    cinematicAltura: 0,
    puedeEsquivar: true,
    juegoPausado: false,
    juegoTerminado: false,
    juegoCompletado: false,
    errorShake: 0,
    confetti: []
};

let temporizadorMensaje = 0;
let mensajeTemporal = "";


// ============================================
// CONSTANTES
// ============================================
const GRAVEDAD = 0.7;
const VELOCIDAD_SALTO = -14;
const VELOCIDAD_BASE = 4;

let contadorObstaculos = 0;

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function reiniciarPreguntasDisponibles() {
    juego.preguntasDisponibles = mezclarArray([...PREGUNTAS]);
    juego.preguntasRespondidas = [];
    juego.respuestasCorrectas = 0;
    juego.respuestasIncorrectas = 0;
    juego.juegoCompletado = false;
    console.log("Preguntas disponibles al reiniciar:", juego.preguntasDisponibles.length);
}

function obtenerSiguientePregunta() {
    if (juego.preguntasDisponibles.length === 0) {
        console.log("No hay más preguntas disponibles");
        return null;
    }
    const pregunta = juego.preguntasDisponibles.shift();
    console.log("Obteniendo y eliminando pregunta ID:", pregunta.id, "Restantes:", juego.preguntasDisponibles.length);
    return pregunta;
}

function marcarPreguntaRespondida(preguntaId) {
    if (!juego.preguntasRespondidas.includes(preguntaId)) {
        juego.preguntasRespondidas.push(preguntaId);
    }
}

function mostrarMensaje(texto) {
    mensajeTemporal = texto;
    temporizadorMensaje = 90;
}

function crearConfetti(cantidad) {
    const colores = ['#FFD700', '#FF4D6D', '#4DE4FF', '#7DFF7D', '#FF99FF'];
    const confetti = [];
    for (let i = 0; i < cantidad; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: 2 + Math.random() * 3,
            size: 6 + Math.random() * 8,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            color: colores[Math.floor(Math.random() * colores.length)]
        });
    }
    return confetti;
}

function dibujarConfetti() {
    if (!juego.confetti || juego.confetti.length === 0) return;
    for (let i = juego.confetti.length - 1; i >= 0; i--) {
        const pieza = juego.confetti[i];
        pieza.x += pieza.vx;
        pieza.y += pieza.vy;
        pieza.rotation += pieza.rotationSpeed;
        pieza.vy += 0.08;
        if (pieza.y > canvas.height + 20) {
            juego.confetti.splice(i, 1);
            continue;
        }
        ctx.save();
        ctx.translate(pieza.x, pieza.y);
        ctx.rotate(pieza.rotation);
        ctx.fillStyle = pieza.color;
        ctx.fillRect(-pieza.size / 2, -pieza.size / 2, pieza.size, pieza.size);
        ctx.restore();
    }
}

function cambiarSombrero(direccion) {
    const desbloqueados = juego.sombreros.filter(s => s.desbloqueado);
    if (desbloqueados.length === 0) return;
    
    let idxActual = desbloqueados.findIndex(s => s.id === juego.sombreroActual);
    if (idxActual === -1) idxActual = 0;
    
    if (direccion === 'siguiente') {
        idxActual = (idxActual + 1) % desbloqueados.length;
    } else if (direccion === 'anterior') {
        idxActual = (idxActual - 1 + desbloqueados.length) % desbloqueados.length;
    }
    juego.sombreroActual = desbloqueados[idxActual].id;
    mostrarMensaje(`🎩 ${desbloqueados[idxActual].nombre} equipado`);
    actualizarPanelSombreros();
}

// ============================================
// FUNCIONES DEL PANEL HTML DE SOMBREROS
// ============================================
function actualizarPanelSombreros() {
    const contenedor = document.getElementById('sombrerosLista');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    juego.sombreros.forEach(s => {
        const item = document.createElement('div');
        item.className = `sombrero-item ${!s.desbloqueado ? 'bloqueado' : ''} ${s.id === juego.sombreroActual ? 'seleccionado' : ''}`;
        if (s.desbloqueado) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                juego.sombreroActual = s.id;
                mostrarMensaje(`🎩 ${s.nombre} equipado`);
                actualizarPanelSombreros();
            });
        } else {
            item.style.cursor = 'not-allowed';
        }
        const emojiSpan = document.createElement('span'); emojiSpan.className = 'sombrero-emoji'; emojiSpan.textContent = s.emoji;
        const nombreSpan = document.createElement('span'); nombreSpan.className = 'sombrero-nombre'; nombreSpan.textContent = s.nombre;
        const estadoSpan = document.createElement('span'); estadoSpan.className = 'sombrero-estado'; estadoSpan.textContent = s.desbloqueado ? (s.id === juego.sombreroActual ? '✓' : '') : '🔒';
        item.appendChild(emojiSpan); item.appendChild(nombreSpan); item.appendChild(estadoSpan);
        contenedor.appendChild(item);
    });
}

// ============================================
// CLASE DINOSAURIO (con skin estrella de 5 puntas)
// ============================================
class Dinosaurio {
    constructor() {
        this.x = 50;
        this.y = canvas.height - 90;
        this.ancho = 28;
        this.alto = 45;
        this.velY = 0;
        this.enSuelo = true;
        this.agachado = false;
        this.animacionPata = 0;
        this.saltando = false;
        this.escala = 1; // Para cinemática
    }
    
    saltar() {
        if (this.enSuelo && !this.agachado && juego.pantalla === "jugando" && juego.puedeEsquivar && !juego.juegoPausado && !juego.juegoCompletado) {
            this.velY = VELOCIDAD_SALTO;
            this.enSuelo = false;
            this.saltando = true;
            return true;
        }
        return false;
    }
    
    agachar(estaAgachado) {
        if (this.enSuelo && juego.pantalla === "jugando" && juego.puedeEsquivar && !juego.juegoPausado && !juego.juegoCompletado) {
            this.agachado = estaAgachado;
            if (estaAgachado) {
                this.ancho = 45;
                this.alto = 28;
                this.y = canvas.height - 73;
            } else {
                this.ancho = 28;
                this.alto = 45;
                this.y = canvas.height - 90;
            }
        }
    }
    
    saltoAutomatico() {
        if (this.enSuelo && !this.agachado) {
            this.velY = VELOCIDAD_SALTO;
            this.enSuelo = false;
            this.saltando = true;
        }
    }
    
    agachadoAutomatico() {
        if (this.enSuelo) {
            this.agachado = true;
            this.ancho = 45;
            this.alto = 28;
            this.y = canvas.height - 73;
            setTimeout(() => {
                if (this.agachado && juego.pantalla === "jugando") {
                    this.agachado = false;
                    this.ancho = 28;
                    this.alto = 45;
                    this.y = canvas.height - 90;
                }
            }, 500);
        }
    }
    
    actualizar() {
        if (!this.enSuelo) {
            this.velY += GRAVEDAD;
            this.y += this.velY;
        }
        
        if (this.y >= canvas.height - 90) {
            this.y = canvas.height - 90;
            this.velY = 0;
            this.enSuelo = true;
            this.saltando = false;
        }
        
        this.animacionPata = (this.animacionPata + 0.2) % (Math.PI * 2);
    }
    
    dibujar() {
        if (skinActual === "estrella" && skinEstrellaDesbloqueada) {
            // Estrella de 5 puntas (envolviendo al dinosaurio)
            const cx = this.x + this.ancho/2;
            const cy = this.y + this.alto/2;
            const rExt = 30;
            const rInt = 15;
            const puntas = 5;
            ctx.beginPath();
            for (let i = 0; i < puntas * 2; i++) {
                let radio = i % 2 === 0 ? rExt : rInt;
                let ang = Math.PI/2 + i * Math.PI / puntas;
                let x = cx + radio * Math.cos(ang);
                let y = cy + radio * Math.sin(ang);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = "#F1C40F";
            ctx.fill();
            ctx.strokeStyle = "#FFA500";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Cara (ojos, hocico) dentro de la estrella
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(this.x + this.ancho - 6, this.y + 10, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(this.x + this.ancho - 6, this.y + 10, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#2C3E50";
            ctx.fillRect(this.x + this.ancho - 10, this.y + 15, 8, 6);
            
            // Patitas (salen por debajo de la estrella)
            if (this.enSuelo) {
                const offset = Math.sin(this.animacionPata) * 2;
                ctx.fillStyle = "#F1C40F";
                ctx.fillRect(this.x + 5, this.y + this.alto, 6, 8);
                ctx.fillRect(this.x + 17 + offset, this.y + this.alto, 6, 8);
            }
        } else {
            // Skin normal
            ctx.fillStyle = juego.modoNoche ? '#4ECDC4' : '#2C3E50';
            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
            
            ctx.fillStyle = juego.modoNoche ? '#FFE66D' : 'white';
            ctx.beginPath();
            ctx.arc(this.x + this.ancho - 6, this.y + 10, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = juego.modoNoche ? '#FF6B6B' : 'black';
            ctx.beginPath();
            ctx.arc(this.x + this.ancho - 6, this.y + 10, 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            if (this.enSuelo) {
                const offset = Math.sin(this.animacionPata) * 2;
                ctx.fillRect(this.x + 5, this.y + this.alto, 6, 8);
                ctx.fillRect(this.x + 17 + offset, this.y + this.alto, 6, 8);
            }
            
            const sombrero = juego.sombreros.find(s => s.id === juego.sombreroActual);
            if (sombrero && sombrero.desbloqueado && skinActual !== "estrella") {
                ctx.font = '24px "Segoe UI Emoji"';
                ctx.textAlign = 'center';
                ctx.fillStyle = juego.modoNoche ? '#FFE66D' : '#8B4513';
                ctx.fillText(sombrero.emoji, this.x + this.ancho/2, this.y - 5);
                ctx.textAlign = 'left';
            }
        }
        
        if (!juego.puedeEsquivar && juego.pantalla === "jugando" && !juego.juegoCompletado) {
            ctx.font = '12px "Courier New", monospace';
            ctx.fillStyle = '#FF0000';
            ctx.textAlign = 'center';
            ctx.fillText('⚠️ NO PUEDE ESQUIVAR ⚠️', this.x + this.ancho/2, this.y - 20);
            ctx.textAlign = 'left';
        }
    }
    
    obtenerRect() {
        return { x: this.x, y: this.y, ancho: this.ancho, alto: this.alto };
    }
}

// ============================================
// CLASE OBSTÁCULO
// ============================================
class Obstaculo {
    constructor(tipo, x, esInicial = false) {
        this.tipo = tipo;
        this.x = x || canvas.width;
        this.preguntaAsignada = null;
        
        const config = {
            'cactus': { ancho: 20, alto: 40, y: canvas.height - 85, color: '#2ECC71' },
            'cactus_g': { ancho: 25, alto: 50, y: canvas.height - 95, color: '#27AE60' },
            'pajaro': { ancho: 30, alto: 20, y: canvas.height - 140, color: '#E74C3C' }
        };
        
        const c = config[tipo];
        this.ancho = c.ancho;
        this.alto = c.alto;
        this.y = c.y;
        this.color = c.color;
        
        if (!esInicial && juego.preguntasDisponibles.length > 0) {
            const siguientePregunta = obtenerSiguientePregunta();
            if (siguientePregunta) {
                this.preguntaAsignada = siguientePregunta;
            }
        }
    }
    
    actualizar(velocidad) {
        if (!juego.juegoPausado && !juego.juegoCompletado) {
            this.x -= velocidad;
        }
    }
    
    dibujar() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        
        if (this.tipo === 'cactus' || this.tipo === 'cactus_g') {
            ctx.fillRect(this.x - 5, this.y + 10, 5, 8);
            ctx.fillRect(this.x + this.ancho, this.y + 20, 5, 8);
        } else if (this.tipo === 'pajaro') {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x + this.ancho - 8, this.y + 8, 4, 4);
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x + this.ancho - 7, this.y + 9, 2, 2);
        }
    }
    
    obtenerRect() {
        return { x: this.x, y: this.y, ancho: this.ancho, alto: this.alto };
    }
    
    fueraDePantalla() {
        return this.x + this.ancho < 0;
    }
}

// ============================================
// CLASE TRIVIA
// ============================================
class TriviaModal {
    constructor(obstaculo, dino) {
        this.obstaculo = obstaculo;
        this.dino = dino;
        this.pregunta = obstaculo.preguntaAsignada;
        this.visible = true;
        this.opcionSeleccionada = -1;
        this.resultado = null;
        this.procesado = false;
    }
    
    dibujar() {
        if (!this.visible || !this.pregunta) return;
        
        const panelAncho = 520;
        const panelAlto = 300;
        const panelX = (canvas.width - panelAncho) / 2;
        const panelY = (canvas.height - panelAlto) / 2 - 20;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.92)';
        ctx.fillRect(panelX, panelY, panelAncho, panelAlto);
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.strokeRect(panelX, panelY, panelAncho, panelAlto);
        
        ctx.beginPath();
        ctx.moveTo(panelX, panelY + 75);
        ctx.lineTo(panelX + panelAncho, panelY + 75);
        ctx.stroke();
        
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.fillStyle = '#FFFF00';
        ctx.textAlign = 'center';
        ctx.fillText(`[ ${this.pregunta.materia.toUpperCase()} ]`, canvas.width / 2, panelY + 30);
        
        ctx.font = '15px "Courier New", monospace';
        ctx.fillStyle = '#FFFFFF';
        
        const palabras = this.pregunta.texto.split(' ');
        let lineas = [];
        let lineaActual = '';
        
        for (let palabra of palabras) {
            let prueba = lineaActual ? lineaActual + ' ' + palabra : palabra;
            if (ctx.measureText(prueba).width < panelAncho - 60) {
                lineaActual = prueba;
            } else {
                lineas.push(lineaActual);
                lineaActual = palabra;
            }
        }
        if (lineaActual) lineas.push(lineaActual);
        
        let yTexto = panelY + 55;
        for (let linea of lineas) {
            ctx.fillText(linea, canvas.width / 2, yTexto);
            yTexto += 22;
        }
        
        const opcionAncho = (panelAncho - 80) / 2;
        const opcionAlto = 55;
        const opcionesX = [panelX + 30, panelX + 30 + opcionAncho + 20];
        const opcionesY = panelY + 140;
        
        for (let i = 0; i < this.pregunta.opciones.length; i++) {
            const fila = Math.floor(i / 2);
            const col = i % 2;
            const x = opcionesX[col];
            const y = opcionesY + (fila * (opcionAlto + 10));
            
            ctx.fillStyle = '#222222';
            ctx.fillRect(x, y, opcionAncho, opcionAlto);
            
            if (this.opcionSeleccionada === i) {
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 2;
            }
            ctx.strokeRect(x, y, opcionAncho, opcionAlto);
            
            ctx.font = 'bold 18px "Courier New", monospace';
            ctx.fillStyle = this.opcionSeleccionada === i ? '#FFD700' : '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(String.fromCharCode(65 + i), x + 20, y + 35);
            
            ctx.font = '12px "Courier New", monospace';
            ctx.fillStyle = this.opcionSeleccionada === i ? '#FFFFFF' : '#CCCCCC';
            ctx.textAlign = 'left';
            
            let textoOp = this.pregunta.opciones[i];
            if (ctx.measureText(textoOp).width > opcionAncho - 50) {
                textoOp = textoOp.substring(0, 25) + '...';
            }
            ctx.fillText(textoOp, x + 45, y + 35);
        }
        
        ctx.font = '11px "Courier New", monospace';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('[CLICK] en opción para seleccionar | [Z][ENTER] para responder', canvas.width / 2, panelY + panelAlto - 18);
        
        ctx.textAlign = 'left';
    }
    
    procesarClick(x, y) {
        if (!this.visible || this.procesado) return false;
        
        const panelAncho = 520;
        const panelAlto = 300;
        const panelX = (canvas.width - panelAncho) / 2;
        const panelY = (canvas.height - panelAlto) / 2 - 20;
        
        const opcionAncho = (panelAncho - 80) / 2;
        const opcionAlto = 55;
        const opcionesX = [panelX + 30, panelX + 30 + opcionAncho + 20];
        const opcionesY = panelY + 140;
        
        for (let i = 0; i < this.pregunta.opciones.length; i++) {
            const fila = Math.floor(i / 2);
            const col = i % 2;
            const opX = opcionesX[col];
            const opY = opcionesY + (fila * (opcionAlto + 10));
            
            if (x >= opX && x <= opX + opcionAncho && y >= opY && y <= opY + opcionAlto) {
                this.opcionSeleccionada = i;
                return true;
            }
        }
        return false;
    }
    
    responder() {
        if (this.opcionSeleccionada !== -1 && !this.procesado) {
            const esCorrecta = (this.opcionSeleccionada === this.pregunta.correcta);
            this.resultado = esCorrecta ? 'correcto' : 'incorrecto';
            this.procesado = true;
            this.visible = false;
            return true;
        }
        return false;
    }
    
    getResultado() {
        return this.resultado;
    }
}

// ============================================
// VARIABLES GLOBALES
// ============================================
let dino = new Dinosaurio();
let obstaculos = [];
let sueloX = 0;
let velocidadJuego = VELOCIDAD_BASE;
let frameCounter = 0;
let juegoActivo = true;
let triviaActiva = false;
let triviaModal = null;
let obstaculoEnPausa = null;

// ============================================
// FUNCIONES DEL JUEGO
// ============================================

function reiniciarJuego() {
    juego.intentos++;
    
    dino = new Dinosaurio();
    obstaculos = [];
    sueloX = 0;
    velocidadJuego = VELOCIDAD_BASE;
    frameCounter = 0;
    juegoActivo = true;
    triviaActiva = false;
    triviaModal = null;
    obstaculoEnPausa = null;
    juego.puntuacion = 0;
    juego.puedeEsquivar = true;
    juego.juegoPausado = false;
    juego.juegoTerminado = false;
    juego.juegoCompletado = false;
    contadorObstaculos = 0;
    
    reiniciarPreguntasDisponibles();
    
    juego.sombreros.forEach((s, i) => {
        s.desbloqueado = SOMBREROS[i].desbloqueado;
    });
    
    juego.sombreroActual = 0;
    skinActual = "normal";
    
    juego.pantalla = "jugando";
    console.log("Juego reiniciado. Preguntas disponibles:", juego.preguntasDisponibles.length);
    actualizarPanelSombreros();
}

function terminarJuegoPorCompletar() {
    if (juego.juegoTerminado) return;
    
    juego.juegoTerminado = true;
    juego.juegoPausado = true;
    const todasCorrectas = (juego.respuestasCorrectas === TOTAL_PREGUNTAS);
    
    console.log("Juego completado. Correctas:", juego.respuestasCorrectas, "de", TOTAL_PREGUNTAS);
    
    if (todasCorrectas && !skinEstrellaDesbloqueada) {
        skinEstrellaDesbloqueada = true;
        localStorage.setItem('skinEstrella', 'true');
        juego.pantalla = "cinematica";
        juego.cinematicAltura = 0;
        juego.cinematicFrame = 0;
        return;
    }
    
    juego.pantalla = "gameover";
    juegoActivo = false;
    if (juego.puntuacion > juego.record) {
        juego.record = juego.puntuacion;
        localStorage.setItem('dinoRecord', juego.record);
    }
}

function generarObstaculo() {
    if (juego.juegoCompletado) return;
    
    let tipo;
    
    if (contadorObstaculos < 2) {
        tipo = 'cactus';
    } else {
        const tipos = ['cactus', 'cactus_g', 'pajaro'];
        tipo = tipos[Math.floor(Math.random() * tipos.length)];
    }
    
    const separacionBase = 220;
    const separacionExtra = Math.floor(Math.random() * 60);
    const separacionTotal = separacionBase + separacionExtra;
    
    let nuevaX = canvas.width;
    if (obstaculos.length > 0) {
        const ultimoObs = obstaculos[obstaculos.length - 1];
        nuevaX = ultimoObs.x + separacionTotal;
    }
    
    const esInicial = (contadorObstaculos < 2);
    obstaculos.push(new Obstaculo(tipo, nuevaX, esInicial));
    contadorObstaculos++;
}

function actualizarJuego() {
    if (juego.pantalla !== "jugando") return;
    if (juego.juegoCompletado) return;
    
    if (!juego.juegoPausado) {
        dino.actualizar();
        
        sueloX -= velocidadJuego;
        if (sueloX <= -canvas.width) {
            sueloX = 0;
        }
        
        velocidadJuego = VELOCIDAD_BASE + Math.floor(juego.puntuacion / 800);
        
        frameCounter++;
        if (frameCounter > 70) {
            generarObstaculo();
            frameCounter = 0;
        }
        
        for (let i = 0; i < obstaculos.length; i++) {
            const obs = obstaculos[i];
            obs.actualizar(velocidadJuego);
            
            const distancia = Math.abs(obs.x - dino.x);
            const rangoActivacion = 100;
            
            if (!triviaActiva && obs.preguntaAsignada && distancia < rangoActivacion && distancia > 15 && !juego.juegoPausado && !juego.juegoCompletado) {
                juego.juegoPausado = true;
                triviaActiva = true;
                obstaculoEnPausa = obs;
                triviaModal = new TriviaModal(obs, dino);
                return;
            }
            
            const rectDino = dino.obtenerRect();
            const rectObs = obs.obtenerRect();
            
            if (rectDino.x < rectObs.x + rectObs.ancho &&
                rectDino.x + rectDino.ancho > rectObs.x &&
                rectDino.y < rectObs.y + rectObs.alto &&
                rectDino.y + rectDino.alto > rectObs.y) {
                
                if (!juego.puedeEsquivar || !obs.preguntaAsignada) {
                    juegoActivo = false;
                    juego.pantalla = "gameover";
                    if (juego.puntuacion > juego.record) {
                        juego.record = juego.puntuacion;
                        localStorage.setItem('dinoRecord', juego.record);
                    }
                    return;
                }
            }
            
            if (obs.fueraDePantalla()) {
                obstaculos.splice(i, 1);
                i--;
                juego.puntuacion += 50;
            }
        }
        
        juego.puntuacion += 1;
    }
}

function procesarRespuestaTrivia() {
    if (!triviaModal) return;
    
    const resultado = triviaModal.getResultado();
    const obstaculo = obstaculoEnPausa;
    const preguntaId = obstaculo.preguntaAsignada.id;
    
    console.log("Respuesta procesada. Resultado:", resultado, "Pregunta ID:", preguntaId);
    
    if (resultado === 'correcto') {
        juego.respuestasCorrectas++;
        juego.puedeEsquivar = true;
        
        marcarPreguntaRespondida(preguntaId);
        
        if (juego.respuestasCorrectas >= TOTAL_PREGUNTAS) {
            console.log("¡ÚLTIMA PREGUNTA CORRECTA! Terminando juego inmediatamente...");
            terminarJuegoPorCompletar();
            return;
        }
        
        if (obstaculo) {
            if (obstaculo.tipo === 'pajaro') {
                dino.agachadoAutomatico();
            } else {
                dino.saltoAutomatico();
            }
        }
        
        const index = obstaculos.indexOf(obstaculoEnPausa);
        if (index !== -1) {
            obstaculos.splice(index, 1);
        }
        
        const desbloqueados = juego.sombreros.filter(s => s.desbloqueado).length;
        if (juego.respuestasCorrectas >= desbloqueados * 2 && desbloqueados < SOMBREROS.length) {
            juego.sombreros[desbloqueados].desbloqueado = true;
            mostrarMensaje(`🎉 NUEVO SOMBRERO: ${juego.sombreros[desbloqueados].nombre} 🎉`);
            actualizarPanelSombreros();
        }
        
    } else if (resultado === 'incorrecto') {
        juego.respuestasIncorrectas++;
        juego.puedeEsquivar = false;
        
        marcarPreguntaRespondida(preguntaId);
    }
    
    juego.juegoPausado = false;
    triviaActiva = false;
    triviaModal = null;
    obstaculoEnPausa = null;
    
    console.log("Preguntas restantes:", juego.preguntasDisponibles.length);
}

// ============================================
// DIBUJADO
// ============================================
function dibujarFondo() {
    if (juego.modoNoche) {
        const gradiente = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradiente.addColorStop(0, '#0a0f1e');
        gradiente.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 80; i++) {
            const x = (i * 131) % canvas.width;
            const y = (i * 253) % 150;
            ctx.fillRect(x, y, 2, 2);
        }
        
        ctx.fillStyle = '#FFE66D';
        ctx.beginPath();
        ctx.arc(700, 60, 35, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.ellipse(120, 60, 35, 25, 0, 0, Math.PI * 2);
        ctx.ellipse(160, 55, 30, 22, 0, 0, Math.PI * 2);
        ctx.ellipse(80, 55, 28, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(650, 80, 40, 28, 0, 0, Math.PI * 2);
        ctx.ellipse(690, 75, 32, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, Math.PI * 2);
        ctx.fill();
    }
}

function dibujarSuelo() {
    ctx.fillStyle = juego.modoNoche ? '#2C3E50' : '#8B4513';
    ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
    
    ctx.fillStyle = juego.modoNoche ? '#FFE66D' : '#F5DEB3';
    for (let i = 0; i < 20; i++) {
        const x = (sueloX + i * 60) % (canvas.width * 2);
        ctx.fillRect(x, canvas.height - 48, 4, 4);
    }
    
    ctx.strokeStyle = juego.modoNoche ? '#FFE66D' : '#5C4033';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 45);
    ctx.lineTo(canvas.width, canvas.height - 45);
    ctx.stroke();
}

function dibujarUI() {
    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = juego.modoNoche ? '#FFFFFF' : '#2C3E50';
    ctx.textAlign = 'left';
    ctx.fillText(`🏆 ${Math.floor(juego.puntuacion)}`, 15, 30);
    ctx.fillText(`✅ ${juego.respuestasCorrectas}/${TOTAL_PREGUNTAS}`, 15, 55);
    ctx.fillText(`📋 ${juego.preguntasDisponibles.length} restantes`, 15, 80);
    
    if (!juego.puedeEsquivar && juego.pantalla === "jugando" && !juego.juegoCompletado) {
        ctx.fillStyle = '#FF0000';
        ctx.fillText(`⚠️ ESQUIVE INHABILITADO ⚠️`, canvas.width - 180, 30);
    }
    
    if (temporizadorMensaje > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '12px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(mensajeTemporal, canvas.width / 2, 50);
        ctx.textAlign = 'left';
        temporizadorMensaje--;
    }
}

function dibujarMenu() {
    dibujarFondo();
    dibujarSuelo();
    dino.dibujar();
    
    const panelAncho = 480;
    const panelAlto = 260;
    const panelX = (canvas.width - panelAncho) / 2;
    const panelY = (canvas.height - panelAlto) / 2 - 20;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
    ctx.fillRect(panelX, panelY, panelAncho, panelAlto);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.strokeRect(panelX, panelY, panelAncho, panelAlto);
    
    ctx.font = '22px "Courier New", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('DINO-REQUERIMIENTOS', canvas.width / 2, panelY + 45);
    
    ctx.font = '13px "Courier New", monospace';
    ctx.fillStyle = '#FFFF00';
    ctx.fillText('LEAN EDITION', canvas.width / 2, panelY + 75);
    
    ctx.font = '11px "Courier New", monospace';
    ctx.fillStyle = '#CCCCCC';
    ctx.textAlign = 'left';
    const instrucciones = [
        '* Responde las 26 preguntas de LEAN para completar el juego',
        '* CLICK en opción para seleccionar',
        '* Presiona Z o ENTER para responder',
        '* Si fallas, NO podrás esquivar el obstáculo',
        '* Responde TODAS bien para DESBLOQUEAR UN COLECCIONABLE'
    ];
    
    for (let i = 0; i < instrucciones.length; i++) {
        ctx.fillText(instrucciones[i], panelX + 30, panelY + 110 + (i * 20));
    }
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(panelX + panelAncho/2 - 80, panelY + panelAlto - 45, 160, 35);
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(panelX + panelAncho/2 - 80, panelY + panelAlto - 45, 160, 35);
    
    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('▶ PRESIONA ESPACIO', canvas.width / 2, panelY + panelAlto - 22);
    
    ctx.textAlign = 'left';
}

function dibujarGameOver() {
    dibujarFondo();
    dibujarSuelo();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '26px "Courier New", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    
    if (juego.juegoTerminado) {
        ctx.fillText('¡JUEGO COMPLETADO!', canvas.width / 2, canvas.height / 2 - 80);
    } else {
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 80);
    }
    
    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = '#FFFF00';
    ctx.fillText(`PUNTUACIÓN: ${Math.floor(juego.puntuacion)}`, canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText(`RÉCORD: ${juego.record}`, canvas.width / 2, canvas.height / 2);
    ctx.fillText(`✅ CORRECTAS: ${juego.respuestasCorrectas} | ❌ INCORRECTAS: ${juego.respuestasIncorrectas}`, canvas.width / 2, canvas.height / 2 + 35);
    
    if (skinEstrellaDesbloqueada) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText('⭐ SKIN ESTRELLA DESBLOQUEADA ⭐', canvas.width / 2, canvas.height / 2 + 80);
    } else if (juego.respuestasCorrectas === TOTAL_PREGUNTAS && juego.juegoTerminado) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText('⭐ ¡DESBLOQUEASTE UN COLECCIONABLE! ⭐', canvas.width / 2, canvas.height / 2 + 80);
    }
    
    ctx.font = '13px "Courier New", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Presiona ESPACIO para jugar de nuevo', canvas.width / 2, canvas.height / 2 + 130);
    
    ctx.textAlign = 'left';
}

function dibujarCinematica() {
    dibujarFondo();
    dibujarSuelo();
    
    // Animación de crecimiento
    juego.cinematicAltura += 3;
    if (juego.cinematicAltura > canvas.height - 120) {
        juego.cinematicAltura = canvas.height - 120;
    }
    
    // Pilar central (cuerpo oscuro)
    const pilarAncho = 40;
    const pilarX = canvas.width/2 - pilarAncho/2;
    const pilarAlto = juego.cinematicAltura;
    const pilarY = canvas.height - pilarAlto;
    
    ctx.fillStyle = '#111111';
    ctx.fillRect(pilarX, pilarY, pilarAncho, pilarAlto);
    
    // Base superior del pilar (color según modo noche)
    const baseAltura = 15;
    if (juego.modoNoche) {
        ctx.fillStyle = '#CCCCAA'; // Luz de luna
    } else {
        ctx.fillStyle = '#FFE4B5'; // Luz solar natural
    }
    ctx.fillRect(pilarX - 10, pilarY - baseAltura, pilarAncho + 20, baseAltura);
    
    // Dinosaurio (va creciendo de tamaño a medida que sube)
    const escala = 0.5 + (juego.cinematicAltura / (canvas.height - 120)) * 1.5;
    const dinoW = 28 * escala;
    const dinoH = 45 * escala;
    const dinoX = canvas.width/2 - dinoW/2;
    const dinoY = pilarY - dinoH - 5;
    
    // Dibujar dinosaurio con skin estrella (aunque no esté desbloqueada, en la cinemática se muestra)
    ctx.save();
    ctx.translate(dinoX + dinoW/2, dinoY + dinoH/2);
    ctx.scale(escala, escala);
    ctx.translate(-(dinoX + dinoW/2), -(dinoY + dinoH/2));
    
    // Estrella de 5 puntas (más grande que el cuerpo)
    const cx = dinoX + dinoW/2;
    const cy = dinoY + dinoH/2;
    const rExt = 30 * escala;
    const rInt = 15 * escala;
    const puntas = 5;
    ctx.beginPath();
    for (let i = 0; i < puntas * 2; i++) {
        let radio = i % 2 === 0 ? rExt : rInt;
        let ang = Math.PI/2 + i * Math.PI / puntas;
        let x = cx + radio * Math.cos(ang);
        let y = cy + radio * Math.sin(ang);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "#F1C40F";
    ctx.fill();
    ctx.strokeStyle = "#FFA500";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Cara
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(cx + (dinoW/2 - 6) * escala, cy + (dinoH/2 - 20) * escala, 5 * escala, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(cx + (dinoW/2 - 6) * escala, cy + (dinoH/2 - 20) * escala, 2.5 * escala, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2C3E50";
    ctx.fillRect(cx + (dinoW/2 - 10) * escala, cy + (dinoH/2 - 15) * escala, 8 * escala, 6 * escala);
    
    ctx.restore();
    
    // Texto
    ctx.font = '18px "Courier New", monospace';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('✨ ¡NUEVA SKIN DESBLOQUEADA! ✨', canvas.width / 2, 50);
    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('SKIN ESTRELLA DORADA', canvas.width / 2, 90);
    
    if (juego.cinematicAltura >= canvas.height - 120) {
        ctx.font = '14px "Courier New", monospace';
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('Presiona ESPACIO para continuar', canvas.width / 2, canvas.height - 40);
    }
    
    ctx.textAlign = 'left';
}

function dibujar() {
    if (juego.pantalla === "menu") {
        dibujarMenu();
    } else if (juego.pantalla === "jugando") {
        dibujarFondo();
        dibujarSuelo();
        dino.dibujar();
        for (let obs of obstaculos) {
            obs.dibujar();
        }
        dibujarUI();
        
        if (triviaActiva && triviaModal) {
            triviaModal.dibujar();
        }
    } else if (juego.pantalla === "gameover") {
        dibujarGameOver();
    } else if (juego.pantalla === "cinematica") {
        dibujarCinematica();
    }
}

// ============================================
// EVENTOS
// ============================================
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    if (juego.pantalla === "jugando" && triviaActiva && triviaModal) {
        triviaModal.procesarClick(mouseX, mouseY);
    }
});

document.addEventListener('keydown', (e) => {
    const tecla = e.key;
    
    if (juego.pantalla === "menu") {
        if (tecla === ' ') {
            e.preventDefault();
            reiniciarJuego();
        }
        if (tecla === 'n' || tecla === 'N') {
            juego.modoNoche = !juego.modoNoche;
        }
    } 
    else if (juego.pantalla === "jugando") {
        if (tecla === 'ArrowLeft') {
            cambiarSombrero('anterior');
            return;
        }
        if (tecla === 'ArrowRight') {
            cambiarSombrero('siguiente');
            return;
        }
        
        if (triviaActiva && triviaModal) {
            if (tecla === 'Enter' || tecla === 'z' || tecla === 'Z') {
                if (triviaModal.responder()) {
                    procesarRespuestaTrivia();
                }
            }
        } else if (!juego.juegoPausado && !juego.juegoCompletado) {
            if (tecla === 'ArrowUp' || tecla === ' ') {
                e.preventDefault();
                dino.saltar();
            } else if (tecla === 'ArrowDown' || tecla === 'Shift') {
                e.preventDefault();
                dino.agachar(true);
            }
        }
        
        if (tecla === 'n' || tecla === 'N') {
            juego.modoNoche = !juego.modoNoche;
        }
    }
    else if (juego.pantalla === "gameover") {
        if (tecla === ' ') {
            e.preventDefault();
            reiniciarJuego();
        }
        if (tecla === 'n' || tecla === 'N') {
            juego.modoNoche = !juego.modoNoche;
        }
    }
    else if (juego.pantalla === "cinematica") {
        if (tecla === ' ') {
            e.preventDefault();
            juego.pantalla = "gameover";
            juego.juegoTerminado = true;
            juegoActivo = false;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (juego.pantalla === "jugando" && !triviaActiva && !juego.juegoPausado && juego.puedeEsquivar && !juego.juegoCompletado) {
        if (e.key === 'ArrowDown' || e.key === 'Shift') {
            dino.agachar(false);
        }
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================
reiniciarPreguntasDisponibles();
actualizarPanelSombreros();

// Panel HTML: toggle
const toggleBtn = document.getElementById('togglePanelBtn');
const panelSombreros = document.getElementById('sombrerosPanel');
toggleBtn.addEventListener('click', () => {
    if (panelSombreros.style.display === 'none') {
        panelSombreros.style.display = 'block';
    } else {
        panelSombreros.style.display = 'none';
    }
});
// Cerrar panel si se hace clic fuera
document.addEventListener('click', (e) => {
    if (panelSombreros.style.display === 'block' && 
        !panelSombreros.contains(e.target) && 
        e.target !== toggleBtn) {
        panelSombreros.style.display = 'none';
    }
});

function gameLoop() {
    actualizarJuego();
    dibujar();
    requestAnimationFrame(gameLoop);
}
gameLoop();

// Botones HTML
document.getElementById('instruccionesBtn').addEventListener('click', () => {
    document.getElementById('modalInstrucciones').style.display = 'flex';
});
document.getElementById('cerrarModal').addEventListener('click', () => {
    document.getElementById('modalInstrucciones').style.display = 'none';
});
document.getElementById('resetProgresoBtn').addEventListener('click', () => {
    if (confirm("¿Reiniciar todo el progreso? Perderás todos los sombreros y la skin estrella desbloqueada.")) {
        skinEstrellaDesbloqueada = false;
        juego.sombreros = JSON.parse(JSON.stringify(SOMBREROS));
        juego.record = 0;
        localStorage.setItem('skinEstrella', 'false');
        localStorage.setItem('sombreros', JSON.stringify(juego.sombreros.map(s => ({ id: s.id, desbloqueado: s.desbloqueado }))));
        localStorage.setItem('dinoRecord', '0');
        alert("🎮 Progreso reiniciado.");
        location.reload();
    }
});