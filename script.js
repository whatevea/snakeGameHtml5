const screen=document.getElementById('myCanvas').getContext('2d');
var direction="right";
const moveSpeed=10; //can be 5 or 10 only;
var snakeBody=[{x:0,y:0,lastY:null,lastX:null}];
var snakeHeadLastX=0;
var snakeHeadLastY=10;
const snakeEataudio= document.getElementById('eat');
const bangAudio= document.getElementById('bang');

var score=0;
const snakeHead={
	x:10,
	y:10,
	length:10,
	height:10,
}
const food={
	x:0,
	y:0,
	presence:false
}

function start(){
setInterval(render,200);}

function render(){
	screen.clearRect(0,0,500,500);
	renderSnakeBody();
	renderSnakeHead();
	renderFood();

}


//Event listener :
document.addEventListener('keydown',(event)=>{
	if(event.keyCode==38 && direction!="down"){
		direction="up";
	}
	else if(event.keyCode==37 && direction!="right"){
		direction="left"
	}
	else if(event.keyCode==39 && direction!="left"){
		direction="right"
	}
	else if(event.keyCode==40 && direction!="up"){
		direction="down"
	}

})

function moveSnakeHead(){

	snakeHeadLastX=snakeHead.x;
	snakeHeadLastY=snakeHead.y;

	if (direction=="right"){
		snakeHead.x+=moveSpeed;
	}
	if(direction=="left"){
		snakeHead.x-=moveSpeed;
	}
	if(direction=="up"){
		snakeHead.y-=moveSpeed;
	}
	if(direction=="down"){
		snakeHead.y+=moveSpeed;
	}
}

function renderSnakeHead(){
	screen.fillStyle="red";
	screen.fillRect(snakeHead.x,snakeHead.y,snakeHead.length,snakeHead.height);
	checkSnakeCollison();
	moveSnakeHead();

}
function checkSnakeCollison(){
	if(snakeHead.x>500 || snakeHead.x<0 || snakeHead.y<0 || snakeHead.y>500){
		collided();
	}
	if(snakeHead.x==food.x && snakeHead.y == food.y){
		console.log("food eaten");
		food.presence=false;
		snakeEataudio.play();
		score+=1;
		snakeBody.push({x:null,y:null,lastX:null,lastY:null})
	}
}

function renderSnakeBody(){
	snakeBody.forEach((item,index)=>{
		if(item.x==snakeHead.x && item.y==snakeHead.y){
			collided();
		}
		if(index==0){
			item.lastX=item.x;
			item.lastY=item.y;
			item.x=snakeHeadLastX;
			item.y=snakeHeadLastY;
		}
		else {
			item.lastX=item.x;
			item.lastY=item.y;
			item.x=snakeBody[index-1].lastX;
			item.y=snakeBody[index-1].lastY;
		}
			screen.fillStyle="white";
			screen.fillRect(item.x,item.y,10,10)
	})

}
//render food
function renderFood(){
	if(!food.presence){
	food.x=(Math.floor(Math.random() *48) + 1)*10;
	food.y=(Math.floor(Math.random() *48) + 1)*10;
	food.presence=true;
	}
	screen.fillStyle="yellow";
	screen.fillRect(food.x,food.y,10,10);}
function collided(){
	bangAudio.play();
	alert(`Your Final score was ${score}`);
	location.reload()
}
document.getElementById('startBtn').addEventListener('click',(e)=>{
	screen.canvas.style.display="block";
	e.target.style.display="none";
	start();
})