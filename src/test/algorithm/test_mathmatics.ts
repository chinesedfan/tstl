import * as std from "../../index";

export function test_mathmatics(): void
{
    _Test_min_max();
    _Test_permutations();
}

function _Test_min_max(): void
{
    let v = new std.Vector<number>();
    for (let i: number = 0; i < 1000; ++i)
        v.push_back(Math.random());

    let pair = std.minmax_element(v.begin(), v.end());
    let min = Math.min(...v.data());
    let max = Math.max(...v.data());

    if (min !== pair.first.value || max !== pair.second.value)
        throw new Error("Error on std.minmax_element().");
}

function _Test_permutations(): void
{
    let x = new std.Vector<number>([0, 1, 2, 3]);
    let y = new std.Vector<number>([3, 2, 1, 0]);

    if (std.ranges.is_permutation(x, y) === false)
        throw new Error("Error on std.is_permutation().");
    
    // NEXT_PERMUTATION
    let cnt: number = 1;
    while (std.ranges.next_permutation(x) === true)
        ++cnt;
    if (cnt !== 4*3*2)
        throw new Error("Error on std.next_permutation().");

    // PREV_PERMUTATION
    cnt = 1;
    while (std.ranges.prev_permutation(y) === true)
        ++cnt;
    if (cnt !== 4*3*2)
        throw new Error("Error on std.prev_permutation().");
}