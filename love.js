// Block configurations
const blk_pitn = {
    block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
    block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
    block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
    block11: [[2, 0], [0, 0], [-1, 0], [1, 0]],
    block12: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block17: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block19: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block22: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block23: [[0, 2], [0, 0], [0, -1], [0, 1]]
};

// Position offsets for each block
const offset_pitn = {
    block1: [5, 3],
    block2: [5, 1],
    block3: [3, 4],
    block4: [3, 2],
    block5: [3, -1],
    block6: [2, 5],
    block7: [2, 1],
    block8: [1, -1],
    block9: [1, -3],
    block10: [1, 2],
    block11: [0, 3],
    block12: [0, 0], 
    block13: [-1, -4],
    block14: [0, -2],
    block15: [-2, 4],
    block16: [-2, 2],
    block17: [-2, 0],
    block18: [-3, -2],
    block19: [-4, 0],
    block20: [-3, 5],
    block21: [-5, 3],
    block22: [-4, 1],
    block23: [-6, 1]   
};

// DOM elements
const blocks = document.getElementsByClassName("block");
const block = blocks[0];
const love = document.getElementsByClassName("love")[0];
let timer = null;
let index = 0;
let clone_block;

// Initialize block position
block.style.position = "absolute";
block.style.top = "50%";
block.style.left = "50%";
block.style.transform = "translate(-50%, -50%)";

// Animation functions
function Next() {
    if (++index >= 24) {
        clearInterval(timer);
        Rise();
        return;
    }

    block.style.visibility = "visible";
    
    // Calculate new position
    const offsetX = 40 * offset_pitn["block" + index][0];
    const offsetY = 40 * offset_pitn["block" + index][1];
    
    // Position the block
    block.style.left = `calc(50% + ${offsetX}px)`;
    block.style.top = `calc(50% + ${offsetY}px)`;
    
    // Position each heart piece
    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }

    // Clone the block
    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    // Hide last pieces when complete
    if (love.children.length >= 24) {
        blocks[blocks.length - 1].children[2].style.display = "none";
        block.style.display = "none";
    }
}

function Rise() {
    console.log("Starting ascent animation");
    let timer2 = null;
    let distance = 0;
    const target = 120;
    const speed = 1;
    const startTop = love.getBoundingClientRect().top + window.scrollY;

    timer2 = setInterval(() => {
        distance += speed;
        if (distance >= target) {
            clearInterval(timer2);
            console.log("Ascent complete");
        }
        love.style.transform = `translate(-50%, calc(-50% - ${distance}px))`;
    }, 22);
}

// Start animation after page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        // Try to play audio (may not work due to browser restrictions)
        const audio = document.getElementById('audios');
        audio.play().catch(e => console.log("Autoplay prevented:", e));
        
        // Start heart animation
        timer = setInterval(Next, 300);
    }, 12000);
});
