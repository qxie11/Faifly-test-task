import { createGraph } from "./graph.template.js";

export default class Graph {
    constructor(root, columns) {
        this.root = document.querySelector(root);
        this.columns = columns;
        this.maxIndex = this.columns.length;
        this.maxValue = Math.max(...columns);
        this.render();
    }

    toHTML() {
        return createGraph(this.maxIndex, this.maxValue, this.columns);
    }

    render() {
        const html = this.toHTML();
        this.root.innerHTML = html;
    }
}