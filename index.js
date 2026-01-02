const BACKGROUND =  "#101010"
const FOREGROUND =  "#50FF50"

game.width = 900
game.height = 900

const ctx = game.getContext("2d")


function clear () {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function point({x, y}) {
    const s = 20;
    ctx.fillStyle = FOREGROUND  
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = FOREGROUND;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}
function screen(p) {
    //-1..1 => 0..2 => 0...1 => 0..w
    return {
        x: (p.x + 1)/2*game.width,
        y: (1 - (p.y + 1)/2)*game.height,
    }
}

function project({x, y, z}) {  
    return {
        x: x/z,
        y: y/z,
    }
}

const FPS = 60;
let dz = 3;
let angle = 0;

const vs = [
    //virsutine
    { x:  0 , y:  0.18, z: 0.25},
    { x:  0 , y: -0.18, z: 0.25},
    { x:  0 , y:  0.18, z: -0.25 },
    { x:  0 , y: -0.18, z: -0.25 },

    // apatine
    { x: -1, y:  0.18, z: 0.25},
    { x: -1, y: -0.18, z: 0.25},
    { x: -1, y:  0.18, z: -0.25 },
    { x: -1, y: -0.18, z: -0.25 },

 // bokstas virsus 

    { x: -0.25, y:  0.4, z: 0.12},
    { x: -0.25, y:  0.4, z:-0.12},
    { x:-0.45, y:  0.4, z: 0.12},
    { x:-0.45, y:  0.4, z:-0.12},
     
    // bokstas apacia 

    { x: -0.25, y: 0.18, z: 0.12},
    { x: -0.25, y: 0.18, z:-0.12},
    { x:-0.45, y:  0.18, z: 0.12},
    { x:-0.45, y:  0.18, z:-0.12},

// pushka

    { x: 1, y:  0.27, z: 0.05},
    { x: 1, y:  0.33, z:-0.05},
    { x: 1, y:  0.33, z: 0.05},
    { x: 1, y:  0.27, z:-0.05},


    { x: -0.25, y:  0.27, z: 0.05},
    { x: -0.25, y:  0.33, z:-0.05},
    { x: -0.25, y:  0.33, z: 0.05},
    { x: -0.25, y:  0.27, z:-0.05},

]


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




]
function translate_z({x, y, z}, dz) {
    return {x, y, z: z + dz}
}

function rotate_xz ({x, y, z}, angle) {
     const c = Math.cos(angle);
     const s = Math.sin(angle);
     return {
        x: x*c-z*s,
        y,
        z: x*s+z*c,
     }
}
function frame() {
    const dt = 1/FPS;
   // dz += 1*dt
    angle += Math.PI*dt;
    clear()
    
    //  for (const v of vs) {
    //      point(screen(project(translate_z(rotate_xz(v, angle), dz))))
    //  }

    for (const f of fs) {
        for (let i = 0; i < f.length; ++i) {

            const a = vs[f[i]];
            const b = vs[f[(i + 1)%f.length]];

            const aStroke = screen(project(translate_z(rotate_xz(a, angle), dz)))
            const bStroke = screen(project(translate_z(rotate_xz(b, angle), dz)))

            line(
                aStroke,
                bStroke
            )
            
        }       
    }

    setTimeout(frame, 1000/FPS); 
}
setTimeout(frame, 1000/FPS); 