import { MathUtil } from "../base/maths/MathUtil";

/**
 * @hidden
 */
const EULER = 0.57721566490153286060;

/**
 * @hidden
 */
const MAX_K = 150;

/**
 * Exponential integral.
 */
export function expint(x: number): number
{
	if (x == 0)
		return -Infinity;
	else if (x < 0)
		return -_E1_G(-x);
	else
		return _EI_Factorial(x);
}

/**
 * @hidden
 */
function _EI_Factorial(x: number): number
{
	return EULER + Math.log(Math.abs(x)) / Math.log(Math.E)
		+ MathUtil.sigma(function (k: number): number
		{
			return Math.pow(x, k) / (k * MathUtil.factorial(k));
		}, 1, MAX_K);
}

/* ---------------------------------------------------------------
	SWAMEE AND OHIJA APPROXIMATION
--------------------------------------------------------------- */
// function _E1_AB(x: number): number
// {
// 	let A: number = _Compute_A(x);
// 	let B: number = _Compute_B(x);

// 	let ret: number = Math.pow(A, -7.7) + B;
// 	return Math.pow(ret, -0.13);
// }

// function _Compute_A(x: number): number
// {
// 	let ret: number = 0.56146 / x + 0.65;
// 	ret *= 1 + x;
// 	ret = Math.log(ret) / Math.log(Math.E);

// 	return ret;
// }

// function _Compute_B(x: number): number
// {
// 	let ret: number = Math.pow(x, 4);
// 	ret *= Math.pow(Math.E, 7.7*x);
// 	ret *= Math.pow(2 + x, 3.7);

// 	return ret;
// }

/* ---------------------------------------------------------------
	BARRY APPROXIMATION
--------------------------------------------------------------- */
/**
 * @hidden
 */
function _E1_G(x: number): number
{
	let h: number = _Compute_h(x);

	let ret: number = G + (1-G) * Math.pow(Math.E, -x / (1-G));
	ret = Math.pow(Math.E, -x) / ret;
	
	let ln: number = 1 + G/x - (1-G)/Math.pow(h + B*x, 2);
	ln = Math.log(ln) / Math.log(Math.E);

	return ret * ln;
}

/**
 * @hidden
 */
function _Compute_h(x: number): number
{
	let q: number = _Compute_q(x);
	let left: number = 1 / (1 + Math.pow(x, 1.5));
	let right: number = (H_INF * q) / (1 + q);

	return left + right;
}

/**
 * @hidden
 */
function _Compute_q(x: number): number
{
	return 20/47 * Math.pow(x, Math.sqrt(31/26));
}

/**
 * @hidden
 */
const G = Math.pow(Math.E, -EULER);

/**
 * @hidden
 */
const B = Math.sqrt
(
	(2*(1-G)) / (G*(2-G))
);

/**
 * @hidden
 */
const H_INF = (1-G)
	* (G*G - 6*G + 12)
	/ (3*G * Math.pow(2-G, 2) * B);