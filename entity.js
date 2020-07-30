const directionKey = [37, 38, 39, 40]; //keycode for left, up, right and down key

class Snake {
    
    constructor (newX, newY){
        this.x = newX;      //used to store the snake's x coordinate
        this.y = newY;      //used to store snake's y coordinate
        this.xSpeed = 1;    //The xSpeed and ySpeed is used to store the direction of the snake
        this.ySpeed = 0;    
        this.total = 0;     //used to store the length of the snake
        this.tail = [];     //store the tail nodes coordinate
    }

    //drawing out the snake tail nodes and head
    draw () {
        ctx.fillStyle = "#f2f23f"; // tail yellow
		for (let i=0;i<this.tail.length;i++) {
			ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
		}
		ctx.fillStyle = "#FFFFFF"; //head white
		ctx.fillRect(this.x, this.y, box, box);
    }
    
    // tail[] - change the nodes coordinate with the node after it 
    // tail[last index] - change the coordinate to the current head position
    // snake coordinate (this.x and this.y) - change to the next node coordinate (according to direction)
    update () {
        for (let i = 0;i<this.tail.length - 1;i++) {
                this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total - 1] = { x: this.x , y: this.y};
        this.x += this.xSpeed * box;
        this.y += this.ySpeed * box; 
    }

    //function that check if the food and snake's head is collided with each other
    eat (food) {
        if (food.x * box === this.x && food.y * box === this.y) {
            this.total++;
            return true;
        }
        return false;
    }

    //change direction by checking which key is pressed
    changeDirection (direction) {
        switch (direction) {
            //up
            case directionKey[1]:
                if (this.ySpeed != 1) {
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                }
            break;
            //down
            case directionKey[3]:
                if (this.ySpeed != -1) {
                    this.xSpeed = 0;
                    this.ySpeed = 1;
                }
            break;
            //left
            case directionKey[0]:
                if (this.xSpeed != 1) {
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                }
            break;
            //right
            case directionKey[2]:
                if (this.xSpeed != -1) {
                    this.xSpeed = 1;
                    this.ySpeed = 0;
                }
            break;
        }
    }
}


//food class
class Food {
    constructor () {
        //randomlly generate a coordinate for the food
        this.x = Math.floor(Math.random() * rows);
        this.y = Math.floor(Math.random() * columns);
    }

    //drawing out the food object according to its coordinates
    draw () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x * box, this.y * box, box, box);
    }
}




