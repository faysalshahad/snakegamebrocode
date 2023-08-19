const gameBoard = document.querySelector("#gameBoard");
const canvasContext = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetBtn");
/**This gameboard.width attribute is related to the width of the canvas */
const gameWidth = gameBoard.width;
/**This gameboard.width attribute is related to the height of the canvas */
const gameHeight = gameBoard.height;
const boardBackground = "#FFF9C9";
const snakeColor = "darkred";
const snakeBorder = "black";
const foodColor = "darkblue";
const unitSize = 25;
let running = false;
let xVelocity = unitSize, yVelocity = 0;
let foodX, foodY, score = 0;
let snake = [
    /**Each objects inside the array are the body parts of the snake */
    {x:unitSize * 4, y: 0},
    {x:unitSize * 3, y: 0},
    {x:unitSize * 2, y: 0},
    {x:unitSize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();
//createFood();
//drawFood();

function gameStart() {
    running = true;
    scoreText.textContent =`Your Score: ${score}`;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout( ()=> {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 300); /**Here 100 is the milisecond count */
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    canvasContext.fillStyle = boardBackground;
    canvasContext.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    function randomFood(min, max) {
        const randNum = (Math.round((Math.random() * 
        (max - min) + min) / unitSize) * unitSize);
        return randNum;
    }
    foodX = randomFood(0, (gameWidth - unitSize));
    foodY = randomFood(0, (gameWidth - unitSize));
    //console.log("Printing Food X" +foodX);
    //console.log("Printing Food Y" +foodY);
}

function drawFood() {
    /**Giving colour to the food */
    canvasContext.fillStyle = foodColor;
    /**Filling a rectangale. foodX and foodY are the pair of co-ordinates
     * and unitSize are the width and height consecutively.*/
    canvasContext.fillRect(foodX, foodY, unitSize, unitSize);

}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity};
    snake.unshift(head);
    /**If Food is eaten */
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score ++;
        scoreText.textContent =`Your Score: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    canvasContext.fillStyle = snakeColor;
    canvasContext.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        canvasContext.fillRect(snakePart.x, snakePart.y,
            unitSize, unitSize);
            canvasContext.strokeRect(snakePart.x, snakePart.y,
                unitSize, unitSize);
    });   
}

function changeDirection(e) {
    const keyPressed = e.keyCode;
    //console.log("Arrow Key Pressed" +keyPressed);
    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == leftKey && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
            case (keyPressed == upKey && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
            case (keyPressed == rightKey && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
            case (keyPressed == downKey && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkGameOver() {
    switch (true) {
        /**This means the snake head went outside of the left border */
        case (snake[0].x < 0):
            running = false;
            break;
            /**This means the snake head went outside of the right border */
        case (snake[0].x >= gameWidth):
            running = false;
            break;
            /**This means the snake head went outside of the top border */
        case (snake[0].y < 0):
            running = false;
            break;
            /**This means the snake head went outside of the bottom border */
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        /**If the head of our snake becomes equal to one of our body parts
         * then the game will be over.*/
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
        
    }
}

function displayGameOver() {
    canvasContext.font = "80px MV Boli";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;

}

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        /**Each objects inside the array are the body parts of the snake */
        {x:unitSize * 4, y: 0},
        {x:unitSize * 3, y: 0},
        {x:unitSize * 2, y: 0},
        {x:unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart();
}