import { createFunctionBar } from "../../utils";

function createIndexBar(index) {
    return `<div class="index-char">${index}</div>`
}

function createElementBar(elem) {
    return `<div class="elem-char">${elem}</div>`
}

function createColumn(value) {
    const color = value < 6 ? "green"
        : value < 11 ? "yellow"
            : "red";

    return `<div
     class="graph__column"
     style="
        height: ${value * 40}px;
        background: ${color}
     "
     title="${value.toString()}"
     ></div>`
}

export function createGraph(index, value, columns) {
    const indexes = createFunctionBar(index, createIndexBar).join('');
    const values = createFunctionBar(value, createElementBar).reverse().join('');
    const columnsHTML = columns
        .map(createColumn)
        .join('');

    return `
		<div class="graph" style="min-height: ${value * 40}px">
			<div class="elements-bar">
                ${values}
			</div>
			
            ${columnsHTML}

            <div class="index-bar">
				${indexes}
            </div>
		</div>
	`
}