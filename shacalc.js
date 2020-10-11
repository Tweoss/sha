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
			console.log(textcontent);
			for (var i = 0; i < utf8.length; i++) {
				arrayview[i] = (utf8.charCodeAt(i));
			}
			// i++;
			arrayview[i] = 0b10000000; 
			i++;
			let l = utf8.length; //! SLIGHTLY CONFUSED ABOUT +1
			for (var j = 0; j < 512/8-(i + 64/8 + 1)%(512/8); j++) {
				arrayview[i+j] = 0;
			}
			//* one page of wasm memory is 64KiB or 64*1024=65,536
			//* each character can be up to 4 bytes -> 16,000 characters
			//* the possible length in bits is 16,000*4bytes*4bits
			//* length is at most 256,000
			//* which is at most 18 bits
			//* so, we can ignore the first byte, second byte, third, fourth, fifth
			//* store in the 6, 7, 8th
			arrayview[i+j+1] = 	0;
			arrayview[i+j+2] = 	0;
			arrayview[i+j+3] = 	0;
			arrayview[i+j+4] = 	0;
			arrayview[i+j+5] = 	0;
			arrayview[i+j+6] = 	(l & 0x00FF0000) >> 4;
			arrayview[i+j+7] = 	(l & 0x0000FF00) >> 8;
			arrayview[i+j+8] = 	(l & 0x000000FF);

			console.log("The first byte in the array is ",arrayview[0]);
			console.log(arrayview[0]);
			console.log(arrayview[1]);
			console.log(arrayview[2]);
			console.log(arrayview[3]);
			console.log(arrayview[4]);
			console.log(arrayview[5]);
			console.log("HI");
			console.log("There are ",i-1," characters");
			console.log(i+j+8);
			console.log("There are ",j + 1," bytes of spaces");
			console.log(arrayview[i+j+7]);
			console.log(arrayview[i+j+8]);
			console.log("63",arrayview[63]);
			console.log("64",arrayview[64]);
			console.log("Wasm");
			results.instance.exports.sha();
		}
		document.getElementById("name").addEventListener('input', input);
	}
	);
function celebrate() {
	document.getElementById('celebrate').disabled = !document.getElementById('celebrate').disabled;
}