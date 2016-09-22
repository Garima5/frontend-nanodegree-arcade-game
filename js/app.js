
/**
* Game 
* @ author: Garima Aggarwal
*/
var score=0; //Global variable to calculate score
var choose_speed=[200,100,50,290]; //options for speeds
var level=1;
var lives=5;
/**
* @description : Describes the Enemy class that is the bugs that have to be missed
* @constructor : Enemy
* @functions : update(),render(),reset()
* @param {int} speed - speed of the bug 
* @param {int} x - x co- ordinate of the bug on the canvas
* @param {int} y - y co- ordinate of the bug on the canvas
*/
var Enemy = function(speed,x,y) {
    
    this.speed=speed, // movement in pixels per second
    this.x=x,
    this.y=y,
    this.sprite = 'images/enemy-bug.png';
};
/**
* @description : Update the enemy's position, required method for game
* @param {int} dt - multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
*/
Enemy.prototype.update = function(dt) {
    
    this.x+=this.speed*dt; //Multiplying speed with dt to find new position of bug at each rendering
    if(this.x>505)
    {
        this.x=-100;   //After crossing the border,the bug starts again
    }
     if(this.x < player.x + 50 && this.x + 70 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        //Detects collision

        score = score-1; //If collision is detected, reduce score by 1 and reset the position of the player    
        lives=lives-1;
        if(lives<=0)
        {
            player.reset();
            score=0;
            level=1;

            lives=5;
        }
        player.reset();
    }
};

/**
 Draw the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description : Describes the Player class that is the player
* @constructor : Player
* @functions : update(),render(),reset(),handleInput()
*/
var Player=function()
{        
    this.x= 200, //Initial x co ordinate
    this.y= 400, //Initial y co ordinate
    this.sprite ='images/char-horn-girl.png',
    this.life='images/Heart.png'    
};
/** Draw the player and display the score */
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //Draw the player
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 50, 70); //Write the score on canvas
    ctx.fillText("Level " + level, 170, 70);
    for(g=0;g<lives;g++)
    {
        ctx.drawImage(Resources.get(this.life), 270+(g*30),60,30,40);
    }
    //document.write("Number of lives: "+ lives);
};
/**
* desription- If the player reaches the water add 5 to score and reset its position
*/
Player.prototype.update=function()
{
    if(this.y<20)
    {
        score=score+5;
        this.reset();
        level=level+1;

    }

};
/**
Reset the player co ordinates
*/
Player.prototype.reset=function()
{
    
    this.x=200;
    this.y=400;

};
/**
* @ description : Function to handle inputs that is to control where the player will move according to keys pressed
* @param {string} direction: Direction where the player is moved depending on the key codes

*/

Player.prototype.handleInput = function(direction) {

    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};
/**
* @description : Describes the Blue Gem class that is class for blue coloured gem
* @constructor : BlueGem
* @functions : update(),render(),reset()
* @param {int} speed - speed of the gem 
*/
var BlueGem=function(speed)
{
    this.speed=speed,
    this.x=400,
    this.y=70,
    this.sprite='images/Gem Blue.png'
};
/**
Draw the Gem on the canvas
*/

BlueGem.prototype.render = function() {

    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,60,80);
};

BlueGem.prototype.update = function(dt) {    
    
    this.y+=this.speed*dt;
    if(this.y>300)
    {
        // To check that blue gem doesnot go below the user
        this.reset();
    }
    if(this.x<50)
    {
        //To check that the gem does not cross the borders
        this.x=400;
    }
      if(this.x < player.x + 60 && this.x + 40 > player.x && this.y < player.y + 40 && this.y + 20 > player.y) {
      
      //If blue gem is caught increase the score by 5
        
        score=score+5;
        this.reset();
    }
};
/**
reset the co ordinates of blue gem
*/
BlueGem.prototype.reset=function()
{
    this.x-=50;
    this.y=30;

};
////////////////////
/**
* @description : Describes the Green Gem class that is class for green coloured gem
* @constructor : GreenGem
* @functions : update(),render(),reset()
* @param {int} speed - speed of the gem 
*/
var GreenGem=function(speed)
{
    this.speed=speed,
    this.x=30,
    this.y=300,
    this.sprite='images/Gem Green.png'
};
/**
draw the gem on the canvas
*/
GreenGem.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,60,80);
};
/**
update the position of green gemm
*/
GreenGem.prototype.update = function(dt) {
    
    this.y-=this.speed*dt;//Multiplying the speed with dt
    if(this.y<70)
    {
        //to check that green gem does not go beyond water
        this.reset();
    }
     if(this.x>450)
    {
        // To check that green gem does not cross the border
        this.x=30;
    }
      if(this.x < player.x + 60 && this.x + 40 > player.x && this.y < player.y + 40 && this.y + 20 > player.y)
       {       
        //if green gem is caught increase score by 3
        score=score+3;
        this.reset(); //reset the position of green gem
    }
};
/**
reset the co ordinates of green gem
*/

GreenGem.prototype.reset=function()
{
    this.x+=50; //continuously change the position of green gem after each loop
    this.y=400;

};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//Variables to choose random speeds from choose_speed array
var rand_speed1=choose_speed[Math.floor(Math.random() * choose_speed.length)];
var rand_speed2=choose_speed[Math.floor(Math.random() * choose_speed.length)];
var rand_speed3=choose_speed[Math.floor(Math.random() * choose_speed.length)];
var rand_speed4=choose_speed[Math.floor(Math.random() * choose_speed.length)];
var rand_speed5=choose_speed[Math.floor(Math.random() * choose_speed.length)];
var rand_speed6=choose_speed[Math.floor(Math.random() * choose_speed.length)];
//Math.random() function returns a value between 0 to 0.99.We multiply it with required factor.
//instantiate the objects.

var enemy1=new Enemy(rand_speed1,-400,70);
var enemy2=new Enemy(rand_speed3,-100,150);
var enemy3=new Enemy(rand_speed4,-200,250);
var allEnemies=[enemy1,enemy2,enemy3]; //Placing all enemies in allEnemies array
var gem_blue=new BlueGem(rand_speed5); //blue gem
var gem_green=new GreenGem(rand_speed6); //green gem
var player=new Player(); //player object
