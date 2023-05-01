const boxes = document.querySelectorAll('.box');
const x_o = document.querySelectorAll('.char');
let alert = document.querySelector('#player-turn');
let currentPlayer = 'X';
let free_spaces = 9;

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
                    alert.textContent = "Player " + boxes[a].textContent + " wins!!";
                }
            }
        }
    });
});
