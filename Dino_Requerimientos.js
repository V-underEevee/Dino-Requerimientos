// ============================================
// DINO REQUERIMIENTOS - VERSIÓN CORREGIDA (sin congelación)
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ============================================
// PREGUNTAS ÚNICAS - 10
// ============================================
const PREGUNTAS = [
    { id:1, texto:"¿Qué método se usa para agregar un evento de teclado en JavaScript?", opciones:["addEventListener('keydown')","addKeyboardEvent()","keyboard.listen()","onKeyPress()"], correcta:0, materia:"JavaScript" },
    { id:2, texto:"¿Cuál NO es un tipo de dato primitivo en JavaScript?", opciones:["object","string","number","boolean"], correcta:0, materia:"JavaScript" },
    { id:3, texto:"¿Qué función dibuja un rectángulo en Canvas?", opciones:["fillRect()","drawRect()","rectangle()","addRect()"], correcta:0, materia:"Canvas" },
    { id:4, texto:"¿Qué propiedad obtiene el contexto 2D de canvas?", opciones:["getContext('2d')","getCanvas()","get2D()","canvas.context"], correcta:0, materia:"Canvas" },
    { id:5, texto:"¿Forma correcta de declarar variable en JS moderno?", opciones:["Todas son válidas","var x = 5","let x = 5","const x = 5"], correcta:0, materia:"JavaScript" },
    { id:6, texto:"¿Qué método convierte objeto a JSON string?", opciones:["JSON.stringify()","JSON.parse()","toJSON()","object.toJson()"], correcta:0, materia:"JSON" },
    { id:7, texto:"¿Cuál es un framework de JavaScript?", opciones:["React","Django","Laravel","Flask"], correcta:0, materia:"Frameworks" },
    { id:8, texto:"¿Palabra clave para manejar excepciones en JS?", opciones:["try-catch","catch","except","error"], correcta:0, materia:"JavaScript" },
    { id:9, texto:"¿Qué significa DOM en JavaScript?", opciones:["Document Object Model","Data Object Model","Document Oriented Model","Direct Object Model"], correcta:0, materia:"DOM" },
    { id:10, texto:"¿Qué hace 'localStorage' en JavaScript?", opciones:["Almacena datos persistentes","Almacena datos temporales","Guarda cookies","Ninguna"], correcta:0, materia:"Web Storage" }
];
const TOTAL_PREGUNTAS = PREGUNTAS.length;

const SOMBREROS_BASE = [
    { id:0, nombre:"CASUAL", emoji:"🧢", desbloqueado:true },
    { id:1, nombre:"CHISTERA", emoji:"🎩", desbloqueado:false },
    { id:2, nombre:"CORONA", emoji:"👑", desbloqueado:false },
    { id:3, nombre:"VAQUERO", emoji:"🤠", desbloqueado:false },
    { id:4, nombre:"MAGO", emoji:"🧙", desbloqueado:false },
    { id:5, nombre:"GRADUADO", emoji:"🎓", desbloqueado:false }
];

// Persistencia
function guardarProgreso() {
    localStorage.setItem('skinEstrella', skinEstrellaDesbloqueada ? 'true' : 'false');
    localStorage.setItem('sombreros', JSON.stringify(juego.sombreros.map(s=>({id:s.id,desbloqueado:s.desbloqueado}))));
    localStorage.setItem('dinoRecord', juego.record);
}
function cargarProgreso() {
    skinEstrellaDesbloqueada = localStorage.getItem('skinEstrella') === 'true';
    const saved = localStorage.getItem('sombreros');
    if(saved){
        const data = JSON.parse(saved);
        juego.sombreros.forEach(s=>{ const found = data.find(d=>d.id===s.id); if(found) s.desbloqueado = found.desbloqueado; });
    } else juego.sombreros = JSON.parse(JSON.stringify(SOMBREROS_BASE));
    juego.record = parseInt(localStorage.getItem('dinoRecord')) || 0;
}
function reiniciarProgresoCompleto(){
    skinEstrellaDesbloqueada = false;
    juego.sombreros = JSON.parse(JSON.stringify(SOMBREROS_BASE));
    juego.record = 0;
    guardarProgreso();
    actualizarPanelSombreros();
    alert("🎮 Progreso reiniciado.");
    location.reload();
}

let juego = {
    pantalla: "menu",
    puntuacion: 0,
    record: 0,
    intentos: 0,
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
    preguntasDisponibles: [],
    modoNoche: false,
    sombreroActual: 0,
    sombreros: [],
    cinematicAltura: 0,
    puedeEsquivar: true,
    juegoPausado: false,
    juegoTerminado: false
};
let skinEstrellaDesbloqueada = false;
let skinActual = "normal";
let temporizadorMensaje = 0;
let mensajeTemporal = "";
cargarProgreso();

const GRAVEDAD = 0.7, VELOCIDAD_SALTO = -14, VELOCIDAD_BASE = 4;
let contadorObstaculos = 0;

function mezclarArray(arr){
    for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    return arr;
}
function reiniciarPreguntasDisponibles(){
    juego.preguntasDisponibles = mezclarArray([...PREGUNTAS]);
    juego.respuestasCorrectas = 0;
    juego.respuestasIncorrectas = 0;
}
function obtenerSiguientePregunta(){
    if(juego.preguntasDisponibles.length===0) return null;
    return juego.preguntasDisponibles.shift();
}
function mostrarMensaje(texto){ mensajeTemporal=texto; temporizadorMensaje=90; }
function cambiarSombrero(direccion){
    const desbloq = juego.sombreros.filter(s=>s.desbloqueado);
    if(desbloq.length===0) return;
    let idx = desbloq.findIndex(s=>s.id===juego.sombreroActual);
    if(idx===-1) idx=0;
    if(direccion==='siguiente') idx = (idx+1)%desbloq.length;
    else idx = (idx-1+desbloq.length)%desbloq.length;
    juego.sombreroActual = desbloq[idx].id;
    mostrarMensaje(`🎩 ${desbloq[idx].nombre} equipado`);
    guardarProgreso();
    actualizarPanelSombreros();
}

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
                guardarProgreso();
                mostrarMensaje(`🎩 ${s.nombre} equipado`);
                actualizarPanelSombreros();
            });
        } else item.style.cursor = 'not-allowed';
        const emojiSpan = document.createElement('span'); emojiSpan.className = 'sombrero-emoji'; emojiSpan.textContent = s.emoji;
        const nombreSpan = document.createElement('span'); nombreSpan.className = 'sombrero-nombre'; nombreSpan.textContent = s.nombre;
        const estadoSpan = document.createElement('span'); estadoSpan.className = 'sombrero-estado'; estadoSpan.textContent = s.desbloqueado ? (s.id === juego.sombreroActual ? '✓' : '') : '🔒';
        item.appendChild(emojiSpan); item.appendChild(nombreSpan); item.appendChild(estadoSpan);
        contenedor.appendChild(item);
    });
}

// Clase Dinosaurio (sin cambios visuales)
class Dinosaurio {
    constructor(){
        this.x=50; this.y=canvas.height-90; this.ancho=28; this.alto=45;
        this.velY=0; this.enSuelo=true; this.agachado=false; this.animacionPata=0;
    }
    saltar(){
        if(this.enSuelo && !this.agachado && juego.pantalla==="jugando" && juego.puedeEsquivar && !juego.juegoPausado){
            this.velY=VELOCIDAD_SALTO; this.enSuelo=false; return true;
        }
        return false;
    }
    agachar(estado){
        if(this.enSuelo && juego.pantalla==="jugando" && juego.puedeEsquivar && !juego.juegoPausado){
            this.agachado=estado;
            if(estado){ this.ancho=45; this.alto=28; this.y=canvas.height-73; }
            else{ this.ancho=28; this.alto=45; this.y=canvas.height-90; }
        }
    }
    saltoAutomatico(){ if(this.enSuelo && !this.agachado){ this.velY=VELOCIDAD_SALTO; this.enSuelo=false; } }
    agachadoAutomatico(){
        if(this.enSuelo){
            this.agachado=true; this.ancho=45; this.alto=28; this.y=canvas.height-73;
            setTimeout(()=>{ if(this.agachado && juego.pantalla==="jugando"){ this.agachado=false; this.ancho=28; this.alto=45; this.y=canvas.height-90; } },400);
        }
    }
    actualizar(){
        if(!this.enSuelo){ this.velY+=GRAVEDAD; this.y+=this.velY; }
        if(this.y>=canvas.height-90){ this.y=canvas.height-90; this.velY=0; this.enSuelo=true; }
        this.animacionPata = (this.animacionPata+0.2)%(Math.PI*2);
    }
    dibujar(){
        if(skinActual==="estrella" && skinEstrellaDesbloqueada){
            const cx=this.x+this.ancho/2, cy=this.y+this.alto/2;
            const rExt=30, rInt=15, puntas=5;
            ctx.beginPath();
            for(let i=0;i<puntas*2;i++){
                let radio = i%2===0?rExt:rInt;
                let ang = Math.PI/2 + i*Math.PI/puntas;
                let x=cx+radio*Math.cos(ang), y=cy+radio*Math.sin(ang);
                if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.fillStyle="#F1C40F"; ctx.fill();
            ctx.strokeStyle="#FFA500"; ctx.lineWidth=2; ctx.stroke();
            ctx.fillStyle="#FFFFFF"; ctx.beginPath(); ctx.arc(this.x+this.ancho-6,this.y+10,5,0,Math.PI*2); ctx.fill();
            ctx.fillStyle="#000000"; ctx.beginPath(); ctx.arc(this.x+this.ancho-6,this.y+10,2.5,0,Math.PI*2); ctx.fill();
            ctx.fillStyle="#2C3E50"; ctx.fillRect(this.x+this.ancho-10,this.y+15,8,6);
            if(this.enSuelo){
                const off=Math.sin(this.animacionPata)*2;
                ctx.fillStyle="#F1C40F";
                ctx.fillRect(this.x+5,this.y+this.alto,6,8);
                ctx.fillRect(this.x+17+off,this.y+this.alto,6,8);
            }
        } else {
            ctx.fillStyle=juego.modoNoche?"#4ECDC4":"#2C3E50";
            ctx.fillRect(this.x,this.y,this.ancho,this.alto);
            ctx.fillStyle=juego.modoNoche?"#FFE66D":"white";
            ctx.beginPath(); ctx.arc(this.x+this.ancho-6,this.y+10,5,0,Math.PI*2); ctx.fill();
            ctx.fillStyle=juego.modoNoche?"#FF6B6B":"black";
            ctx.beginPath(); ctx.arc(this.x+this.ancho-6,this.y+10,2.5,0,Math.PI*2); ctx.fill();
            if(this.enSuelo){
                const off=Math.sin(this.animacionPata)*2;
                ctx.fillRect(this.x+5,this.y+this.alto,6,8);
                ctx.fillRect(this.x+17+off,this.y+this.alto,6,8);
            }
            const sombrero = juego.sombreros.find(s=>s.id===juego.sombreroActual);
            if(sombrero && sombrero.desbloqueado){
                ctx.font='24px "Segoe UI Emoji"'; ctx.textAlign='center';
                ctx.fillStyle=juego.modoNoche?"#FFE66D":"#8B4513";
                ctx.fillText(sombrero.emoji, this.x+this.ancho/2, this.y-5);
                ctx.textAlign='left';
            }
        }
        if(!juego.puedeEsquivar && juego.pantalla==="jugando"){
            ctx.font='12px "Courier New", monospace'; ctx.fillStyle="#FF0000"; ctx.textAlign='center';
            ctx.fillText('⚠️ NO PUEDE ESQUIVAR ⚠️', this.x+this.ancho/2, this.y-20);
            ctx.textAlign='left';
        }
    }
    obtenerRect(){ return {x:this.x,y:this.y,ancho:this.ancho,alto:this.alto}; }
}

// Clase Obstáculo
class Obstaculo {
    constructor(tipo, x, esInicial=false){
        this.tipo=tipo; this.x=x;
        this.preguntaAsignada=null;
        const conf={ 'cactus':{ancho:20,alto:40,y:canvas.height-85,color:"#2ECC71"},
                     'cactus_g':{ancho:25,alto:50,y:canvas.height-95,color:"#27AE60"},
                     'pajaro':{ancho:30,alto:20,y:canvas.height-140,color:"#E74C3C"} };
        const c=conf[tipo];
        this.ancho=c.ancho; this.alto=c.alto; this.y=c.y; this.color=c.color;
        if(!esInicial && juego.preguntasDisponibles.length>0){
            const sig = obtenerSiguientePregunta();
            if(sig) this.preguntaAsignada = sig;
        }
    }
    actualizar(v){ if(!juego.juegoPausado) this.x-=v; }
    dibujar(){
        ctx.fillStyle=this.color; ctx.fillRect(this.x,this.y,this.ancho,this.alto);
        if(this.tipo==='cactus' || this.tipo==='cactus_g'){
            ctx.fillRect(this.x-5,this.y+10,5,8); ctx.fillRect(this.x+this.ancho,this.y+20,5,8);
        } else if(this.tipo==='pajaro'){
            ctx.fillStyle='white'; ctx.fillRect(this.x+this.ancho-8,this.y+8,4,4);
            ctx.fillStyle='black'; ctx.fillRect(this.x+this.ancho-7,this.y+9,2,2);
        }
    }
    obtenerRect(){ return {x:this.x,y:this.y,ancho:this.ancho,alto:this.alto}; }
    fueraDePantalla(){ return this.x+this.ancho<0; }
}

// Clase TriviaModal (igual)
class TriviaModal {
    constructor(obs){
        this.obstaculo=obs; this.pregunta=obs.preguntaAsignada;
        this.visible=true; this.opcionSeleccionada=-1; this.resultado=null; this.procesado=false;
    }
    dibujar(){
        if(!this.visible || !this.pregunta) return;
        const ancho=520, alto=300, x=(canvas.width-ancho)/2, y=(canvas.height-alto)/2-20;
        ctx.fillStyle='rgba(0,0,0,0.92)'; ctx.fillRect(x,y,ancho,alto);
        ctx.strokeStyle='#FFF'; ctx.lineWidth=3; ctx.strokeRect(x,y,ancho,alto);
        ctx.beginPath(); ctx.moveTo(x,y+75); ctx.lineTo(x+ancho,y+75); ctx.stroke();
        ctx.font='bold 14px "Courier New", monospace'; ctx.fillStyle='#FF0'; ctx.textAlign='center';
        ctx.fillText(`[ ${this.pregunta.materia.toUpperCase()} ]`, canvas.width/2, y+30);
        ctx.font='15px "Courier New", monospace'; ctx.fillStyle='#FFF';
        let lineas=[], actual='';
        for(let p of this.pregunta.texto.split(' ')){
            let prueba=actual?actual+' '+p:p;
            if(ctx.measureText(prueba).width<ancho-60) actual=prueba;
            else { lineas.push(actual); actual=p; }
        }
        if(actual) lineas.push(actual);
        let ty=y+55;
        for(let l of lineas){ ctx.fillText(l, canvas.width/2, ty); ty+=22; }
        const opAncho=(ancho-80)/2, opAlto=55, opX=[x+30, x+30+opAncho+20], opY=y+140;
        for(let i=0;i<this.pregunta.opciones.length;i++){
            let fila=Math.floor(i/2), col=i%2;
            let ox=opX[col], oy=opY+fila*(opAlto+10);
            ctx.fillStyle='#222'; ctx.fillRect(ox,oy,opAncho,opAlto);
            ctx.strokeStyle=this.opcionSeleccionada===i?'#FFD700':'#666'; ctx.lineWidth=2; ctx.strokeRect(ox,oy,opAncho,opAlto);
            ctx.font='bold 18px "Courier New", monospace'; ctx.fillStyle=this.opcionSeleccionada===i?'#FFD700':'#FFF'; ctx.textAlign='center';
            ctx.fillText(String.fromCharCode(65+i), ox+20, oy+35);
            ctx.font='12px "Courier New", monospace'; ctx.fillStyle=this.opcionSeleccionada===i?'#FFF':'#CCC'; ctx.textAlign='left';
            let txt=this.pregunta.opciones[i];
            if(ctx.measureText(txt).width>opAncho-50) txt=txt.substring(0,25)+'...';
            ctx.fillText(txt, ox+45, oy+35);
        }
        ctx.font='11px "Courier New", monospace'; ctx.fillStyle='#888'; ctx.textAlign='center';
        ctx.fillText('[CLICK] en opción para seleccionar | [Z][ENTER] para responder', canvas.width/2, y+alto-18);
        ctx.textAlign='left';
    }
    procesarClick(x,y){
        if(!this.visible || this.procesado) return false;
        const ancho=520, alto=300, px=(canvas.width-ancho)/2, py=(canvas.height-alto)/2-20;
        const opAncho=(ancho-80)/2, opAlto=55, opX=[px+30, px+30+opAncho+20], opY=py+140;
        for(let i=0;i<this.pregunta.opciones.length;i++){
            let fila=Math.floor(i/2), col=i%2;
            let ox=opX[col], oy=opY+fila*(opAlto+10);
            if(x>=ox && x<=ox+opAncho && y>=oy && y<=oy+opAlto){
                this.opcionSeleccionada=i; return true;
            }
        }
        return false;
    }
    responder(){
        if(this.opcionSeleccionada!==-1 && !this.procesado){
            const esCorrecta = (this.opcionSeleccionada === this.pregunta.correcta);
            this.resultado = esCorrecta ? 'correcto' : 'incorrecto';
            this.procesado=true; this.visible=false;
            return true;
        }
        return false;
    }
    getResultado(){ return this.resultado; }
}

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
// FUNCIONES DEL JUEGO (CORREGIDAS)
// ============================================
function reiniciarJuego(){
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
    contadorObstaculos = 0;
    reiniciarPreguntasDisponibles();
    juego.sombreroActual = 0;
    skinActual = "normal";
    juego.pantalla = "jugando";
    guardarProgreso();
    actualizarPanelSombreros();
}

function terminarJuegoPorCompletar(){
    if(juego.juegoTerminado) return;
    juego.juegoTerminado = true;
    juego.juegoPausado = true;
    const todasCorrectas = (juego.respuestasCorrectas === TOTAL_PREGUNTAS);
    if(todasCorrectas){
        if(!skinEstrellaDesbloqueada){
            skinEstrellaDesbloqueada = true;
            guardarProgreso();
        }
        juego.pantalla = "cinematica";
        juego.cinematicAltura = 0;
        return;
    }
    juego.pantalla = "gameover";
    juegoActivo = false;
    if(juego.puntuacion > juego.record){
        juego.record = juego.puntuacion;
        guardarProgreso();
    }
}

function generarObstaculo(){
    if(juego.juegoTerminado) return;
    let tipo;
    if(contadorObstaculos<2) tipo='cactus';
    else tipo = ['cactus','cactus_g','pajaro'][Math.floor(Math.random()*3)];
    const separacion = 220 + Math.floor(Math.random()*60);
    let nuevaX = canvas.width;
    if(obstaculos.length>0) nuevaX = obstaculos[obstaculos.length-1].x + separacion;
    const esInicial = contadorObstaculos<2;
    obstaculos.push(new Obstaculo(tipo, nuevaX, esInicial));
    contadorObstaculos++;
}

function actualizarJuego(){
    if(juego.pantalla !== "jugando") return;
    if(juego.juegoTerminado) return;
    if(!juego.juegoPausado){
        dino.actualizar();
        sueloX -= velocidadJuego;
        if(sueloX <= -canvas.width) sueloX = 0;
        velocidadJuego = VELOCIDAD_BASE + Math.floor(juego.puntuacion/800);
        frameCounter++;
        if(frameCounter > 70){ generarObstaculo(); frameCounter = 0; }
        for(let i=0;i<obstaculos.length;i++){
            const obs = obstaculos[i];
            obs.actualizar(velocidadJuego);
            const dist = Math.abs(obs.x - dino.x);
            if(!triviaActiva && obs.preguntaAsignada && dist<100 && dist>15 && !juego.juegoPausado){
                juego.juegoPausado = true;
                triviaActiva = true;
                obstaculoEnPausa = obs;
                triviaModal = new TriviaModal(obs);
                return;
            }
            const rectDino = dino.obtenerRect();
            const rectObs = obs.obtenerRect();
            if(rectDino.x < rectObs.x+rectObs.ancho && rectDino.x+rectDino.ancho > rectObs.x &&
               rectDino.y < rectObs.y+rectObs.alto && rectDino.y+rectDino.alto > rectObs.y){
                if(!juego.puedeEsquivar || !obs.preguntaAsignada){
                    juegoActivo = false;
                    juego.pantalla = "gameover";
                    if(juego.puntuacion > juego.record){
                        juego.record = juego.puntuacion;
                        guardarProgreso();
                    }
                    return;
                }
            }
            if(obs.fueraDePantalla()){
                obstaculos.splice(i,1);
                i--;
                juego.puntuacion += 50;
            }
        }
        juego.puntuacion += 1;
    }
}

function procesarRespuestaTrivia(){
    if(!triviaModal) return;
    const resultado = triviaModal.getResultado();
    const obs = obstaculoEnPausa;
    if(resultado === 'correcto'){
        juego.respuestasCorrectas++;
        juego.puedeEsquivar = true;
        if(juego.respuestasCorrectas >= TOTAL_PREGUNTAS){
            terminarJuegoPorCompletar();
            juego.juegoPausado = false;
            triviaActiva = false;
            triviaModal = null;
            obstaculoEnPausa = null;
            return;
        }
        if(obs){
            if(obs.tipo === 'pajaro') dino.agachadoAutomatico();
            else dino.saltoAutomatico();
        }
        const idx = obstaculos.indexOf(obstaculoEnPausa);
        if(idx !== -1) obstaculos.splice(idx,1);
        // 🔥 FORZAR REINICIO DEL CONTADOR DE FRAMES para que el próximo obstáculo aparezca rápido
        frameCounter = 0;
        const desbloq = juego.sombreros.filter(s=>s.desbloqueado).length;
        if(juego.respuestasCorrectas >= desbloq*2 && desbloq < SOMBREROS_BASE.length){
            juego.sombreros[desbloq].desbloqueado = true;
            mostrarMensaje(`🎉 NUEVO SOMBRERO: ${juego.sombreros[desbloq].nombre} 🎉`);
            guardarProgreso();
            actualizarPanelSombreros();
        }
    } else if(resultado === 'incorrecto'){
        juego.respuestasIncorrectas++;
        juego.puedeEsquivar = false;
    }
    juego.juegoPausado = false;
    triviaActiva = false;
    triviaModal = null;
    obstaculoEnPausa = null;
}

// ============================================
// DIBUJADO (sin mostrar preguntas restantes)
// ============================================
function dibujarFondo(){
    if(juego.modoNoche){
        const grad = ctx.createLinearGradient(0,0,0,canvas.height);
        grad.addColorStop(0,'#0a0f1e'); grad.addColorStop(1,'#1a1a2e');
        ctx.fillStyle=grad; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#FFF';
        for(let i=0;i<80;i++){ let x=(i*131)%canvas.width, y=(i*253)%150; ctx.fillRect(x,y,2,2); }
        ctx.fillStyle='#FFE66D'; ctx.beginPath(); ctx.arc(700,60,35,0,Math.PI*2); ctx.fill();
    } else {
        ctx.fillStyle='#87CEEB'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.ellipse(120,60,35,25,0,0,Math.PI*2); ctx.ellipse(160,55,30,22,0,0,Math.PI*2); ctx.ellipse(80,55,28,20,0,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(650,80,40,28,0,0,Math.PI*2); ctx.ellipse(690,75,32,24,0,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#FFD700'; ctx.beginPath(); ctx.arc(50,50,30,0,Math.PI*2); ctx.fill();
    }
}
function dibujarSuelo(){
    ctx.fillStyle=juego.modoNoche?'#2C3E50':'#8B4513'; ctx.fillRect(0,canvas.height-45,canvas.width,45);
    ctx.fillStyle=juego.modoNoche?'#FFE66D':'#F5DEB3';
    for(let i=0;i<20;i++){ let x=(sueloX+i*60)%(canvas.width*2); ctx.fillRect(x,canvas.height-48,4,4); }
    ctx.strokeStyle=juego.modoNoche?'#FFE66D':'#5C4033'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(0,canvas.height-45); ctx.lineTo(canvas.width,canvas.height-45); ctx.stroke();
}
function dibujarUI(){
    ctx.font='14px "Courier New", monospace'; ctx.fillStyle=juego.modoNoche?'#FFF':'#2C3E50'; ctx.textAlign='left';
    ctx.fillText(`🏆 ${Math.floor(juego.puntuacion)}`,15,30);
    ctx.fillText(`✅ ${juego.respuestasCorrectas}/${TOTAL_PREGUNTAS}`,15,55);
    if(!juego.puedeEsquivar && juego.pantalla==="jugando") ctx.fillStyle='#F00', ctx.fillText('⚠️ ESQUIVE INHABILITADO ⚠️',canvas.width-180,30);
    if(temporizadorMensaje>0){
        ctx.fillStyle='#FFD700'; ctx.font='12px "Courier New", monospace'; ctx.textAlign='center';
        ctx.fillText(mensajeTemporal, canvas.width/2, 50);
        ctx.textAlign='left';
        temporizadorMensaje--;
    }
}
function dibujarMenu(){
    dibujarFondo(); dibujarSuelo(); dino.dibujar();
    const ancho=480, alto=260, x=(canvas.width-ancho)/2, y=(canvas.height-alto)/2-20;
    ctx.fillStyle='rgba(0,0,0,0.88)'; ctx.fillRect(x,y,ancho,alto);
    ctx.strokeStyle='#FFF'; ctx.lineWidth=3; ctx.strokeRect(x,y,ancho,alto);
    ctx.font='22px "Courier New", monospace'; ctx.fillStyle='#FFF'; ctx.textAlign='center';
    ctx.fillText('DINO-REQUERIMIENTOS', canvas.width/2, y+45);
    ctx.font='13px "Courier New", monospace'; ctx.fillStyle='#FF0'; ctx.fillText('TRIVIA EDITION', canvas.width/2, y+75);
    ctx.font='11px "Courier New", monospace'; ctx.fillStyle='#CCC'; ctx.textAlign='left';
    const instr = ['* Responde las 10 preguntas para completar el juego','* CLICK en opción para seleccionar','* Presiona Z o ENTER para responder','* Si fallas, NO podrás esquivar el obstáculo','* Responde TODAS bien para DESBLOQUEAR UN COLECCIONABLE'];
    for(let i=0;i<instr.length;i++) ctx.fillText(instr[i], x+30, y+110+i*20);
    ctx.fillStyle='#333'; ctx.fillRect(x+ancho/2-80, y+alto-45, 160,35);
    ctx.strokeStyle='#FFF'; ctx.strokeRect(x+ancho/2-80, y+alto-45, 160,35);
    ctx.font='14px "Courier New", monospace'; ctx.fillStyle='#FFF'; ctx.textAlign='center';
    ctx.fillText('▶ PRESIONA ESPACIO', canvas.width/2, y+alto-22);
    ctx.textAlign='left';
}
function dibujarGameOver(){
    dibujarFondo(); dibujarSuelo();
    ctx.fillStyle='rgba(0,0,0,0.85)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font='26px "Courier New", monospace'; ctx.fillStyle='#FFF'; ctx.textAlign='center';
    if(juego.juegoTerminado) ctx.fillText('¡JUEGO COMPLETADO!', canvas.width/2, canvas.height/2-80);
    else ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2-80);
    ctx.font='14px "Courier New", monospace'; ctx.fillStyle='#FF0';
    ctx.fillText(`PUNTUACIÓN: ${Math.floor(juego.puntuacion)}`, canvas.width/2, canvas.height/2-30);
    ctx.fillStyle='#CCC'; ctx.fillText(`RÉCORD: ${juego.record}`, canvas.width/2, canvas.height/2);
    ctx.fillText(`✅ CORRECTAS: ${juego.respuestasCorrectas} | ❌ INCORRECTAS: ${juego.respuestasIncorrectas}`, canvas.width/2, canvas.height/2+35);
    if(skinEstrellaDesbloqueada) ctx.fillStyle='#FFD700', ctx.fillText('⭐ SKIN ESTRELLA DESBLOQUEADA ⭐', canvas.width/2, canvas.height/2+80);
    else if(juego.respuestasCorrectas===TOTAL_PREGUNTAS && juego.juegoTerminado) ctx.fillStyle='#FFD700', ctx.fillText('⭐ ¡DESBLOQUEASTE UN COLECCIONABLE! ⭐', canvas.width/2, canvas.height/2+80);
    ctx.font='13px "Courier New", monospace'; ctx.fillStyle='#FFF';
    ctx.fillText('Presiona ESPACIO para jugar de nuevo', canvas.width/2, canvas.height/2+130);
    ctx.textAlign='left';
}
function dibujarCinematica(){
    dibujarFondo(); dibujarSuelo();
    juego.cinematicAltura += 2;
    if(juego.cinematicAltura > canvas.height-150) juego.cinematicAltura = canvas.height-150;
    ctx.fillStyle='#8B4513'; ctx.fillRect(canvas.width/2-30, canvas.height-juego.cinematicAltura, 60, juego.cinematicAltura);
    ctx.fillStyle='#F1C40F'; ctx.fillRect(canvas.width/2-14, canvas.height-juego.cinematicAltura-45, 28,45);
    ctx.fillStyle='#FFF'; ctx.fillRect(canvas.width/2-6, canvas.height-juego.cinematicAltura-35,5,5);
    ctx.fillStyle='#000'; ctx.fillRect(canvas.width/2-5, canvas.height-juego.cinematicAltura-34,2,2);
    ctx.font='24px "Courier New", monospace'; ctx.fillStyle='#FFD700'; ctx.textAlign='center';
    ctx.fillText('✨ ¡NUEVA SKIN DESBLOQUEADA! ✨', canvas.width/2, 50);
    ctx.font='16px "Courier New", monospace'; ctx.fillStyle='#FFF';
    ctx.fillText('SKIN ESTRELLA DORADA', canvas.width/2, 90);
    if(juego.cinematicAltura >= canvas.height-150){
        ctx.font='14px "Courier New", monospace'; ctx.fillStyle='#FF0';
        ctx.fillText('Presiona ESPACIO para continuar', canvas.width/2, canvas.height-40);
    }
    ctx.textAlign='left';
}
function dibujar(){
    if(juego.pantalla==="menu") dibujarMenu();
    else if(juego.pantalla==="jugando"){
        dibujarFondo(); dibujarSuelo(); dino.dibujar();
        for(let obs of obstaculos) obs.dibujar();
        dibujarUI();
        if(triviaActiva && triviaModal) triviaModal.dibujar();
    } else if(juego.pantalla==="gameover") dibujarGameOver();
    else if(juego.pantalla==="cinematica") dibujarCinematica();
}

// ============================================
// EVENTOS
// ============================================
canvas.addEventListener('click',(e)=>{
    const rect=canvas.getBoundingClientRect();
    const mx=(e.clientX-rect.left)*(canvas.width/rect.width);
    const my=(e.clientY-rect.top)*(canvas.height/rect.height);
    if(juego.pantalla==="jugando" && triviaActiva && triviaModal) triviaModal.procesarClick(mx,my);
});
document.addEventListener('keydown',(e)=>{
    const key=e.key;
    if(juego.pantalla==="menu"){
        if(key===' '){ e.preventDefault(); reiniciarJuego(); }
        if(key==='n'||key==='N') juego.modoNoche=!juego.modoNoche;
    } else if(juego.pantalla==="jugando"){
        if(key==='ArrowLeft'){ cambiarSombrero('anterior'); return; }
        if(key==='ArrowRight'){ cambiarSombrero('siguiente'); return; }
        if(triviaActiva && triviaModal){
            if(key==='Enter' || key==='z' || key==='Z'){
                if(triviaModal.responder()) procesarRespuestaTrivia();
            }
        } else if(!juego.juegoPausado){
            if(key==='ArrowUp' || key===' '){ e.preventDefault(); dino.saltar(); }
            else if(key==='ArrowDown' || key==='Shift'){ e.preventDefault(); dino.agachar(true); }
        }
        if(key==='n'||key==='N') juego.modoNoche=!juego.modoNoche;
    } else if(juego.pantalla==="gameover"){
        if(key===' '){ e.preventDefault(); reiniciarJuego(); }
        if(key==='n'||key==='N') juego.modoNoche=!juego.modoNoche;
    } else if(juego.pantalla==="cinematica"){
        if(key===' '){
            e.preventDefault();
            juego.pantalla = "gameover";
            juego.juegoTerminado = true;
            juegoActivo = false;
        }
    }
});
document.addEventListener('keyup',(e)=>{
    if(juego.pantalla==="jugando" && !triviaActiva && !juego.juegoPausado && juego.puedeEsquivar){
        if(e.key==='ArrowDown' || e.key==='Shift') dino.agachar(false);
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================
reiniciarPreguntasDisponibles();
actualizarPanelSombreros();

const toggleBtn = document.getElementById('togglePanelBtn');
const panelSombreros = document.getElementById('sombrerosPanel');
toggleBtn.addEventListener('click', () => {
    if (panelSombreros.style.display === 'none') panelSombreros.style.display = 'block';
    else panelSombreros.style.display = 'none';
});
document.addEventListener('click', (e) => {
    if (panelSombreros.style.display === 'block' && !panelSombreros.contains(e.target) && e.target !== toggleBtn) {
        panelSombreros.style.display = 'none';
    }
});

function gameLoop(){ actualizarJuego(); dibujar(); requestAnimationFrame(gameLoop); }
gameLoop();

document.getElementById('instruccionesBtn').addEventListener('click',()=>{ document.getElementById('modalInstrucciones').style.display='flex'; });
document.getElementById('cerrarModal').addEventListener('click',()=>{ document.getElementById('modalInstrucciones').style.display='none'; });
document.getElementById('resetProgresoBtn').addEventListener('click',()=>{ if(confirm("¿Reiniciar todo el progreso?")) reiniciarProgresoCompleto(); });