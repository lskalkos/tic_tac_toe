
//Tic_Tac_Toe serves as a namespace(?) 
var Tic_Tac_Toe = {

	/*******************|
	|**COMPUTER OBJECT**|
	|*******************/

	Computer: function(opponent) {

		this.opponent = opponent;
		this.name = 'Computer';
		this.turn = false;
		this.piece = '';
		this.move = function(boxes, scores) {

			if(this.opponent.piece === "X") {
				this.piece = "O";
			} else if (this.opponent.piece === "O") {
				this.piece = "X";
			} else {
				this.piece = "X";
			};

			var random_box = Math.floor(boxes.length * Math.random());
			var move = boxes[random_box];
			move.toString();

			var index = boxes.indexOf(move);
			if (index > -1) {
			    boxes.splice(index, 1);
			};

			scores[move] = this.piece;

			var elem = $("#" + move);
			elem.val(this.piece).attr('disabled','');

		};

	},//Computer

	/***************|
	|**GAME OBJECT**|
	|***************/

	Game: function() {

		//Set global game data
		var $input = $('input'); //Collect all the DOM box inputs

		var boxes = []; //Array holding all currently available boxes
		$input.map(function() {
			boxes.push(this.id);
		});

		console.log(boxes);
		var pieces = ['x','o', 'X', 'O']; //Define board pieces
		var turns = 0; //Set number of turns taken
		var scores = {}; //Create key-value pair object to hold each box's value, X or O
		var game_set = false; //Game starts with no one having won yet
		var next_player = null; //Initialize a next player variable 		
		var players = []; //Array to hold all players
		var entry = null; //Initialize a box entry variable
		var player1 = null; //Initialize player 1
		var player2 = null; //Initialize player 2

		//Function to check if a player has won
		function checkWins(player) {

			var scores_array = Object.keys(scores); //Count the number of scores logged

			//Defines what counts as a win with conditional statements and booleans
			var diagnol_win1 = scores[boxes[5]] == scores[boxes[9]] && scores[boxes[5]]==scores[boxes[1]] && scores[boxes[5]] != undefined || false || null;
			var diagnol_win2 = scores[boxes[5]] == scores[boxes[3]] && scores[boxes[5]]==scores[boxes[7]] && scores[boxes[5]] != undefined || false || null;
			var horizontal_win1 = scores[boxes[1]] == scores[boxes[3]] && scores[boxes[1]]==scores[boxes[2]] && scores[boxes[1]] != undefined || false || null;				
			var horizontal_win2 = scores[boxes[4]] == scores[boxes[6]] && scores[boxes[4]]==scores[boxes[5]] && scores[boxes[4]] != undefined || false || null;	
			var horizontal_win3 = scores[boxes[7]] == scores[boxes[9]] && scores[boxes[7]]==scores[boxes[8]] && scores[boxes[7]] != undefined || false || null;	
			var vertical_win1 = scores[boxes[1]] == scores[boxes[7]] && scores[boxes[1]]==scores[boxes[4]] && scores[boxes[1]] != undefined || false || null;	
			var vertical_win2 = scores[boxes[2]] == scores[boxes[8]] && scores[boxes[2]]==scores[boxes[5]] && scores[boxes[2]] != undefined || false || null;	
			var vertical_win3 = scores[boxes[3]] == scores[boxes[9]] && scores[boxes[3]]==scores[boxes[6]] && scores[boxes[3]] != undefined || false || null;	

			//Detect a win
			if (diagnol_win1 || diagnol_win2 || horizontal_win1 || horizontal_win2 || horizontal_win3 || vertical_win1 || vertical_win2 || vertical_win3) {
				alert(player.name + " Won! Game over.");
				$input.val('').attr('disabled', '');
				game_set = true;
				location.reload(true);
				return false;
			}

			//Detect a tie
			if(scores_array.length === 9) {
				alert("It's a tie!")
				$input.val('').attr('disabled', '');
				game_set = true;
				location.reload(true);	
				return false; 			
			}

			return false;


		};//checkWins

		//Function to check that a player is using the right piece
		function checkPlayerPiece() {

			if(turns === 0) {
				if(jQuery.inArray(entry, pieces) === -1) {
					alert("Please use an 'X' or an 'O' as your piece!");
					return false;
				};				
			};

			if (turns > 0) {
				if(player1.turn == true && entry == player2.piece || player1.turn == true && jQuery.inArray(entry, pieces) === -1) {
					if(player2.piece == 'X') {
						alert("You must use an O.");
						return false;
					} else {
						alert("You must use an X.");
						return false;
					};
				} else if (player2.turn == true && entry == player1.piece || player2.turn == true && jQuery.inArray(entry, pieces) === -1) {
					if(player1.piece == 'X') {
						alert("You must use an O.");
						return false;
					} else {
						alert("You must use an X.");
						return false;
					};				
				};
			};

			return true;

		};//checkPlayerPiece

		//Function to execute a human player move
		function humanMove(computer_opponent_true, player1, player2) {

			$input.keyup(function(e) {

				if(e.keyCode == 13) {
					entry = $(this).val().toUpperCase();

					if(player1.turn == true) {
						player1.piece = entry;
					} else if(!computer_opponent_true && player2.turn == true) {
						player2.piece = entry;
					};

					if(!checkPlayerPiece()) {
						return false;
					} else {

						console.log(scores);
						if(player1.turn == true) {
							player1.piece = entry;
						} else if(!computer_opponent_true && player2.turn == true) {
							player2.piece = entry;
						};
 
						turns = 1 + turns;

						var box = $(this).attr('id');

						scores[box] = entry;

						if(computer_opponent_true) {
							var index = boxes.indexOf(box);
							if (index > -1) {
							    boxes.splice(index, 1);
							};							
						};

						if(turns >= 5) {
							checkWins(next_player);
						};

						if(!game_set) {

							$(this).attr('disabled', '');

							
							if(player1.turn === true) {
								player1.turn = false; 
								player2.turn = true;
								next_player = player2;
								alert("Now it's " + next_player.name + "'s turn! " );
								
								if(computer_opponent_true) {
									player2.move(boxes, scores);
									turns = turns + 1;
									if(turns >= 5) {
										checkWins(next_player);
									};
									if(!game_set) {
										player1.turn = true; 
										player2.turn = false;
										next_player = player1;
										alert("Now it's " + player1.name + "'s turn! ");										
									};
								};
							} else {
								player1.turn = true;
								player2.turn = false;
								next_player = player1;
								alert("Now it's " + next_player.name + "'s turn! " );
							};															
							
						} else {
							return false;
						};

					};

				};
			})//keyup
		};//humanMove

		//Method to set up a human-human game
		this.playComputer = function() {

			player1 = new Tic_Tac_Toe.Player();
			player2 = new Tic_Tac_Toe.Player();
			players = [player1, player2];

			player1.name = prompt("Hello there. Please enter the first player's name:");
			player2.name = prompt("Great. Please enter the second player's name:");

			player1.turn = true;
			next_player = player1;

			humanMove(false, player1, player2);

		}, //playComputer

		//Method to set up a computer-human game
		this.playHuman = function() {

			player1 = new Tic_Tac_Toe.Player();
			player1.name = prompt("Hello there. Please enter your name:");
			
			player2 = new Tic_Tac_Toe.Computer(player1);
			players = [player1, player2];
			var first_player = confirm("Computer go first?");

			if(first_player === true) {
				next_player = player2;
				player2.move(boxes, scores);
				turns = turns + 1;
			}; 

			player1.turn = true;
			player2.turn = false;
			next_player = player1;	

			humanMove(true, player1, player2);	

		}//playHuman


	},//Game

	/*****************|
	|**PLAYER OBJECT**|
	|*****************/

	Player: function() {
		this.name = '';
		this.turn = false;
		this.piece = ''		
	}//Player

};//Tic_Tac_Toe



//When the DOM is ready load game functions
$(document).ready(function() {

	var $input = $('input');

	$input.attr('disabled','');

	$('#computer').click(function() {
		var game = new Tic_Tac_Toe.Game();
		game.playHuman();
		$input.removeAttr('disabled');		
	});

	$('#person').click(function() {
		var game = new Tic_Tac_Toe.Game();
		game.playComputer();
		$input.removeAttr('disabled');		
	});	

});



