export function incDecNatural(previous: number, incDec: boolean) {
    return incDec ? previous + 1 : Math.max(0, previous - 1);
}

export function repeat(num: number, f: () => void) {
    for (let i = 0; i < num; i++) {
        f();
    }
}