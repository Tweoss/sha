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
			// let p = this.selectionStart; this.value = this.value.toUpperCase(); this.setSelectionRange(p, p);
			textcontent = this.value;
			var utf8 = unescape(encodeURIComponent(textcontent));
			// console.log(textcontent);
			// for (var i = 0; i < utf8.length; i++) {
			// 	arrayview[i] = (utf8.charCodeAt(i));
			// }
			// for (var i = 0; i < utf8.length; i+=4) {
			// 	// arrayview[i] = (utf8.charCodeAt(i));
			// 	arrayview[i+0] = (utf8.charCodeAt(i+3)>>0);
			// 	arrayview[i+1] = (utf8.charCodeAt(i+2)>>0);
			// 	arrayview[i+2] = (utf8.charCodeAt(i+1)>>0);
				// arrayview[i+3] = (utf8.charCodeAt(i+0)>>0);
			// }
			console.log("CHaracter", arrayview[0]);	
			// i++;
			arrayview[3] = 0b10000000; 
			i++;
			// console.log("i is", i);
			let l = utf8.length; //! SLIGHTLY CONFUSED ABOUT +1
			for (var j = 0; j < 512/8-(i + 1 + 64/8)%(512/8); j++) {
				arrayview[i+j] = 0;
				
			}
			// console.log("j is", j);
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
			arrayview[i+j+6] = 	(l & 0x00FF0000) >> 16;
			arrayview[i+j+7] = 	(l & 0x0000FF00) >> 8;
			arrayview[i+j+8] = 	(l & 0x000000FF);

			// console.log("The first byte in the array is ",arrayview[0]);
			// console.log(arrayview[0]); console.log(arrayview[1]); console.log(arrayview[2]); console.log(arrayview[3]); console.log(arrayview[4]); console.log(arrayview[5]);
			// console.log("There are ",i," bytes of characters");
			// console.log(i+j+8);
			// console.log("There are ",j," bytes of spaces");
			// console.log("Wasm"); 
			//* i+j+8 is address of the last byte, so the number of 512 bit chunks is
			//* (i+j+8+1)*8/512
			// results.instance.exports.sha(1);
			results.instance.exports.sha(((i+j+8)+1)*8/512);
			let string = "";
			for (var i = 0; i < 32; i+=4) {
				// // console.log(arrayview[8704+i].toString(2).padStart(8, "0"))
				string = string + (arrayview[8704+i+3]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704+i+2]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704+i+1]).toString(16).padStart(2, "0");
				string = string + (arrayview[8704+i]).toString(16).padStart(2, "0");
			}
			console.log(string);
			string = "";
			for (var i = 0; i < 256; i+=4) {
				// console.log((arrayview[8704+i]).toString(16));
				string = string + (arrayview[8192+i+3]).toString(16).padStart(2, "0");
				string = string + (arrayview[8192+i+2]).toString(16).padStart(2, "0");
				string = string + (arrayview[8192+i+1]).toString(16).padStart(2, "0");
				string = string + (arrayview[8192+i]).toString(16).padStart(2, "0");
			}
			// console.log(string);
		}
		document.getElementById("name").addEventListener('input', input);
	}
	);
function celebrate() {
	document.getElementById('celebrate').disabled = !document.getElementById('celebrate').disabled;
}