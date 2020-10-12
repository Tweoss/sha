(module ;;module start
(import "env" "memory" (memory 2))
(import "env" "log" (func $log (param i32)))
;; (export "init" (func $initround))
(export "sha" (func $sha))
;;initialize the round constant array
(func $initround 
	(local $i i32)
	(local.set $i (i32.const 8192))
	(i32.store (local.get $i) (i32.const 1116352408))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1899447441))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3049323471))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3921009573))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 961987163))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1508970993))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2453635748))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2870763221))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3624381080))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 310598401))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 607225278))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1426881987))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1925078388))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2162078206))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2614888103))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3248222580))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3835390401))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 4022224774))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 264347078))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 604807628))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 770255983))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1249150122))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1555081692))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1996064986))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2554220882))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2821834349))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2952996808))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3210313671))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3336571891))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3584528711))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 113926993))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 338241895))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 666307205))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 773529912))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1294757372))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1396182291))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1695183700))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1986661051))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2177026350))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2456956037))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2730485921))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2820302411))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3259730800))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3345764771))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3516065817))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3600352804))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 4094571909))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 275423344))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 430227734))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 506948616))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 659060556))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 883997877))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 958139571))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1322822218))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1537002063))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1747873779))

	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 1955562222))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2024104815))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2227730452))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2361852424))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2428436474))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 2756734187))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3204031479))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (i32.const 3329325298))

	;; (call $log (local.get $i))
	;; (call $log (i32.load (local.get $i)))
)
;;read the round constant array (works like a normal array not by bytes)
(func $readround (param $index i32) (result i32)
	;;65536 is the bitwise location, so 8192 is the byte location
	(i32.load (i32.add (i32.const 8192) (i32.mul (local.get $index) (i32.const 4))))
)
;;read the msg array (works like a normal array not by bytes)
(func $readmsg (param $index i32) (result i32)
	(i32.load (i32.add (i32.const 8448) (i32.mul (local.get $index) (i32.const 4))))
)
;;write the msg array (works like a normal array not by bytes)
(func $writemsg (param $index i32) (param $value i32)
	;; (call $log (i32.const 421))
	;; (call $log (local.get $index))
	(i32.store (i32.add (i32.const 8448) (i32.mul (local.get $index) (i32.const 4))) (local.get $value))
)
;;write the output 
(func $writeout (param $h0 i32) (param $h1 i32) (param $h2 i32) (param $h3 i32) (param $h4 i32) (param $h5 i32) (param $h6 i32) (param $h7 i32)
	(local $i i32)
	(local.set $i (i32.const 8704))
	(i32.store (local.get $i) (local.get $h0))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h1))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h2))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h3))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h4))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h5))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h6))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
	(i32.store (local.get $i) (local.get $h7))
	(local.set $i (i32.add (local.get $i) (i32.const 4)))
)

;;reverses every i32 for every chunk
(func $rev (param $chunks i32)
	(local $i i32)
	(local $0 i32) (local $1 i32) (local $2 i32) (local $3 i32) (local $4 i32)
	(block(loop
		(local.set $0 (i32.load (i32.mul (local.get $i) (i32.const 4))))
		(local.set $1 (i32.shl (i32.shr_u (i32.shl (local.get $0) (i32.const 0)) (i32.const 24)) (i32.const 0)))
		(local.set $2 (i32.shl (i32.shr_u (i32.shl (local.get $0) (i32.const 8)) (i32.const 16)) (i32.const 8)))
		(local.set $3 (i32.shl (i32.shr_u (i32.shl (local.get $0) (i32.const 16)) (i32.const 8)) (i32.const 16)))
		(local.set $4 (i32.shl (i32.shr_u (i32.shl (local.get $0) (i32.const 24)) (i32.const 0)) (i32.const 24)))
		(i32.store (i32.mul (local.get $i) (i32.const 4)) (i32.or (i32.or (local.get $1) (local.get $2)) (i32.or (local.get $3) (local.get $4))))
		(local.set $i (i32.add (local.get $i) (i32.const 1)))
		(call $log (i32.const 420))
		(call $log (local.get $0))
		(call $log (i32.or (i32.or (local.get $1) (local.get $2)) (i32.or (local.get $3) (local.get $4))))
		(br_if 0 (i32.lt_u (local.get $i) (i32.mul (local.get $chunks) (i32.const 16))))
	))
)


;;calculates sha256 of input string
(func $sha (param $chunks i32)
	(local $h0  i32) (local $h1  i32) (local $h2  i32) (local $h3  i32) (local $h4  i32) (local $h5  i32) (local $h6  i32) (local $h7  i32)
	(local $a   i32) (local $b   i32) (local $c   i32) (local $d   i32) (local $e   i32) (local $f   i32) (local $g   i32) (local $h   i32)
	(local $s0  i32) (local $s1  i32)
	(local $S0  i32) (local $S1  i32)
	(local $ch  i32)
	(local $maj i32)
	(local $temp1 i32) (local $temp2 i32)
	(local $i i32) (local $j i32) ;; use j for chunk, so more consistent
	(call $initround)
	(call $rev (local.get $chunks))
	(local.set $h0 (i32.const 1779033703)) (local.set $h1 (i32.const 3144134277)) (local.set $h2 (i32.const 1013904242)) (local.set $h3 (i32.const 2773480762)) (local.set $h4 (i32.const 1359893119)) (local.set $h5 (i32.const 2600822924)) (local.set $h6 (i32.const 528734635)) (local.set $h7 (i32.const 1541459225))
	;; ;; (call $log (local.get $S0))
	(local.set $j (i32.const 0))
	(block (loop ;; chunk loop
		;; (call $log (i32.const 420))

		;; copy the chunk into the message array
		(local.set $i (i32.const 0))
		(block (loop
			(call $log (i32.mul (i32.add (i32.mul (local.get $j) (i32.const 64)) (local.get $i)) (i32.const 4)))
			;; (call $log (i32.load (i32.mul (local.get $i) (i32.const 4))))
			(call $log (i32.load (i32.mul (i32.add (i32.mul (local.get $j) (i32.const 64)) (local.get $i)) (i32.const 4))))
			(call $writemsg (local.get $i) (i32.load (i32.mul (i32.add (i32.mul (local.get $j) (i32.const 64)) (local.get $i)) (i32.const 4))))
			;; (call $log (i32.load (i32.mul (local.get $i) (i32.const 4))))
			;; (call $log (call $readmsg (local.get $i)))
			(local.set $i (i32.add (local.get $i) (i32.const 1)))
			(br_if 0 (i32.lt_u (local.get $i) (i32.const 16)))
		))

		;; Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
		(local.set $i (i32.const 16))
		(block (loop
						(i32.rotr (call $readmsg (i32.sub (local.get $i) (i32.const 15))) (i32.const 7))
						(i32.rotr (call $readmsg (i32.sub (local.get $i) (i32.const 15))) (i32.const 18))
					(i32.xor)
					(i32.shr_u (call $readmsg (i32.sub (local.get $i) (i32.const 15))) (i32.const 3))
				(i32.xor)
			(local.set $s0)
						(i32.rotr (call $readmsg (i32.sub (local.get $i) (i32.const 2))) (i32.const 17))
						(i32.rotr (call $readmsg (i32.sub (local.get $i) (i32.const 2))) (i32.const 19))
					(i32.xor)
					(i32.shr_u (call $readmsg (i32.sub (local.get $i) (i32.const 2))) (i32.const 10))
				(i32.xor)
			(local.set $s1)
			(local.get $i)
						(call $readmsg (i32.sub (local.get $i) (i32.const 16)))
						(local.get $s0)
					(i32.add)
						(call $readmsg (i32.sub (local.get $i) (i32.const 7)))
						(local.get $s1)
					(i32.add)
				(i32.add)
			(call $writemsg)
			(local.set $i (i32.add (local.get $i) (i32.const 1)))
			(br_if 0 (i32.lt_u (local.get $i) (i32.const 64)))
			;; for i from 16 to 63
			;; 		s0 := (w[i-15] rightrotate  7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift  3)
			;; 		s1 := (w[i- 2] rightrotate 17) xor (w[i- 2] rightrotate 19) xor (w[i- 2] rightshift 10)
			;; 		w[i] := w[i-16] + s0 + w[i-7] + s1
		))

		;; Initialize working variables to current hash value:
		(local.set $a (local.get $h0))
		(local.set $b (local.get $h1))
		(local.set $c (local.get $h2))
		(local.set $d (local.get $h3))
		(local.set $e (local.get $h4))
		(local.set $f (local.get $h5))
		(local.set $g (local.get $h6))
		(local.set $h (local.get $h7))

		(local.set $i (i32.const 0))
		(block(loop 
						(i32.rotr (local.get $e) (i32.const 6))
						(i32.rotr (local.get $e) (i32.const 11))
					(i32.xor)
					(i32.rotr (local.get $e) (i32.const 25))
				(i32.xor)
			(local.set $S1)
						(local.get $e)
						(local.get $f)
					(i32.and)
							(local.get $e)
							(i32.const 4294967295) ;; flips every bit
						(i32.xor)
						(local.get $g)
					(i32.and)
				(i32.xor)
			(local.set $ch)
							(local.get $h)
							(local.get $S1)
						(i32.add)
							(local.get $ch)
							(call $readround (local.get $i))
						(i32.add)
					(i32.add)
					(call $readmsg (local.get $i))
				(i32.add)
			(local.set $temp1)
						(i32.rotr (local.get $a) (i32.const 2))
						(i32.rotr (local.get $a) (i32.const 13))
					(i32.xor)
					(i32.rotr (local.get $a) (i32.const 22))
				(i32.xor)
			(local.set $S0)
							(local.get $a)
							(local.get $b)
						(i32.and)
							(local.get $a)
							(local.get $c)
						(i32.and)
					(i32.xor)
						(local.get $b)
						(local.get $c)
					(i32.and)
				(i32.xor)
			(local.set $maj)
			(local.set $temp2 (i32.add (local.get $S0) (local.get $maj)))

			(local.set $h (local.get $g))
			(local.set $g (local.get $f))
			(local.set $f (local.get $e))
			(local.set $e (i32.add (local.get $d) (local.get $temp1)))
			(local.set $d (local.get $c))
			(local.set $c (local.get $b))
			(local.set $b (local.get $a))
			(local.set $a (i32.add (local.get $temp1) (local.get $temp2)))
			;; for i from 0 to 63
			;; 	S1 := (e rightrotate 6) xor (e rightrotate 11) xor (e rightrotate 25)
			;; 	ch := (e and f) xor ((not e) and g)
			;; 	temp1 := h + S1 + ch + k[i] + w[i]
			;; 	S0 := (a rightrotate 2) xor (a rightrotate 13) xor (a rightrotate 22)
			;; 	maj := (a and b) xor (a and c) xor (b and c)
			;; 	temp2 := S0 + maj 
			;; 
			;; h := g
			;; g := f
			;; f := e
			;; e := d + temp1
			;; d := c
			;; c := b
			;; b := a
			;; a := temp1 + temp2
			(local.set $i (i32.add (local.get $i) (i32.const 1)))
			(br_if 0 (i32.lt_u (local.get $i) (i32.const 64)))
		))
	
		(local.set $h0 (i32.add (local.get $h0) (local.get $a)))
		(local.set $h1 (i32.add (local.get $h1) (local.get $b)))
		(local.set $h2 (i32.add (local.get $h2) (local.get $c)))
		(local.set $h3 (i32.add (local.get $h3) (local.get $d)))
		(local.set $h4 (i32.add (local.get $h4) (local.get $e)))
		(local.set $h5 (i32.add (local.get $h5) (local.get $f)))
		(local.set $h6 (i32.add (local.get $h6) (local.get $g)))
		(local.set $h7 (i32.add (local.get $h7) (local.get $h)))

		(local.set $j (i32.add (local.get $j) (i32.const 1)))
		(br_if 0 (i32.lt_u (local.get $j) (local.get $chunks)))
	)) ;; end chunk loop
	(call $writeout (local.get $h0) (local.get $h1) (local.get $h2) (local.get $h3) (local.get $h4) (local.get $h5) (local.get $h6) (local.get $h7))
)
) ;;module end