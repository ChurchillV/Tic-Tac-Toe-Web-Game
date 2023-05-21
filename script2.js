const boxes = document.querySelectorAll(".box");
let info_box = document.getElementById("player-turn");
let currentPlayer = "X";
let free_spaces = 9;
let pop_up = document.getElementById("popup");
let winner_msg = document.getElementById("winnermessage");
const container = document.querySelectorAll(".container-fluid");
let scoreX = document.getElementById("x-score");
let scoreO = document.getElementById("o-score");
let x_score = 0;
let o_score = 0;
const menu = document.querySelector(".menu");
scoreX.textContent = x_score;
scoreO.textContent = o_score;
let showMenu = false;
let isDraw = true;
let blur = false;

//Array of all possible winning combinations
const winning_combinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8], //rows
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8], //columns
	[0, 4, 8],
	[2, 4, 6],
]; //diagonals

//Multiplayer option
function multiplayer() {
	displayMenu();
	boxes.forEach(function (box) {
		box.addEventListener("click", function () {
			if (box.textContent !== "") {
				// If the box already has a value, nothing is done
				return;
			}
			box.textContent = currentPlayer; //Otherwise a value is assigned to it
			currentPlayer = currentPlayer === "X" ? "O" : "X"; //Tenary operator to change the current player (If X, change to O, else make it X)
			info_box.textContent = "Player " + currentPlayer + "'s turn";
			free_spaces -= 1;
			if (free_spaces <= 6) checkWinner();
		});
	});
}

//Single Player Option, AI
function singleplayer() {
	displayMenu();
	const ai = "O";
	let ai_turn = false;
	let last_played = [];
    let last_played_ai = [];
    function check(array) {
        let counter;
        let ai_counter;
        let move_arr;
        if (array.length > 1) {
            console.log("array: ", array);
            for (let i = 0; i < array.length; i++) {
                counter = 0;
                ai_counter = 0;
                for (let j = 0; j < array[i].length; j++) {
                    if (boxes[array[i][j]].textContent == currentPlayer) counter++;
                    else if(boxes[array[i][j]].textContent == ai) ai_counter++;
                    
                    
                }
                if(free_spaces == 0){
                    checkWinner();
                    break;
                } else if(counter + ai_counter == 3 && array.length - 1 == i) {
                    move_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((num) => boxes[num].textContent == "");
                    break;
                 } else if (counter == 3) {
                    checkWinner();
                    break;
                 }
                  else if (counter == 2 && ai_counter == 0) {
                    move_arr = array[i].filter((num) => boxes[num].textContent == "");
                    break;
                }else move_arr = array.flat(2).filter((num) => boxes[num].textContent == "");
            }
        } else console.log("array: "+ array);
    
        console.log("move_arr: " + move_arr);
        console.log("counter2: " + counter);
        return move_arr;
    }
	boxes.forEach(function (box, i) {
		box.addEventListener("click", function () {
			if (box.textContent !== "") {
				return;
			}
			if (!ai_turn) {
				box.textContent = currentPlayer;
				last_played.push(i);
				ai_turn = true;
                free_spaces--;
                checkWinner();
				if (ai_turn) {
					let possible_moves = winning_combinations.filter((arr) =>arr.includes(i));
                    possible_moves = check(possible_moves);
                    let proceed = true;
                    while (proceed) {
						let rand = Math.floor(Math.random() * possible_moves.length);
						let move = possible_moves[rand];
						if (boxes[move].textContent == "") {
							boxes[move].textContent = ai;
                            last_played_ai.push(move);
							proceed = false;
						}
					} ;
					checkWinner();
                    free_spaces--;
					ai_turn = false;
				}
			}
		});
	});
}

//Clear the Game board and Popup once the "Play Again" button is clicked
function clearBoard() {
	boxes.forEach(function (box) {
		box.textContent = "";
	});
	pop_up.style.visibility = "hidden";
	pop_up.style.top = "0";
	pop_up.style.transform = "translate(-50%, -50%) scale(0.1)";
	info_box.textContent = "Player X's turn";
	currentPlayer = "X";
	unblur();
}

//Startup menu
function displayMenu() {
	if (showMenu) {
		menu.style.visibility = "visible";
		menu.style.top = "50%";
		menu.style.transform = "translate(-50%, -50%) scale(1)";
		unblur();
		showMenu = false;
	} else {
		menu.style.visibility = "hidden";
		menu.style.top = "0";
		menu.style.transform = "translate(-50%, -50%) scale(0.1)";
		unblur();
		showMenu = true;
	}
}

//Unblur the container
function unblur() {
	if (blur) {
		container.forEach(function (element) {
			element.style.filter = "blur(5px)";
		});
		blur = false;
	} else {
		container.forEach(function (element) {
			element.style.filter = "none";
		});
		blur = true;
	}
}

//Display Winner Modal in case of win or draw
function displayWinner(winner) {
	pop_up.style.visibility = "visible";
	pop_up.style.top = "50%";
	pop_up.style.transform = "translate(-50%, -50%) scale(1)";
	unblur();
	free_spaces = 9;
	if (isDraw) {
		document.getElementById("winners-trophy").src = "./images/handshake.png";
		winner_msg.textContent = "Draw!!";
		info_box.textContent = winner_msg.textContent;
	} else {
		document.getElementById("winners-trophy").src = "./images/cup.png";
		winner_msg.textContent = `Player ${winner} wins!!`;
		info_box.textContent = winner_msg.textContent;
	}
}

//Check for a winner
function checkWinner() {
	for (let i = 0; i < winning_combinations.length; i++) {
		const [a, b, c] = winning_combinations[i];
		if (
			boxes[a].textContent &&
			boxes[a].textContent === boxes[b].textContent &&
			boxes[b].textContent === boxes[c].textContent
		) {
			isDraw = false;
			displayWinner(boxes[a].textContent);
			//Update score
			if (boxes[a].textContent == "X") {
				x_score += 1;
				scoreX.textContent = x_score;
			} else {
				o_score += 1;
				scoreO.textContent = o_score;
			}
		} else if (free_spaces == 0){ displayWinner("Draws")
            setTimeout(() => {
                singleplayer();
            }, 3000);
        }
	}
}
