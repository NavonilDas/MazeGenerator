function HuntAndKill() {
    this.cells = [];
    this.current = null;
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
        this.high = () => {
            let x = this.i * this.cellSize;
            let y = this.j * this.cellSize;
            fill(255, 204, 0);
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
            this.high();
            cell.clear();
        }
    }
    this.getVisitedNeigbour = (cell) => {
        let i = cell.i;
        let j = cell.j;
        let neigh = [];
        if (i - 1 >= 0 && this.cells[i - 1][j].visited) {
            neigh.push(this.cells[i - 1][j]);
        }
        if (i + 1 < rows && this.cells[i + 1][j].visited) {
            neigh.push(this.cells[i + 1][j]);
        }
        if (j - 1 >= 0 && this.cells[i][j - 1].visited) {
            neigh.push(this.cells[i][j - 1]);
        }
        if (j + 1 < cols && this.cells[i][j + 1].visited) {
            neigh.push(this.cells[i][j + 1]);
        }
        return neigh;
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
    }
    this.hunt = () => {
        for (let i = 0; i < cols; ++i) {
            for (let j = 0; j < rows; ++j) {
                if (!this.cells[j][i].visited) {
                    const ne = this.getVisitedNeigbour(this.cells[j][i]);
                    if (ne.length > 0) return [
                        this.cells[j][i],
                        ne[floor(ne.length * random())]
                    ];
                }
            }
        }
        return null;
    }

    this.loop = () => {
        if (this.current) {
            const cell = this.current;
            cell.visited = true;
            const ne = this.getNeighbours(cell);
            if (ne) {
                cell.removeWall(ne);
                this.current = ne;
            } else {
                // Go to Hunt Mode
                this.current.high();
                const tmp = this.hunt();
                if (tmp) {
                    this.current = tmp[0];
                    this.current.removeWall(tmp[1]);
                    tmp[1].high();
                } else {
                    this.current = null;
                    background(255);
                    for (const row of this.cells) {
                        for (const cell of row) {
                            cell.show();
                        }
                    }
                }
                // if (this.current === null) {
                // }
            }
        }
    }
}