function newBar2Q() { // bar queue
    bar_distance = getRandomInt(50, 350);
    var newBar = new Bar();
    newBar.drawBar();
    bar_Queue.push(newBar);
    newBar.rexWave();
    return bar_distance;
}

function getRandomInt(min, max) { // random generate
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function CollisionCheck(bar, trex) {
	var bar_Left = bar.offsetLeft;
	var bar_Width = bar.offsetLeft + bar.offsetWidth;
	var bar_Top = bar.offsetTop;
	var bar_Height = bar.offsetTop + bar.offsetHeight;
	var trex_Left = trex.offsetLeft;
	var trex_Width = trex.offsetLeft + trex.offsetWidth;
	var trex_Top = trex.offsetTop;
	var trex_Height = trex.offsetTop + trex.offsetHeight;
	if (!((bar_Left > trex_Width - 19) || (bar_Width < trex_Left) || (bar_Top > trex_Height) || (bar_Height < trex_Top + 2))) {
		return true;
	}
	return false;
}

function DisplayScore(score) {
	if (score < 10) {
    	score_1.style.backgroundImage = "url(img/" + score + ".jpg)";
    } else if (score < 100) {
    	score_2.style.display = "block";
    	score_1.style.backgroundImage = "url(img/" + parseInt(score/10) + ".jpg)";
    	score_2.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
    } else if (score < 1000) {
    	score_3.style.display = "block";
    	score_1.style.backgroundImage = "url(img/" + parseInt(score/100) + ".jpg)";
    	score_2.style.backgroundImage = "url(img/" + parseInt(score/10)%10 + ".jpg)";
    	score_3.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
    }
}

function DisplayBest(score) {
	if (score < 10) {
		best_1.style.display = "block";
    	best_1.style.backgroundImage = "url(img/" + score + ".jpg)";
    } else if (score < 100) {
    	best_1.style.display = "block";
    	best_2.style.display = "block";
    	best_1.style.backgroundImage = "url(img/" + parseInt(score/10) + ".jpg)";
    	best_2.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
    } else if (score < 1000) {
    	best_1.style.display = "block";
    	best_2.style.display = "block";
    	best_3.style.display = "block";
    	best_1.style.backgroundImage = "url(img/" + parseInt(score/100) + ".jpg)";
    	best_2.style.backgroundImage = "url(img/" + parseInt(score/10)%10 + ".jpg)";
    	best_3.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
    }
}

function DisplayMedal(rank) {
	medal.style.display = "block";
	if (rank == 1) {
		medal.style.backgroundImage = "url(img/gold.png)";
	}else if (rank == 2) {
		medal.style.backgroundImage = "url(img/silver.png)";
	}else if (rank == 3) {
		medal.style.backgroundImage = "url(img/bronze.png)";
	}
}

function HideScore(score) {
	medal.style.display = "none";
    best_1.style.display = "none";
    score_1.style.display = "none";
    score_1.style.backgroundImage = "url(img/" + 0 + ".jpg)";
	if (score >= 10 && score < 100) {
    	best_2.style.display = "none";
    	score_2.style.display = "none";
    } else if (score < 1000) {
    	best_2.style.display = "none";
    	best_3.style.display = "none";
    	score_2.style.display = "none";
    	score_3.style.display = "none";
    }
}

function deleteBar() {
	BKGD.removeChild(bar_Queue[0].down_Bar);
    BKGD.removeChild(bar_Queue[0].up_Rex);
    bar_Queue.shift(bar_Queue[0]);
	console.log("clear bar");
}

function clearBar() {
	while (bar_Queue[0]) {
		deleteBar();
	}
}

function deleteUprex() {
	clearInterval(upRex_Timer[0]);
	upRex_Timer.shift(upRex_Timer[0]);
}

function clearUprex() {
	while (upRex_Timer[0]) {
		deleteUprex();
	}
}