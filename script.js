const boxes = document.querySelectorAll('.box');
const x_o = document.querySelectorAll('.char');
let alert = document.querySelector('#player-turn');
let currentPlayer = 'X';

boxes.forEach(function(box){
    box.addEventListener('click',function(){
        if (box.textContent !== ""){
            return;
        }
        box.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        alert.textContent = "Player " + currentPlayer + "'s turn";
    });
});