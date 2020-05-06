var Trex = {
	gravity: null,
	animation: null, // trex animation id
	is_squat: null, // squat
	movingup: 0, // jump

	div: document.createElement("div"),
	addTrex2game: function(parentNode) { // create trex
		var t = this;
		var tstyle = this.div.style;
		tstyle.width = "55px";
		tstyle.height = "43px";
		tstyle.backgroundImage = "url(img/trex0.png)";
		tstyle.backgroundRepeat = "no-repeat";
		tstyle.position = "absolute";
		tstyle.left = "80px";
		tstyle.top = "380px";
		tstyle.zIndex = "1";
		t.div.setAttribute("id", "runner");
		parentNode.appendChild(t.div);
	},
	
	a: 0, // acceleration
	accelerate: function() { //falling function
		Trex.gravity = setInterval(movement, 40);
		function movement() {
			if (Trex.div.offsetTop != 380 && Trex.is_squat == 0) { // fly
				if (Trex.div.offsetTop + Trex.a >= 380) { // just landing
					Trex.div.style.top = 380 +"px";
					Trex.movingup = 0;
					Trex.a = 0;
					//console.log("On ground");
				}else if (Trex.div.offsetTop < 220) { // fly and squat
					Trex.div.style.top = 220 +"px";
					Trex.a = 0;
					//console.log("Squat fall");
				}else { // falling
					Trex.div.style.top = Trex.div.offsetTop + Trex.a++ + "px"; // dist to top of the view + falling px
					//console.log("Fall");
				}
			}
			else if (Trex.div.offsetTop == 380 && Trex.is_squat == 0) { // on ground
				if (Trex.a < 0){
					Trex.div.style.top = Trex.div.offsetTop + Trex.a++ + "px";
					Trex.movingup = 1;
					//console.log("Jump, trex.a is: "+Trex.a);
				}
			}
			
		}
	},
	
	is_squat: 0,
	animate: function() { // trex animation
		var run_img = ["url(img/run_trex0.png)", "url(img/run_trex1.png)", "url(img/run_trex2.png)", "url(img/run_trex3.png)"];
		var squat_img = ["url(img/squat_trex0.png)", "url(img/squat_trex1.png)"];
		var run_i = 0, squat_j = 0;
		Trex.animation = setInterval(change_img, 120);
		function change_img(){
			if (!Trex.is_squat) { // stand
				Trex.div.style.backgroundImage = run_img[run_i++];
				if (run_i == 4) { run_i = 0; }
			}else {  // squat
				Trex.div.style.backgroundImage = squat_img[squat_j++];
				if (squat_j == 2) { squat_j = 0; }
			}
    		if (is_gameover) {
    			clearInterval(Trex.animation);
    			clearInterval(Trex.gravity);
    		}
		}
	},

	movingup: 0,
	addKeyListener: function() { // key down: space, down arrow
		document.onkeydown = function (e) {
			e = e || event;
        	var currKey = e.keyCode || e.which || e.charCode;
        	if ((!is_gameover) && (!Trex.movingup)) {
        		switch (currKey) {
        			case 32:
        				e.preventDefault();
        				if (!Trex.is_squat) {
        					Trex.a = -18;
        					//console.log("up and down");
        					//console.log("Trex to top = "+Trex.div.style.top);
        				}
        				break;
        			case 40:
        				e.preventDefault();
        				Trex.is_squat = 1;
	        			Trex.div.style.height = "32px";
	        			if (Trex.div.offsetTop == 380) {
							Trex.div.style.top = Trex.div.offsetTop + 11 +"px";
	        			}
	        			//console.log("squat");
        				//console.log("Trex to top = "+Trex.div.style.top);
        				break;
        		}
        	}
        	
        };
        document.onkeyup = function(e) {
        	e = e || event;
        	var currKey = e.keyCode || e.which || e.charCode;
        	if (!is_gameover) {
        		if ((currKey == 40) && (!Trex.movingup)) {
	        		Trex.is_squat = 0;
	                Trex.div.style.height = "43px";
	                Trex.div.style.top = Trex.div.offsetTop - 11 +"px";
	                //console.log("Stand = "+Trex.is_squat);
	        	}
	        	if ((currKey == 32) && (Trex.is_squat)) {
	        		Trex.is_squat = 0;
	        		Trex.div.style.height = "43px";
	                Trex.div.style.top = Trex.div.offsetTop - 11 +"px";
	        	}
        	}
        	
        };
	},
};