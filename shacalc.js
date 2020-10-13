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
			document.getElementById("hash").innerText = string;
		}
		document.getElementById("name").addEventListener('input', input);
	}
	);
function celebrate() {
	document.getElementById('celebrate').disabled = !document.getElementById('celebrate').disabled;
}