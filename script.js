const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// creating a function to initialize the game
function init(){

    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box) =>{
        box.innerText=""
        box.style.pointerEvents ="all";
    }) 
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

init();

function swapTurn(){
    
    if(currentPlayer === "X"){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText= `Current Player ${currentPlayer}`

    newGameBtn.classList.add("active")


}



function checkWinner(){
     
    let answer ="";

    winningPositions.forEach((position) =>{

        // values in gameGrid at any of these positions  should be non empty and should be same
        // all 3 boxes should be non-empty and same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
                
            }
            else{
                answer = "O";
            }


            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })


            // gameInfo.innerText= `Winner is  ${answer}`;

            // we have the winner now 
            // now we have to make the boxes green

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });


    //since we have a winner
    if( answer !== "" ){
        gameInfo.innerText= `Winner is  ${answer}`;
        // gameInfo.style.
    } else if (answer==="" && emptyBoxes===0 ){
        gameInfo.innerText = `Match Tied`;
    
    }




}


let emptyBoxes=9;

function handleClick(index){

    if(gameGrid[index]===""){

        emptyBoxes--;

        boxes[index].innerText = currentPlayer; //changes are being made on UI
        gameGrid[index] = currentPlayer; //changes are being made in game grid to keep track

        boxes[index].style.pointerEvents ="none"; // boxes that are already marked cursor will not  change on hovering
        //swap turn

        swapTurn();

        //check winner
        checkWinner();

         
    }
    
}


//for each click on the box
boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);

    })
});


newGameBtn.addEventListener("click", () =>{
    init();
    boxes.forEach((box) => {

        box.classList.remove("win")
        
    })

});