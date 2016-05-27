var Resume = (function() {
	var instance = null;
	var isLetter = function(c) {
		if ("'" == c) return false
		if (c.search(/[A-Za-z/d]+/) != -1) {
			return true;
		} else if (c.search(/[(){}\[\]., ]+/) == -1 && c.search(/=/) == -1) {
			return true;
		} else {
			return false;
		}
	}

	var isBound = function(c) {
		if (c.search(/[(){}\[\]., ]+/) != -1) {
			return true;
		} else
			return false;
	}
	var isOP = function(c) {
		if (c.search(/[+=]+/) != -1) {
			return true;
		} else
			return false;
	}
	var CVservice = function(ctx, options) {
		for (prop in options) {
			this[prop] = options[prop];
		}
		this.ctx = ctx;
		this.canvasWidth = ctx.canvas.offsetWidth;
		this.canvasHeight = ctx.canvas.offsetHeight;
	}
	CVservice.prototype.load = function() {
		var time = 50
		var loadAnimation = function() {
			if (time < 120) {
				time = time + 10;
				var ctx = this.ctx;
				//	console.log(time)
				ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				ctx.fillStyle = "#3c3c3c";
				ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
				ctx.fill();
				ctx.fillStyle = "white";
				ctx.font = "20px Arial";
				var txt = "Load";
				if (time <= 20 || (time > 60 && time <= 80)) {
					txt = "Load" + ". ";
				} else if (time <= 40 || (time > 60 && time <= 100)) {
					txt = "Load" + ". . ";
				} else {
					txt = "Load" + ". . . ";
				}
				ctx.fillText(txt, 50, 50);
				setTimeout(loadAnimation, 230)
			} else {
				this.display();
			}
		}.bind(this)
		setTimeout(function() {
			loadAnimation();
		}, 0)
	}
	CVservice.prototype.display = function() {
		var time = 50
		var txt = "";
		var cursorAnimation = function() {
			if (time < 100) {
				time = time + 10;
				var ctx = this.ctx;
				ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				ctx.fillStyle = "#3c3c3c";
				ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
				ctx.fill();
				ctx.fillStyle = "white";
				ctx.font = "20px Arial";
				if ("|" == txt) {
					txt = "";
				} else if ("" == txt || !txt) {
					txt = "|"
				}
				ctx.fillText(txt, 50, 50);
				setTimeout(cursorAnimation, 200)
			} else {
				this.draw();
			}
		}.bind(this)
		setTimeout(function() {
			cursorAnimation();
		}, 0)
	}
	CVservice.prototype.render = function() {
		var ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.fillStyle = "#3c3c3c";
		ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.fill();
		this.load(this.draw);
	};
	CVservice.prototype.DFA = function(input) {
		var output = [];
		var buffer = "";
		for (var i = 0; i < input.length; i++) {
			var str = input[i];
			var p = 0;
			//	console.log(str)
			while (p < str.length) {
				var c = str[p];
				if (isLetter(c)) {
					buffer += str[p];
					p++;
				} else if (isBound(c)) {
					output.push(buffer);
					output.push(c);
					buffer = "";
					p++;
				} else if (isOP(c)) {
					p++;
					output.push(buffer);
					output.push(c);
					buffer = ""
				} else if ("'" == c) {
					p++;
					while (str[p] != "'" && p < str.length) {
						buffer += str[p];
						p++;
					}
					p++;
					output.push("'" + buffer + "'");
					buffer = ""
				}
			}
			if (str.length > 0)
				output.push("@");
		}
		console.log(output)
		return output;
	}
	CVservice.prototype.draw = function() {
		var txt = [];
		var ctx = this.ctx;
		ctx.font = "14px Arial";
		txt[0] = "var "+this.Introduction.Name+"=new FE()";
		txt[1] = "function FE(){"
		for (var prop in this.Introduction) {
			txt.push("        this." + prop + "='" + this.Introduction[prop] + "'")
		}
		txt.push("}");
		txt.push("");
		txt.push("FE.prototype.What_Projects_I_Do=function{")
		for (var i = 0; i < this.Projects.length; i++) {
			txt.push("        this.projects['" + this.Projects[i].Name + "']=");
			for(var j=0;j<this.Projects[i].Do.length;j++){
				txt.push("           '" + this.Projects[i].Do[j] + "'");
			}
			
		}
		txt.push("}");
		txt.push("");
		txt.push("FE.prototype.What_Experience_I_Have=function{")
		for (var i = 0; i < this.Experience.length; i++) {
			txt.push("        this.experiences['" + this.Experience[i].Name + "']=");
			for(var j=0;j<this.Experience[i].Do.length;j++){
				txt.push("           '" + this.Experience[i].Do[j] + "'");
			}
		}
		txt.push("}")
		var parser = this.DFA(txt);
		
		var i = 0;
		var cur = 0;
		var row = 0;
		var left = 0;
		var animation = function(pos) {
			if (i < parser.length) {
				if (cur < parser[i].length) {
					var tmp = parser[i].substr(0, cur + 1)
					if ("@" == tmp) {
						row += 1;
						cur = 0;
						left = 0;
						pos = 50;
						i++;
					} else {
						ctx.fillStyle = "#3c3c3c";
						ctx.fillRect(pos, 35 + row * 20, this.canvasWidth, 20);
						if ("var" == tmp || "function" == tmp) {
							ctx.fillStyle = "#66b3ff";
						} else if ("FE" == tmp || "What_Experience_I_Have" == tmp || "What_Projects_I_Do" == tmp) {
							ctx.fillStyle = "#53ff53";
						} else if ("=" == tmp || "new" == tmp||"+"==tmp) {
							ctx.fillStyle = "#d9006c"
						} else {
							ctx.fillStyle = "white";
							for (var k = 0; k < this.Projects.length; k++) {
								if (tmp == "'" + this.Projects[k].Name + "'") {
									ctx.fillStyle = "#ffd306";
								}
								for(var j=0;j<this.Projects[k].Do.length;j++){
									if (tmp == "'" + this.Projects[k].Do[j] + "'")
									 {
									 	ctx.fillStyle = "#ffd306";
									 }
								}
							}
							for (var k = 0; k < this.Experience.length; k++) {
								if (tmp == "'" + this.Experience[k].Name + "'"||tmp == "'" + this.Experience[k].Do + "'") {
									ctx.fillStyle = "#ffd306";
								}
								for(var j=0;j<this.Experience[k].Do.length;j++){
									if (tmp == "'" + this.Experience[k].Do[j] + "'")
									 {
									 	ctx.fillStyle = "#ffd306";
									 }
								}
							}

							if (tmp == "'" + this.Introduction.Name + "'"||tmp == "'" + this.Introduction.School + "'"||tmp == "'" + this.Introduction.Major + "'") {
								ctx.fillStyle = "#ffd306";
							}

						}

						ctx.fillText(tmp, pos, 50 + row * 20);
						cur++;
						if (tmp==parser[i]) 
							left+=ctx.measureText(tmp).width;
					}
					//console.log(pos)
					setTimeout(function() {
						animation(pos);
					}, 5)
				} else {
					i++;
					cur = 0;
					//	console.log("next")
					setTimeout(function() {
						pos = left+50 ;
						animation(pos);
					}, 5)
				}
			}
		}.bind(this)
		animation(50);

	}
	var config = function(ctx, options) {
		instance = new CVservice(ctx, options);
		instance.render();
	}
	return {
		render: config
	}
})()
