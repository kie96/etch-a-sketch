let DEFAULT_DIMENSIONS = 16;

/* resetGrid
 * @param dims - the dimensions of the grid
 *
 * Structures the Grid using the dimensions provided as a parameter
 * Creates each grid block and then adds the "gridBlock" class which handle all
 * of the static styling attributes.
 */
function resetGrid(dims) {
    const grid = document.querySelector("#grid");

    grid.style.clear = "both";
    grid.style.textAlign = "center";
    grid.style.display = "inline-block";
    let gridRow = {}; // Each element in this list will represent one grid block
    let sides = 1000 / dims;
    for (let i = 0; i < dims; i++) {
        let divRow = document.createElement("div");
        divRow.id = "divRow" + i;
        divRow.style.margin = "0px";
        divRow.style.padding = "0px";
        divRow.style.clear = "both";
        for (let j = 0; j < dims; j++) {
            gridRow[j] = document.createElement("div");
            gridRow[j].id = "blk" + j;
            gridRow[j].style.height = sides + "px";
            gridRow[j].style.width = sides + "px";
            // .gridBlock contains all of the static styles for each block
            gridRow[j].classList.add("gridBlock");
            gridRow[j].addEventListener("mouseover", hoverGridBlock);

            divRow.appendChild(gridRow[j]);
        }
        grid.appendChild(divRow);
    }
}

/* resetDims
 * @param e - the event that was triggered
 *
 * Prompts the user for a new value for the dimensions of the grid, then
 * deletes the old grid invoking resetGrid to replace it with a new one, using
 * the aformentioned new dimensions.
 */
function resetDims(e) {
    const oldGrid = document.querySelector("#grid");

    let newDim = prompt("How many blocks per side of the grid?", DEFAULT_DIMENSIONS);

    // Deletes each grid row that was dyncamically created in resetGrid
    // grid.firstElementChild could have also been used.
    var child = oldGrid.lastElementChild;
    while (child) {
        oldGrid.removeChild(child);
        child = oldGrid.lastElementChild;
    }

    resetGrid(newDim);
}

/* hoverGrid
 * @param e - the event that was triggered
 *
 * When the user hovers over a specifc grid block, that block is assigned one of
 * four classes which will determine its hue. Each time a block is hovered over,
 * its hue level wil raise from starting from 1 and progressing until its
 * reached its max hue level (in this case, the max hue level is 4).
 */
function hoverGridBlock(e) {
    console.log(e.target.className);
    // Check to see if the grid block has already been assigned a hue class
    if (e.target.className.split(" ").length == 2) {

        // Check to see if the grid block is already at the max hue
        if (e.target.className.split(" ")[1] != "hue_4") {
            // store the current hue class (second class in the class list)
            let currentHueClass = e.target.className.split(" ")[1];

            // Increment the hue class level
            e.target.classList.remove(currentHueClass);

            // Replace the current hue class with the next hue class
            let nextHue = Number(currentHueClass.split("_")[1]) + 1;
            e.target.classList.add(currentHueClass.slice(0, -1) + nextHue);
        }
    } else {
        e.target.classList.add("hue_0");
    }
}

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener("click", resetDims);

// querySelectorAll will return a nodelist with every gridBlock
const gridBlocks = document.querySelectorAll('.gridBlock');

// Starts the Application
resetGrid(DEFAULT_DIMENSIONS);
