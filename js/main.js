var BKGD = document.getElementById("BG");
var start_Btn = document.getElementById("start_Btn");
var showGameover = document.getElementById("GameoverDiv");
var ok_Btn = document.getElementById("ok_Btn");
var showScore = document.getElementById("score_panel");
var score_1 = document.getElementById("score_1");
var score_2 = document.getElementById("score_2");
var score_3 = document.getElementById("score_3");
var best_1 = document.getElementById("best_1");
var best_2 = document.getElementById("best_2");
var best_3 = document.getElementById("best_3");
var medal = document.getElementById("medal");
var bar_Queue = [];
var upRex_Timer = []; // upper rex queue
var is_gameover = 0, gold = 0, silver = 0, bronze = 0, currentScore = 0;
var main_Timer, bar_Dist;

start_Btn.onclick = function() { // start event
    index_Word.style.display = "none";
    clearInterval(index_shake_Timer); //
    start_Btn.style.display = "none"; 
    Trex.addTrex2game(BKGD);
    Trex.accelerate(); 
    Trex.animate(); 
    Trex.addKeyListener();
    main_Timer = setInterval(main, 30); // bar timer
    is_gameover = 0;
    currentScore = 0;
    bar_Dist = newBar2Q();
    score_1.style.display = "block";
    console.log("gold : "+gold);
    console.log("silver : "+silver);
    console.log("bronze : "+bronze);
}

function main() {
    if (bar_Queue.length) { // bar exist
		for (var i = 0; i < bar_Queue.length; i++) {
			bar_Queue[i].moveBar(); // bar animation
			var collision = CollisionCheck(bar_Queue[i].down_Bar, Trex.div) + CollisionCheck(bar_Queue[i].up_Rex, Trex.div); //撞到
			if (collision) { // stop game and clear timer
				window.clearInterval(main_Timer);
				window.clearInterval(Landrun);
				Trex.a = 0;
				Trex.movingup = 0;
				Trex.is_squat = 0;
				is_gameover = 1;
				if (currentScore >= gold) {
					bronze = silver;
					silver = gold;
					gold = currentScore;
					DisplayMedal(1); 
				}else if (currentScore >= silver) {
					bronze = silver;
					silver = currentScore;
					DisplayMedal(2);
				}else if (currentScore >= bronze) {
					DisplayMedal(3);
					bronze = currentScore;
				}
				DisplayBest(gold);
				showScore.style.left = "391px"; 
				showScore.style.top = "190px";
				showGameover.style.display = "block";
			}
		}
		if (bar_Queue[bar_Queue.length - 1].down_Bar.offsetLeft < (450 - bar_Dist)) { // passing bar
			bar_Dist = newBar2Q();
		}
		if (bar_Queue[0].down_Bar.offsetLeft == 20) { // add score, if dist > 20px
			currentScore++;
			DisplayScore(currentScore);
			console.log(currentScore);
		}          
		if (bar_Queue[0].down_Bar.offsetLeft < -52) { // delete bar in node tree when the bar has gone
			deleteBar();
			deleteUprex();
		}
	}
}

ok_Btn.onclick = function() { // ok event
    showGameover.style.display = "none";
    showScore.style.left = "130px"; 
    showScore.style.top = "50px";
    HideScore(currentScore);
    clearBar();
    var runner = document.getElementById("runner");
    BKGD.removeChild(runner);
    index_Word.style.display = "block";
    index_shake_Timer = setInterval(index_shake,200);
    start_Btn.style.display = "block";
    Landrun = setInterval(Land_animate, 30);
}