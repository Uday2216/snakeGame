
//Game constants and variables
let inputDir={
    x:0,
    y:0
}
const foodSound =new Audio('food.mp3')
const gameOverSound =new Audio('gameover.mp3')
const moveSound =new Audio('move.mp3')
const musicSound =new Audio('Snake Music.mp3')
let speed=5
let score=0
let count=0
let hscore=0
let lastPaintTime=0;
let snakeArr=[
    {x:12,y:16}
]
let food={x:4,y:5}





//Game Functions
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
   lastPaintTime = ctime
   gameEngine()
   musicSound.play()
}
function isCollide(snake){
   for(let i=1; i<snakeArr.length; i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
      musicSound.pause()
      gameOverSound.play(); 
       return true;
        
    }
 
   }
   if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
    musicSound.pause()
    gameOverSound.play();
    return true
   }

 
}
function gameEngine(){
    //updating the snake array variables
    if(count==0){
    points.innerHTML="Score = 0" 
    count +=1
    }
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0}
        gameOverSound.play()
        musicSound.pause()
        count=0
        if(score==0){
        localStorage.setItem('hscore',hscore)
      }
        else{
          localStorage.setItem('hscore',score)
        }
       let a= confirm("You Lost the Game ...Do you want to play again ");
       if(a){
        count=0
        musicSound.play()
        snakeArr=[{x:4,y:12}]
       }else{
        alert("Game Over....Thanks For Playing")
        musicSound.pause()
        snakeArr=[{x:12,y:16}]
        score=0
       
 }
       
    }         


    if(snakeArr[0].y===food.y  && snakeArr[0].x===food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y  })
        score +=1;
        points.innerHTML="Score =" +score;
      
        /*if(isCollide){
          let high= localStorage.getItem(score)
          highscore.innerHTML
        }*/
        let a=2;
        let b=16
        food={x:2 + Math.round(a+(b-a)*Math.random()) , y:2 + Math.round(a+(b-a)*Math.random())}
        foodSound.play()
      }
     

    //Moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake and food

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart=e.y;
            snakeElement.style.gridColumnStart=e.x;
           
            if(index===0){
            snakeElement.classList.add('head')
            }else{
                snakeElement.classList.add('snake')
            }
            board.appendChild(snakeElement)

    })
    foodElement=document.createElement('div');
            foodElement.style.gridRowStart=food.y;
            foodElement.style.gridColumnStart=food.x;
            foodElement.classList.add('food')
            board.appendChild(foodElement)
            
}














//Main logic starts here
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //start the game
    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
  
      case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
  
      case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
  
      case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
  
      default:
        break;
    }
  });
  



