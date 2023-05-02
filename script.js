const boxes = document.querySelectorAll('.box');
let info_box = document.getElementById('player-turn');
let currentPlayer = 'X';
let free_spaces = 9;
let pop_up = document.getElementById('popup');
let winner_msg = document.getElementById('winnermessage');
let container = document.getElementById('container-fluid');
let scoreX = document.getElementById('x-score');
let scoreO = document.getElementById('o-score');
var x_score = 0;
var o_score = 0;
scoreX.textContent = x_score;
scoreO.textContent = o_score;

//This is executed every time a box is clicked
boxes.forEach(function(box){
    box.addEventListener('click',function(){
        if (box.textContent !== ""){  // If the box already has a value, nothing is done
            return;
        }
        box.textContent = currentPlayer;    //Otherwise a value is assigned to it
        currentPlayer = currentPlayer === "X" ? "O" : "X";      //Tenary operator to change the current player (If X, change to O, else make it X)
        alert.textContent = "Player " + currentPlayer + "'s turn";
        free_spaces -= 1;

        if (free_spaces <= 6) {
            const winning_combinations = [
                [0,1,2], [3,4,5], [6,7,8],  //rows
                [0,3,6], [1,4,7], [2,5,8],  //columns
                [0,4,8], [2,4,6] ];         //diagonals
            
            for (let i = 0; i < winning_combinations.length; i++) {
                const [a, b, c] = winning_combinations[i];
                if(boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[b].textContent === boxes[c].textContent) {
                    winner_msg.textContent = "Player " + boxes[a].textContent + " wins!!";
                    info_box.textContent = winner_msg.textContent;
                    
                    //Make the pop-up appear
                    pop_up.style.visibility = "visible";
                    pop_up.style.top = "50%";
                    pop_up.style.transform = "translate(-50%, -50%) scale(1)";
                    container.style.filter = "blur(5px)";

                    //Update score
                    if(boxes[a].textContent == 'X'){
                        scoreX.textContent = x_score + 1;
                    }
                    else {
                        scoreO.textContent = o_score + 1;
                    }
                }
            }
        }
    });
});

//Clear the Game board once the "Play Again" button is clicked
function clearBoard() {
    boxes.forEach(function(box){
            box.textContent = "";
    })
    pop_up.style.visibility = "hidden";
    pop_up.style.top = "0";
    pop_up.style.transform = "translate(-50%, -50%) scale(0.1)";
    container.style.filter = "none";
    info_box.textContent = "Player X's turn";
    currentPlayer = 'X';
}         
