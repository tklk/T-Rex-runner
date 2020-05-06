function Bar() {
	this.up_Rex = null; // upper rex
	this.down_Bar = null;  // bottom pipe
	var down_Height = getRandomInt(0, 40); // height of bottom pipe
	var up_Height = getRandomInt(305, 334); // height of upper rex
	var bar_prob = getRandomInt(1, 11); // prob
	var bartype = 0;
	if (bar_prob >= 7) { bartype = 1; }

	this.createDiv = function(url, height, positionType, left, top) { // Create bar
		var newDiv = document.createElement("div");
		newDiv.style.width = "62px";
		newDiv.style.height = height;
		newDiv.style.position = positionType;
		newDiv.style.left = left;
		newDiv.style.top = top;
		newDiv.style.backgroundImage = url;
		return newDiv;
	};
	
	this.drawBar = function() { // draw bar in node tree
		if (bartype) { // rex
			this.up_Rex = this.createDiv("url(img/fly1.png)", "59px", "absolute", "600px", up_Height + "px");		
			this.down_Bar = this.createDiv(null, null, "absolute", "600px", 423 + down_Height + "px");
		}else { // pipe
			this.up_Rex = this.createDiv(null, null, "59px", "absolute", "600px", "59px");
			var down_Img1 = this.createDiv("url(img/down_bar0.png)", "60px");
			var down_Img2 = this.createDiv("url(img/down_bar1.png)", down_Height +"px");
			this.down_Bar = this.createDiv(null, null, "absolute", "600px", 363 - down_Height + "px");
			this.down_Bar.appendChild(down_Img1); // pipe head
			this.down_Bar.appendChild(down_Img2); // pipe body
		}
		BKGD.appendChild(this.up_Rex);
		BKGD.appendChild(this.down_Bar);
		// console.log("bartype: "+bartype);
	};

	this.moveBar = function() { //bar animation
		this.up_Rex.style.left = this.up_Rex.offsetLeft - 5 + "px";
		this.down_Bar.style.left = this.down_Bar.offsetLeft - 5 + "px";
	};	

	this.rexWave = function() { // rex animation
		var uprex_Img = ["url(img/fly1.png)", "url(img/fly2.png)"];
		var fly_i = 0;
		var temp = setInterval(wave, 500);
		//console.log("timer ID: " + temp);
		var longv = this.up_Rex.style;
		upRex_Timer.push(temp); // rex queue
		function wave() {
			longv.backgroundImage = uprex_Img[fly_i++];
			if (fly_i == 2) { fly_i = 0; }
			if(is_gameover){ // clear queue
				deleteUprex();
				console.log("clear");
			}
		}
	};
}