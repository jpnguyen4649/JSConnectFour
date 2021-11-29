var playerColor = "background-color: red";
var cpuColor = "background-color:blue";
var taken = 0;
var winner = false;
var winnerColor = "";
var forbidden = [4, 5, 6, 11, 12, 13, 18, 19, 20, 25, 26, 27, 32, 33, 34, 39, 40, 41];
var forbidden2 = [0, 1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29, 30, 35, 36, 37];

function getId(event){
	if(winner == false){
	    let id = event.target.attributes['id'].value;
		let cell = document.getElementById(id);
		let check = taken;
		validateCell(cell);
		checkWin();
		if(check<taken && winner == false){
			cpuTurn();
		}
		checkWin();
		if(winner==true){
			if(winnerColor.includes("red")){
				alert("You won!");
			}else{
				alert("The computer won!");
			}
		}
	}else if(taken==41){
		alert("It's a draw!");
	}
}

function validateCell(cell){
	let numCell = (cell.getAttribute("id"));
	let temp = parseInt(numCell);
	if(cell.getAttribute("valid")=="true" && cell.getAttribute("taken")!="true"){
		cell.setAttribute("style", playerColor);
		cell.setAttribute("taken", true);
		cell.setAttribute("valid", false);
		taken++;
		if(temp>6){
			temp-=7;
			document.getElementById(temp.toString()).setAttribute("valid", true);
		}
	}else{
		alert("You cannot place a checker here!");
	}
}

function cpuTurn(){
	let found = false;
	while(found==false){
  	let place = Math.floor(Math.random()*(42));
	  let cell = document.getElementById(place.toString());
	  let temp = parseInt(cell.getAttribute("id"));
		if(cell.getAttribute("valid")=="true" && cell.getAttribute("taken")!="true"){
			cell.setAttribute("style", cpuColor);
			cell.setAttribute("taken", true);
			cell.setAttribute("valid", false);
			if(temp>6){
				temp-=7;
				document.getElementById(temp.toString()).setAttribute("valid", true);
			}
			found=true;
		}
	}
	taken++;
}

function checkWin(){
	let finished = 0;
	let cells = document.getElementsByClassName("circle");
	while(finished<4){
		for(let i = 0; i<cells.length-3; i++){
			if(cells[i].getAttribute("style")==cells[i+1].getAttribute("style") && cells[i+1].getAttribute("style")==cells[i+2].getAttribute("style") && cells[i+2].getAttribute("style")==cells[i+3].getAttribute("style") && cells[i].getAttribute("style")!=null && forbidden.includes(i)==false){
				winner = true;
				winnerColor = cells[i].getAttribute("style");				
				finished = 4;
			}else{
				finished++;
			}
		}
		for(let j = 0; j<cells.length-21; j++){
			if(cells[j].getAttribute("style")==cells[j+7].getAttribute("style") && cells[j+7].getAttribute("style")==cells[j+14].getAttribute("style") && cells[j+14].getAttribute("style")==cells[j+21].getAttribute("style") && cells[j].getAttribute("style")!=null){
				winner = true;
				winnerColor = cells[j].getAttribute("style");
				finished = 4;
			}else{
				finished++;
			}
		}
		for(let k = 0; k<cells.length-24; k++){
			if(cells[k].getAttribute("style")==cells[k+8].getAttribute("style") && cells[k+8].getAttribute("style")==cells[k+16].getAttribute("style") && cells[k+16].getAttribute("style")==cells[k+24].getAttribute("style") && cells[k].getAttribute("style")!=null && forbidden.includes(k)==false){
				winner = true;
				winnerColor = cells[k].getAttribute("style");
				finished = 4;
			}else{
				finished++;
			}
		}
		for(let l = 18; l<cells.length; l++){
			if(cells[l].getAttribute("style")==cells[l-6].getAttribute("style") && cells[l-6].getAttribute("style")==cells[l-12].getAttribute("style") && cells[l-12].getAttribute("style")==cells[l-18].getAttribute("style") && cells[l].getAttribute("style")!=null && forbidden2.includes(l)==false && forbidden.includes(l)==false){
				winner = true;
				winnerColor = cells[l].getAttribute("style");
				finished = 4;
			}else{
				finished++;
			}
		}
	}
}

var board = document.getElementsByClassName("circle");
for (let i = 0; i < board.length; i++) {
	board[i].setAttribute("id", i);
	board[i].addEventListener('click', getId);
	if(i>=35 && i<=41){
		board[i].setAttribute("valid", true);
	}else{
		board[i].setAttribute("valid", false);
		board[i].setAttribute("taken", false);
	}
}
