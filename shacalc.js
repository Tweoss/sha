const memory = new WebAssembly.Memory({
	initial: 2,
	maximum: 2
});
function consoleLogOne(log) {
	console.log(log);
}
const imports = {
	module: {},
	env: {
		memory: memory,
		log: consoleLogOne
	}
};
WebAssembly.instantiateStreaming(fetch('shacalc.wasm'), imports)
	.then(results => {
		var arrayview = new Uint8Array(imports.env.memory.buffer);
		let h;
		function input(e) {
			let p = this.selectionStart; this.value = this.value.toUpperCase(); this.setSelectionRange(p, p);
			textcontent = this.value;
			var utf8 = unescape(encodeURIComponent(textcontent));
			utf8 += String.fromCharCode(0x80);
			for (var i = 0; i < utf8.length; i++) {
				arrayview[i] = (utf8.charCodeAt(i));
			}
			let l = utf8.length - 1;
			for (var j = 0; j < 512 / 8 - (utf8.length + 64 / 8) % (512 / 8); j++) {
				arrayview[utf8.length + j] = 0;
			}
			arrayview[i + j + 0] = 0;
			arrayview[i + j + 1] = 0;
			arrayview[i + j + 2] = 0;
			arrayview[i + j + 3] = 0;
			arrayview[i + j + 4] = ((l * 8) & 0x00FF0000) >> 24;
			arrayview[i + j + 5] = ((l * 8) & 0x00FF0000) >> 16;
			arrayview[i + j + 6] = ((l * 8) & 0x0000FF00) >> 8;
			arrayview[i + j + 7] = ((l * 8) & 0x000000FF);
			results.instance.exports.sha(((i + j + 8) + 1) * 8 / 512);
			let string = "";
			for (var i = 0; i < 32; i += 4) {
				string = string + (arrayview[8704 + i + 3]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704 + i + 2]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704 + i + 1]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704 + i]).toString(16).padStart(2, "0");
			}
			// console.log(string);

			let chances = 0;
			for (var i = 0; i < 32; i+= 4) {
				chances*=Math.pow(2,8); chances+=arrayview[8704 +i + 3];
				chances*=Math.pow(2,8); chances+=arrayview[8704 +i + 2];
				chances*=Math.pow(2,8); chances+=arrayview[8704 +i + 1];
				chances*=Math.pow(2,8); chances+=arrayview[8704 +i + 0];
			}
			chances/=Math.pow(2,256); chances*=10000; chances = Math.floor(chances); chances/=100; chances = chances.toFixed(2);
			chances = "00" + chances; chances = chances.substring(chances.length-5,7);
			document.getElementById("hash").innerText = string;
			document.getElementById('celebrate').disabled = true;
			document.getElementById('chance').innerText = "Your class is " + chances + "% likely to be today.";
			// document.getElementById('chance').innerText = "Your birthday is " + chances + "% likely to be today.";
			//* if (string == "9109e41ae83377b1c7c53ad1e002a319adeddf75bf19e324f880ac53bdebc932")	{		
				document.getElementById('celebrate').disabled = false;
				document.getElementById('chance').innerText = "Your class is 100.00% likely to be today.";
				// document.getElementById('chance').innerText = "Your birthday is 100.00% likely to be today.";
			//* }
		}
		document.getElementById("name").addEventListener('input', input);
		document.getElementById("name").addEventListener('keyup', function (event) {
			// Number 13 is the "Enter" key on the keyboard
			if (event.key === "Enter") {
				// Cancel the default action, if needed
				event.preventDefault();
				// Trigger the button element with a click
				document.getElementById("celebrate").click();
			  }
		}
		);
	}
	);
let h = 0.321031;
class Balloon {
	constructor() {
		var canvas = document.getElementById("drawingcanvas");
		this.x = Math.random()*canvas.width;
		this.y = canvas.height;
		h += golden_ratio_conjugate; h %= 1;
		this.color = hsv_to_rgb(h, 0.5, 0.95);
		this.size = Math.random()*2+1;
		this.direction = Math.random()*2-1;
		this.upspeed = Math.random()*2+5;
	}
	move() {
		var canvas = document.getElementById("drawingcanvas");
		this.x += this.direction;
		this.direction += Math.random()-0.5;
		this.x %= canvas.width;
		this.y -= this.upspeed;
	}
}

const golden_ratio_conjugate = 0.618033988749895;
function gen_html() {
  h += golden_ratio_conjugate
  h %= 1
  hsv_to_rgb(h, 0.5, 0.95)
}
function hsv_to_rgb(h, s, v) {
	let h_i = Math.floor((h*6));
	let f = h*6 - h_i;
	let p = v * (1 - s);
	let q = v * (1 - f*s);
	let t = v * (1 - (1 - f) * s);
	let r, g, b;
	if (h_i==0) {
		r = v; g = t; b = p;
	}
	if (h_i==1) {
		r = q; g = v; b = p;
	}
	if (h_i==2) {
		r = p; g = v; b = t;
	}
	if (h_i==3) {
		r = p; g = q; b = v;
	}
	if (h_i==4) {
		r = t; g = p; b = v;
	}
	if (h_i==5) {
		r = v; g = p; b = q;
	}
	return ("#" + Math.floor((r*256)).toString(16) + Math.floor((g*256)).toString(16) + Math.floor((b*256)).toString(16))
}
var ballArray = [];

function celebrate(text) {
	document.getElementById("name").remove();
	document.getElementById("chance").remove();
	document.getElementById("hash").remove();
	document.getElementById("celebrate").remove();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.setAttribute("id","drawingcanvas")
	document.getElementById("body").append(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var my_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	my_gradient.addColorStop(0, "#4f68ba");
	my_gradient.addColorStop(1, "#274ed0");
	ctx.fillStyle = my_gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//! DRAW "CLICK!"
	ballArray.push(new Balloon());
	let circle = new Balloon();
	ctx.beginPath();
	ctx.arc(circle.x, circle.y-20, 20, 0, 2 * Math.PI);
	ctx.stroke();
	var ctx = canvas.getContext('2d');
	canvas.addEventListener("click",handleClick);
	// var array = someArray.filter(function(el) { return el.Name != "Kristian"; }); 
	animate();
}

function animate() {
	var canvas = document.getElementById("drawingcanvas");		
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let index = 0; index < ballArray.length; index++) {
		ballArray[index].move();

		ctx.beginPath();
		ctx.arc(ballArray[index].x, ballArray[index].y-20, 20, 0, 2 * Math.PI);
		ctx.stroke();
		if (ballArray[index].y < 0) {
			ballArray.splice(index, 1);
			console.log("test")
		}
		
	}
	requestAnimationFrame(animate);
}
let currentNote = 0;
let soundarray = [];

{ //* Create the sound sources
	soundarray.push(document.createElement("source")); soundarray[0].type = "audio/mpeg"; soundarray[0].src  = "audio/soundcut1.mp3";
	soundarray.push(document.createElement("source")); soundarray[1].type = "audio/mpeg"; soundarray[1].src  = "audio/soundcut2.mp3";
	soundarray.push(document.createElement("source")); soundarray[2].type = "audio/mpeg"; soundarray[2].src  = "audio/soundcut3.mp3";
	soundarray.push(document.createElement("source")); soundarray[3].type = "audio/mpeg"; soundarray[3].src  = "audio/soundcut4.mp3";
	soundarray.push(document.createElement("source")); soundarray[4].type = "audio/mpeg"; soundarray[4].src  = "audio/soundcut5.mp3";
	soundarray.push(document.createElement("source")); soundarray[5].type = "audio/mpeg"; soundarray[5].src  = "audio/soundcut6.mp3";
	soundarray.push(document.createElement("source")); soundarray[6].type = "audio/mpeg"; soundarray[6].src  = "audio/soundcut7.mp3";
	soundarray.push(document.createElement("source")); soundarray[7].type = "audio/mpeg"; soundarray[7].src  = "audio/soundcut8.mp3";
	soundarray.push(document.createElement("source")); soundarray[8].type = "audio/mpeg"; soundarray[8].src  = "audio/soundcut9.mp3";
	soundarray.push(document.createElement("source")); soundarray[9].type = "audio/mpeg"; soundarray[9].src  = "audio/soundcut10.mp3";
	soundarray.push(document.createElement("source")); soundarray[10].type = "audio/mpeg"; soundarray[10].src  = "audio/soundcut11.mp3";
	soundarray.push(document.createElement("source")); soundarray[11].type = "audio/mpeg"; soundarray[11].src  = "audio/soundcut12.mp3";
	soundarray.push(document.createElement("source")); soundarray[12].type = "audio/mpeg"; soundarray[12].src  = "audio/soundcut13.mp3";
	soundarray.push(document.createElement("source")); soundarray[13].type = "audio/mpeg"; soundarray[13].src  = "audio/soundcut14.mp3";
	soundarray.push(document.createElement("source")); soundarray[14].type = "audio/mpeg"; soundarray[14].src  = "audio/soundcut15.mp3";
	soundarray.push(document.createElement("source")); soundarray[15].type = "audio/mpeg"; soundarray[15].src  = "audio/soundcut16.mp3";
	soundarray.push(document.createElement("source")); soundarray[16].type = "audio/mpeg"; soundarray[16].src  = "audio/soundcut17.mp3";
	soundarray.push(document.createElement("source")); soundarray[17].type = "audio/mpeg"; soundarray[17].src  = "audio/soundcut18.mp3";
	soundarray.push(document.createElement("source")); soundarray[18].type = "audio/mpeg"; soundarray[18].src  = "audio/soundcut19.mp3";
	soundarray.push(document.createElement("source")); soundarray[19].type = "audio/mpeg"; soundarray[19].src  = "audio/soundcut20.mp3";
	soundarray.push(document.createElement("source")); soundarray[20].type = "audio/mpeg"; soundarray[20].src  = "audio/soundcut21.mp3";
	soundarray.push(document.createElement("source")); soundarray[21].type = "audio/mpeg"; soundarray[21].src  = "audio/soundcut22.mp3";
	soundarray.push(document.createElement("source")); soundarray[22].type = "audio/mpeg"; soundarray[22].src  = "audio/soundcut23.mp3";
	soundarray.push(document.createElement("source")); soundarray[23].type = "audio/mpeg"; soundarray[23].src  = "audio/soundcut24.mp3";
	soundarray.push(document.createElement("source")); soundarray[24].type = "audio/mpeg"; soundarray[24].src  = "audio/soundcut25.mp3";
}
function handleClick(){
	ballArray.push(new Balloon());
	currentNote %= 25;
	currentNote++;
	var snd1  = new Audio();
	snd1.appendChild(soundarray[currentNote]);
	snd1.play();
}

