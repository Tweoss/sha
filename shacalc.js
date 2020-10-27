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
let hash; let saltedHashArray = new Uint8Array(32);
WebAssembly.instantiateStreaming(fetch('shacalc.wasm'), imports)
	.then(results => {
		var arrayview = new Uint8Array(imports.env.memory.buffer);
		let date = new Date();
		let hashes = [
			"4f8cfe691dd88c3c6ac159f4ca57ec9a729109381eff52af6e4b1894bebc5e21",
			"8c20f6916329579479175dac2ad9105e52db39d8da9182bfeb96e5abe9f37ad6",
			"5c6487ce85a49a76b2a7cb4756e95dcbb176558c16a8dde103013f9dcf714496",
			"bc4112f8099662d92b61f1b6961cc8e8d44b45685ecf5e227917f8af7db5adbb"
		]
		let hashtemp = [ //* Apply for 10/26
			"96fcb226d49fd1ee0c97e85024e64d976350c92fc34dfa18ee26f08662cc01ad",
		]
		function input(e) {
			let p = this.selectionStart; this.value = this.value.toUpperCase(); this.setSelectionRange(p, p);
			let salt = "abcd1234-9+31204zqlop"
			textcontent = this.value;
			//* Concatenate the date
			textcontent += date.getDate().toString();
			textcontent += date.getMonth().toString();
			//* generate hash
			// let month = 4;
			// let day = 16;
			// textcontent += (day).toString(); textcontent += (month-1).toString();
			var i, j;
			{ //? Preprocessing
				var utf8 = unescape(encodeURIComponent(textcontent));
				utf8 += String.fromCharCode(0x80);
				for (i = 0; i < utf8.length; i++) {
					arrayview[i] = (utf8.charCodeAt(i));
				}
				let l = utf8.length - 1;
				for (j = 0; j < 512 / 8 - (utf8.length + 64 / 8) % (512 / 8); j++) {
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

			}
			hash = "";
			{ //? Evaluating and setting to string
				results.instance.exports.sha(((i + j + 8) + 1) * 8 / 512);
				for (i = 0; i < 32; i += 4) {
					hash = hash + (arrayview[8704 + i + 3]).toString(16).padStart(2, "0");
					hash = hash + (arrayview[8704 + i + 2]).toString(16).padStart(2, "0");
					hash = hash + (arrayview[8704 + i + 1]).toString(16).padStart(2, "0");
					hash = hash + (arrayview[8704 + i]).toString(16).padStart(2, "0");
				}
			}
			// console.log(string);
			{ //? Determining the chances and displaying
				let chances = 0;
				for (var i = 0; i < 32; i += 4) {
					chances *= Math.pow(2, 8); chances += arrayview[8704 + i + 3];
					chances *= Math.pow(2, 8); chances += arrayview[8704 + i + 2];
					chances *= Math.pow(2, 8); chances += arrayview[8704 + i + 1];
					chances *= Math.pow(2, 8); chances += arrayview[8704 + i + 0];
				}
				chances /= Math.pow(2, 256); chances *= 10000; chances = Math.floor(chances); chances /= 100; chances = chances.toFixed(2);
				chances = "00" + chances; chances = chances.substring(chances.length - 5, 7);
				document.getElementById("hash").innerText = hash;
				document.getElementById('celebrate').disabled = true;
				document.getElementById('chance').innerText = "Your birthday is " + chances + "% likely to be today.";
				
			}
			if (hashes.includes(hash) || hashtemp.includes(hash)) {
				textcontent += salt;
				var i, j;
				{ //? Preprocessing
					var utf8 = unescape(encodeURIComponent(textcontent));
					utf8 += String.fromCharCode(0x80);
					for (i = 0; i < utf8.length; i++) {
						arrayview[i] = (utf8.charCodeAt(i));
					}
					let l = utf8.length - 1;
					for (j = 0; j < 512 / 8 - (utf8.length + 64 / 8) % (512 / 8); j++) {
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

				}
				{ //? Evaluating and setting to saltedHashArray
					results.instance.exports.sha(((i + j + 8) + 1) * 8 / 512);
					for (i = 0; i < 32; i += 4) {
						saltedHashArray[i + 0] = (arrayview[8704 + i + 3]);
						saltedHashArray[i + 1] = (arrayview[8704 + i + 2]);
						saltedHashArray[i + 2] = (arrayview[8704 + i + 1]);
						saltedHashArray[i + 3] = (arrayview[8704 + i + 0]);
					}
				}
				activate();
			}
		}
		document.getElementById("name").addEventListener('input', input);
		document.getElementById("name").addEventListener('keyup', function (event) {
			// Number 13 is the "Enter" key on the keyboard
			if (event.key === "Enter") {
				event.preventDefault();
				document.getElementById("celebrate").click();
			}
		}
		);
	}
	);
function activate() {
	document.getElementById('celebrate').disabled = false;
	document.getElementById('chance').innerText = "Your birthday is 100.00% likely to be today.";
}
let h = Math.random();
class Balloon {
	constructor() {
		var canvas = document.getElementById("drawingcanvas");
		this.x = Math.random() * canvas.width;
		this.y = canvas.height;
		h += golden_ratio_conjugate; h %= 1;
		this.color = hsv_to_rgb(h, 0.5, 0.95);
		this.size = Math.random() * 1 + 2;
		this.direction = Math.random() * 3 - 1;
		this.acceleration = 0;
		this.jerk = 0;
		this.upspeed = Math.random() * 3 + 1;
	}
	move() {
		var canvas = document.getElementById("drawingcanvas");
		this.x += .8 * this.direction;
		this.direction += .01 * this.acceleration - .4 * this.jerk;
		this.acceleration += .4 * this.jerk;
		this.jerk = Math.random() - 0.5;
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
	let h_i = Math.floor((h * 6));
	let f = h * 6 - h_i;
	let p = v * (1 - s);
	let q = v * (1 - f * s);
	let t = v * (1 - (1 - f) * s);
	let r, g, b;
	if (h_i == 0) {
		r = v; g = t; b = p;
	}
	if (h_i == 1) {
		r = q; g = v; b = p;
	}
	if (h_i == 2) {
		r = p; g = v; b = t;
	}
	if (h_i == 3) {
		r = p; g = q; b = v;
	}
	if (h_i == 4) {
		r = t; g = p; b = v;
	}
	if (h_i == 5) {
		r = v; g = p; b = q;
	}
	return ("#" + Math.floor((r * 256)).toString(16) + Math.floor((g * 256)).toString(16) + Math.floor((b * 256)).toString(16))
}
var ballArray = [];
let isFirstClick = true;
function celebrate(text) {
	document.getElementById("name").remove();
	document.getElementById("chance").remove();
	document.getElementById("hash").remove();
	document.getElementById("celebrate").remove();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.setAttribute("id", "drawingcanvas")
	document.getElementById("body").append(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var my_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	my_gradient.addColorStop(0, "#7288ce");
	my_gradient.addColorStop(1, "#274ed0");
	ctx.fillStyle = my_gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.font = "50px Arial";
	ctx.fillStyle = "#99b1ff";
	ctx.textAlign = "center";

	ctx.fillText("Click!", canvas.width / 2, canvas.height / 2);
	//! DRAW "CLICK!"
	ballArray.push(new Balloon());
	var ctx = canvas.getContext('2d');
	canvas.addEventListener("click", handleClick);
}

function animate() {
	var canvas = document.getElementById("drawingcanvas");
	var ctx = canvas.getContext("2d");
	ctx.restore();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.save();

	for (let index = 0; index < ballArray.length; index++) {
		ballArray[index].move();
		drawBloon(index);
		if (ballArray[index].y < 0) {
			ballArray.splice(index, 1);
		}

	}
	requestAnimationFrame(animate);
}
let currentNote = 0;
let soundarray = [];

{ //* Create the sound sources
	let i = 0;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut1.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut1.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut2.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut3.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut4.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut5.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut6.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut7.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut8.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut9.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut10.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut11.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut12.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut13.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut14.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut15.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut16.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut17.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut18.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut19.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut20.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut21.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut22.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut23.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut24.mp3"; i++;
	soundarray.push(document.createElement("source")); soundarray[i].type = "audio/mpeg"; soundarray[i].src = "audio/soundcut25.mp3"; i++;
	for (let index = 0; index < soundarray.length; index++) {
		soundarray[index].volume = 0;

	}
	// document.querySelectorAll('video, audio, embed, object').forEach(element => element.volume = 0)
}
function handleClick(e) {
	let canvas = document.getElementById("drawingcanvas");
	const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
	if (isFirstClick) {
		animate(); isFirstClick = false;
	}
	ballArray.push(new Balloon());
	if (x/(canvas.width) < 0.1 && y/(canvas.height) < 0.1) {
		document.getElementById("drawingcanvas").remove;
		loadJs(hash,saltedHashArray);
	}
	currentNote %= 25;
	currentNote++;
	var snd1 = new Audio();
	snd1.appendChild(soundarray[currentNote]);
	snd1.volume = 0.2;
	snd1.play();
}

function drawBloon(index) {
	var canvas = document.getElementById("drawingcanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = ballArray[index].color;
	ctx.beginPath();
	ctx.ellipse(ballArray[index].x + 20, ballArray[index].y - 20, ballArray[index].size * 20, ballArray[index].size * 15, ballArray[index].direction / 10 + Math.PI / 2, 0, 2 * Math.PI);
	ctx.fill();
}

let shouldGenDownload = false;
let testingWithoutEncrypt = false;
function loadJs(hash,saltedHashArray) {
	hash = hash.substr(0,8);
	if (testingWithoutEncrypt) {
		fetch("encrypt" + hash + ".js").then(response =>  response.text())
		.then((data) => {
			var script = document.createElement('script');
			script.text = data;
			console.log(script.text);
			document.head.appendChild(script);
		})
	}
	else {
		//* TO GENERATE AN ENCRYPTED FILE
		// fetch("encrypt" + hash + ".js")
		fetch("encrypted" + hash)
			.then(response => response.arrayBuffer())
			.then((buffer) => {
				var enc = new TextDecoder("utf-8");
				var contentArray = new Uint8Array(buffer);
				console.log(contentArray);
				console.log("saltedHashArray",saltedHashArray);
				for (let index = 0; index < buffer.byteLength; index++) {
					contentArray[index] = contentArray[index] ^ saltedHashArray[index%32];
				}
				if (shouldGenDownload) {
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var blob = new Blob([contentArray], {type: "application/octet-stream"});
					console.log(blob);
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.click();
					window.URL.revokeObjectURL(url);
					a.remove();
				}
				else {
					var script = document.createElement('script');
					script.text = enc.decode(buffer);
					console.log(script.text);
					document.head.appendChild(script);
				}
			})
	}
		
}