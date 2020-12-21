export function createFunctionBar(value, callback) {
    return Array.from(Array(value + 1).keys())
        .slice(1)
        .map(callback);
}