// Initialize the score and cross variables
score = 0;
cross = true;

// Load background music 

const audio = new Audio('music.mp3');
audio.play(); // Play background music


// Event listener for keydown events
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) { // If the up arrow key is pressed
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino'); // Add jump animation to the dino
        setTimeout(() => {
            dino.classList.remove('animateDino') // Remove jump animation after 700ms
        }, 700);
    }
    if (e.keyCode == 39) { // If the right arrow key is pressed
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); // Get current left position of the dino
        dino.style.left = dinoX + 112 + "px"; // Move dino 112px to the right
    }
    if (e.keyCode == 37) { // If the left arrow key is pressed
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); // Get current left position of the dino
        dino.style.left = (dinoX - 112) + "px"; // Move dino 112px to the left
    }
}

// Check for collisions and update game state every 10ms
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    // Get current positions of the dino and obstacle
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // Calculate the distance between dino and obstacle
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // Check for collision
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"; // Display game over message
        obstacle.classList.remove('obstacleAni'); // Stop the obstacle animation
        
        setTimeout(() => {
            
            audio.pause(); // Pause all sounds after 1 second
        }, 1000);
    }
    // Check if dino successfully crossed the obstacle
    else if (offsetX < 145 && cross) {
        score += 1; // Increment score
        updateScore(score); // Update the score display
        cross = false; // Prevent further score increment until the next obstacle
        setTimeout(() => {
            cross = true; // Allow score increment after 1 second
        }, 1000);
        setTimeout(() => {
            // Decrease the obstacle's animation duration to increase the difficulty
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.07;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
    }

}, 10);

// Function to update the score display
function updateScore(score) {
    document.getElementById('scoreCont').innerHTML = "Score: " + score;
}







































































