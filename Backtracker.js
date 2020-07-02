function Backtracker() {
    this.cells = [];
    this.stack = [];
    this.current = null;
    this.done = false;

    this.Cell = function (i, j, csize) {
        this.i = i;
        this.j = j;
        this.cellSize = csize;
        this.visited = false;
        this.walls = {
            top: true,
            bottom: true,
            left: true,
            right: true
        };
        this.show = () => {
            let x = this.i * this.cellSize;
            let y = this.j * this.cellSize;
            let ex = x + this.cellSize;
            let ey = y + this.cellSize;
            stroke(0);
            if (this.walls.top) {
                line(x, y, ex, y);
            }
            if (this.walls.right) {
                line(ex, y, ex, ey);
            }
            if (this.walls.bottom) {
                line(x, ey, ex, ey);
            }
            if (this.walls.left) {
                line(x, y, x, ey);
            }
        }
        this.clear = () => {
            let x = this.i * this.cellSize;
            let y = this.j * this.cellSize;
            fill(101);
            noStroke();
            rect(x - 2, y - 2, this.cellSize + 4, this.cellSize + 4);
            this.show();
        }

        this.removeWall = (cell) => {
            let ni = cell.i;
            let nj = cell.j;
            if ((ni - this.i) === -1) {
                // left
                this.walls.left = false;
                cell.walls.right = false;
            }
            if ((ni - this.i) === 1) {
                //right
                this.walls.right = false;
                cell.walls.left = false;
            }
            if ((nj - this.j) === -1) {
                // Top
                this.walls.top = false;
                cell.walls.bottom = false;
            }
            if ((nj - this.j) === 1) {
                // Bottom
                this.walls.bottom = false;
                cell.walls.top = false;
            }
            this.clear();
            cell.clear();
        }
    }
    this.getNeighbours = (cell) => {
        let i = cell.i;
        let j = cell.j;
        let neigh = [];
        if (i - 1 >= 0 && !this.cells[i - 1][j].visited) {
            neigh.push(this.cells[i - 1][j]);
        }
        if (i + 1 < rows && !this.cells[i + 1][j].visited) {
            neigh.push(this.cells[i + 1][j]);
        }
        if (j - 1 >= 0 && !this.cells[i][j - 1].visited) {
            neigh.push(this.cells[i][j - 1]);
        }
        if (j + 1 < cols && !this.cells[i][j + 1].visited) {
            neigh.push(this.cells[i][j + 1]);
        }
        if (neigh.length === 0)
            return undefined;
        return neigh[Math.floor(neigh.length * Math.random())];
    }
    this.setup = () => {
        this.cells = [];
        this.stack = [];
        this.current = null;
        this.done = false;

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
        this.current = this.cells[i][j];
        this.current.visited = true;
    }

    this.loop = () => {
        if(this.done) return;
        const cell = this.current;
        const ne = this.getNeighbours(cell);
        if (ne) {
            cell.removeWall(ne);
            ne.visited = true;
            this.stack.push(this.current);
            this.current = ne;
        } else {
            if (this.stack.length > 0)
                this.current = this.stack.pop();
            else {
                this.done = true;
            }
        }
    }
}