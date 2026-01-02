const game = document.getElementById("game");
const ctx = game.getContext("2d");

const BACKGROUND = "#101010";
const FOREGROUND = "#50FF50";

const FPS = 60;
let dz = 3;

// ===== PELE =====
let dragging = false;
let lastX = 0;
let lastY = 0;
let rotY = 0;
let rotX = 0;

// ===== EVENTAI =====
game.addEventListener("mousedown", e => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener("mouseup", () => dragging = false);

window.addEventListener("mousemove", e => {
    if (!dragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    lastX = e.clientX;
    lastY = e.clientY;

    rotY += dx * 0.01;
    rotX += dy * 0.01;

    rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX));
});

// ===== GRAFIKA =====
function clear() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function line(a, b) {
    ctx.strokeStyle = FOREGROUND;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function screen(p) {
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1 - (p.y + 1) / 2) * game.height
    };
}

function project({x, y, z}) {
    return { x: x / z, y: y / z };
}

function translate_z(p, dz) {
    return { x: p.x, y: p.y, z: p.z + dz };
}

// ===== ROTACIJOS =====
function rotateY({x, y, z}, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return { x: x * c - z * s, y, z: x * s + z * c };
}

function rotateX({x, y, z}, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return { x, y: y * c - z * s, z: y * s + z * c };
}

function transform(v) {
    return rotateX(rotateY(v, rotY), rotX);
}

// ===== VIRŠŪNĖS =====
const vs = [
    { x:  0 , y:  0.18, z:  0.25},
    { x:  0 , y: -0.18, z:  0.25},
    { x:  0 , y:  0.18, z: -0.25},
    { x:  0 , y: -0.18, z: -0.25},

    { x: -1 , y:  0.18, z:  0.25},
    { x: -1 , y: -0.18, z:  0.25},
    { x: -1 , y:  0.18, z: -0.25},
    { x: -1 , y: -0.18, z: -0.25},

    { x: -0.25, y: 0.4 , z:  0.12},
    { x: -0.25, y: 0.4 , z: -0.12},
    { x: -0.45, y: 0.4 , z:  0.12},
    { x: -0.45, y: 0.4 , z: -0.12},

    { x: -0.25, y: 0.18, z:  0.12},
    { x: -0.25, y: 0.18, z: -0.12},
    { x: -0.45, y: 0.18, z:  0.12},
    { x: -0.45, y: 0.18, z: -0.12},

    { x: 1, y: 0.27, z:  0.05},
    { x: 1, y: 0.33, z: -0.05},
    { x: 1, y: 0.33, z:  0.05},
    { x: 1, y: 0.27, z: -0.05},

    { x: -0.25, y: 0.27, z:  0.05},
    { x: -0.25, y: 0.33, z: -0.05},
    { x: -0.25, y: 0.33, z:  0.05},
    { x: -0.25, y: 0.27, z: -0.05},
];

// ===== BRIAUNOS =====
const fs = [
        [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    
    // KVADRATAS 1
    
    [0, 2],
    [1, 3],
    [1, 0],
    [3, 2],

    //KVADRATAS 2
    
    [4, 5],
    [6, 7],
    [6, 4],
    [7, 5],

    //boksto virsus

    [8, 9],
    [10, 11],
    [12, 13],
    [14, 15],
   
    //boksto apacia

    [8, 10],
    [9, 11],
    [12, 14],
    [13, 15],

    //boksto sienos

    [8, 12],
    [9, 13],
    [10 ,14],
    [11, 15],

    //PUSHKA 

    [16, 18],
    [20, 22],
    [16, 20],
    [18, 22],

    [21, 23],
    [17, 19],
    [19, 23],
    [17, 21],

    [21, 22], 
    [16, 19],
    [17, 18],
    [20, 23]
];

// ===== LOOP =====
function frame() {
    clear();

    for (const f of fs) {
        const a = screen(project(translate_z(transform(vs[f[0]]), dz)));
        const b = screen(project(translate_z(transform(vs[f[1]]), dz)));
        line(a, b);
    }

    setTimeout(frame, 1000 / FPS);
}

frame();