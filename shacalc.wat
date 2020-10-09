(module ;;module start
(import "env" "memory" (memory 1))
(import "env" "log" (func $log (param i32)))
;;calculates sha256 of input string
(func $avg (param $num1 f64) (param $num2 f64) (result f64)
	(f64.add
		(local.get $num1)
		(local.get $num2)
	)
	(f64.const 2)
	(f64.div)
)
) ;;module end