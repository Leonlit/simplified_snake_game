'use strict'

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    box = 20,		//size per tile or box or node
	rows,			//store the available rows and 
	columns,		//columns of our game
	snake,			//store the snake object
	food,			//store the food object
	direction;		//store the current direction of the snake 

//detecting key pressed by user
document.addEventListener("keydown", (event)=>{
	direction = event.keyCode;
});

window.onload = function () {
    initiate();
}

//game startup
function initiate () {
	//rows & columns used for limiting the location (coordinate) that our food can be assigned to
    rows = canvas.height / box;
    columns = canvas.width / box;
	
	//storing object to two global variable
	food = new Food();
	snake = new Snake(box*5, box*5);

	//draw the objects out
	food.draw();
	snake.draw();

	//game loop
	setInterval (()=>{
		update();
	}, 100); 	//update every 100 miliseconds
}

//method for updating the game data 
function update () {
	//clearing the canvas (if not the old shape that's drawn on the canvas will remain)
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//update the coordinates of the snake tail nodes and head
	snake.update();
	//change the direction of the snake according to the current recorded direction
	snake.changeDirection(direction);
	//check if the snake currently on a food object location, if yes then generate
	//a new food object to get a new coordinate for the new food
	if (snake.eat(food)) {
		food = new Food();
		food.draw();
	}else {
		//if the head of the snake isn't on top of the food node, 
		//then draw the food again (as we cleared the canvas just now)
		food.draw();
	}
	//this is just a feature where when the snake exceeded the boundaries of the canvas,
	//the system will reposition the snake head to the opposite side of the canvas
	if (snake.x >= canvas.width) {
		snake.x = 0;
	}else if( snake.x < 0) {
		snake.x = canvas.width-box
	}else if (snake.y >= canvas.height) {
		snake.y = 0;
	}else if (snake.y < 0 ) {
		snake.y = canvas.height - box;
	}
	//lastly after all of the coordinates has been processed and 
	//saved, draw the snake object (head and tails node)
	snake.draw();
}
