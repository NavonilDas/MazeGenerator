function Prims() {
    this.cells = [];
    this.frontier = [];
    this.current = null;

    this.Cell = function (i, j) {
        this.i = i;
        this.j = j;
        this.type = 0; // 0 Blocked 1 Open
        this.show = () => {
            const x = this.i * cellSize;
            const y = this.j * cellSize;
            noStroke();
            if (this.type === 0) {
                fill(0);
                rect(x, y, cellSize, cellSize);
            } else {
                fill(255);
                rect(x, y, cellSize, cellSize);
            }

        }
        this.highlight = () => {
            const x = this.i * cellSize;
            const y = this.j * cellSize;
            noStroke();
            fill(120);
            rect(x, y, cellSize, cellSize);
        }
    }

    this.getNeighbours = (cell) => {
        let i = cell.i;
        let j = cell.j;
        let neigh = [];
        if (i - 2 > 0 && this.cells[i - 2][j].type !== 0) {
            neigh.push(this.cells[i - 2][j]);
        }
        if (i + 2 < (rows - 1) && this.cells[i + 2][j].type !== 0) {
            neigh.push(this.cells[i + 2][j]);
        }
        if (j - 2 > 0 && this.cells[i][j - 2].type !== 0) {
            neigh.push(this.cells[i][j - 2]);
        }
        if (j + 2 < (cols - 1) && this.cells[i][j + 2].type !== 0) {
            neigh.push(this.cells[i][j + 2]);
        }
        // if (neigh.length === 0)
        //     return undefined;
        return neigh;//[Math.floor(neigh.length * Math.random())];
    }
    this.getFrontier = (cell) => {
        let i = cell.i;
        let j = cell.j;
        let neigh = [];
        if (i - 2 > 0 && this.cells[i - 2][j].type === 0) {
            neigh.push(this.cells[i - 2][j]);
        }
        if (i + 2 < (rows - 1) && this.cells[i + 2][j].type === 0) {
            neigh.push(this.cells[i + 2][j]);
        }
        if (j - 2 > 0 && this.cells[i][j - 2].type === 0) {
            neigh.push(this.cells[i][j - 2]);
        }
        if (j + 2 < (cols - 1) && this.cells[i][j + 2].type == 0) {
            neigh.push(this.cells[i][j + 2]);
        }
        // if (neigh.length === 0)
        //     return undefined;
        return neigh;//[Math.floor(neigh.length * Math.random())];
    }
    this.setup = function () {
        cellSize /= 2;
        rows = 2 * rows;
        cols = 2 * cols;

        for (let i = 0; i < rows; ++i) {
            let tmp = [];
            for (let j = 0; j < cols; ++j) {
                tmp.push(
                    new this.Cell(i, j, cellSize)
                );
            }
            this.cells.push(tmp);
        }

        for (const row of this.cells) {
            for (const cell of row) {
                cell.show();
            }
        }

        let i = Math.floor(rows * Math.random());
        let j = Math.floor(cols * Math.random());
        const neigh = this.getFrontier(this.cells[i][j]);
        this.cells[i][j].type = 1;
        this.cells[i][j].show();
        this.current = this.cells[i][j];
        for (const n of neigh) {
            this.frontier.push(n);
            n.highlight();
        }
    }
    this.join = (cella, cellb) => {
        let ni = cella.i;
        let nj = cella.j;
        let i = cellb.i;
        let j = cellb.j;
        if ((ni - i) === -2) {
            // left
            // console.log(this.cell)
            this.cells[i - 1][j].type = 1;
            this.cells[i - 1][j].show();
        }
        if ((ni - i) === 2) {
            //right
            this.cells[i + 1][j].type = 1;
            this.cells[i + 1][j].show();
        }
        if ((nj - j) === -2) {
            // Top
            this.cells[i][j - 1].type = 1;
            this.cells[i][j - 1].show();
        }
        if ((nj - j) === 2) {
            // Bottom
            this.cells[i][j + 1].type = 1;
            this.cells[i][j + 1].show();
        }
    }
    this.loop = function () {
        if (this.frontier.length == 0) return;
        let r = floor(this.frontier.length * random());
        const cell = this.frontier[r];
        cell.type = 1;
        cell.show();
        // Calculate Neighbour
        let neigh = this.getNeighbours(cell);
        // Pick Random Neignbout
        const rne = neigh.length > 0 ? neigh[floor(neigh.length * random())] : null;
        // Connect the rne and the frontier ce;;
        if (rne)
            this.join(cell, rne);

        neigh = this.getFrontier(cell);

        this.frontier.splice(r, 1);
        // TODO Draw Passage
        for (const n of neigh) {
            this.frontier.push(n);
            n.highlight();
        }
        // this.current = cell;
    }
}