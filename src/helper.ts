// Probably inefficient, but that's the best I can come up with
export function clean_2d_array(array: string[][], span: number): string[][] {
    for (let i = 0; i < span; i++) {
        if (array.every((row) => row[i].trim().length === 0)) {
            array.forEach((row) => row.splice(i, 1));
            i--;
            span--;
        }
    }

    return array;
}
