const BACKGROUND =  "#101010"
const FOREGROUND =  "#50FF50"

game.width = 800
game.height = 800

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

clear()


point(screen(project({x: -0.5, y: 0.5, z: 2 })))
point(screen(project({x: 0.5, y: -0.5, z: 1 +dz })))
point(screen(project({x: -0.5, y: 0.5, z: 1 +dz })))


//const { x, y } = screen({x: -0.5 , y: 0.5})


const FPS = 60;
let dz = 0;

function frame() {
    const dt = 1/FPS
    dz += 1*dt
    clear()
    
    
   
}




const box = {
    x: 400,
    y: 600
}
