export function incDecNatural(previous: number, incDec: boolean) {
    return incDec ? previous + 1 : Math.max(0, previous - 1);
}

export function repeat(num: number, f: () => void) {
    for (let i = 0; i < num; i++) {
        f();
    }
}

export function repeatMap<T>(num: number, f: (index: number) => T): T[] {
    const list = []
    for (let i = 0; i < num; i++) {
        list.push(f(i));
    }
    return list;
}

export function nonAscii(aString: string) {
    const ascii = /^[ -~]+$/;
    return !ascii.test(aString);
}

export interface Translation {
    [k: string]: string
}
