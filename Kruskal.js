let stepper = false;

function Kruskal() {
    this.walls = [];
    this.cells = [];
    this.permanentWallls = [];
    this.Wall = function (x, y, ex, ey) {
        this.x = x;
        this.y = y;
        this.ex = ex;
        this.ey = ey;
        this.show = () => {
            stroke('black');
            line(this.x, this.y, this.ex, this.ey);
        }
        this.highlight = () => {
            stroke('red');
            line(this.x, this.y, this.ex, this.ey);
        }
        this.remove = () => {
            stroke(255, 204, 0);
            if (this.x === this.ex)
                line(this.x, this.y + 4, this.ex, this.ey - 4);
            else
                line(this.x + 4, this.y, this.ex - 4, this.ey);

        }
        this.returnCells = () => {
            let ret = [];
            let i = this.x / cellSize;
            let j = this.y / cellSize;
            if (i < rows && j < cols) {
                ret.push([i, j]);
            }
            if ((this.x == 0 && this.ex == 0) || (this.x == width && this.ex === width) || (this.y == 0 && this.ey == 0) || (this.y == height && this.ey == height))
                return ret;

            if (this.x == this.ex && (i - 1 >= 0 && j < cols)) {
                ret.push([i - 1, j]);
            } else {
                if (j - 1 >= 0 && i < rows)
                    ret.push([i, j - 1]);
            }
            return ret;
        }
    }
    // Disjoint Set
    this.Cell = function (i, j) {
        this.parent = null; // Store the parent
        this.i = i;
        this.j = j;
        this.no = i * cellSize + j;
        this.childs = [];

        this.join = (cell) => {
            const a = cell.find();
            const b = this.find();
            a.parent = b;
            b.childs.push(a);
        }
        this.find = () => {
            let temp = this;
            while (temp.parent !== null)
                temp = temp.parent;
            return temp;
        }
        this.show = () => {
            noStroke();
            fill(255, 204, 0);
            rect(i * cellSize + 2, j * cellSize + 2, cellSize - 4, cellSize - 4);
        }
        this.full = () => {
            noStroke();
            fill(255, 255, 0);
            rect(i * cellSize + 2, j * cellSize + 2, cellSize - 4, cellSize - 4);
        }
    }
    this.setup = () => {
        // Reset Values
        this.walls = [];
        this.cells = [];
        this.permanentWallls = [];

        for (let i = 0; i < rows; i++) {
            let tmp = [];
            for (let j = 0; j < cols; j++) {
                tmp.push(
                    new this.Cell(i, j)
                );
                let x = i * cellSize;
                let y = j * cellSize;
                let x1 = x + cellSize;
                let y1 = y + cellSize;
                this.walls.push(new this.Wall(x, y, x1, y));
                this.walls.push(new this.Wall(x, y, x, y1));
            }
            this.cells.push(tmp);
        }
        for (let i = 0; i < rows; i++) {
            let x = i * cellSize;
            let y = cols * cellSize;
            let x1 = x + cellSize;
            this.walls.push(new this.Wall(x, y, x1, y));
        }
        for (let j = 0; j < cols; j++) {
            let x = rows * cellSize;
            let y = j * cellSize;
            let y1 = y + cellSize;
            this.walls.push(new this.Wall(x, y, x, y1));
        }
        for (const wall of this.walls) {
            wall.show();
        }
        stepper = true;
    }
    this.loop = () => {
        if (!stepper) return;
        if (this.walls.length === 0) {
            stepper = false;
            this.walls = [];
            background(255, 204, 0);
            for (const w of this.permanentWallls) {
                w.show();
            }
            return true;
        }
        // Choose random Wall
        let r = Math.floor(this.walls.length * Math.random());
        // Return the cells which has common wall
        const neigh = this.walls[r].returnCells();
        let needRemove = false;

        if (neigh.length >= 2) {
            const aPos = neigh[0];
            const a = this.cells[aPos[0]][aPos[1]];
            const bPos = neigh[1];
            const b = this.cells[bPos[0]][bPos[1]];
            a.show();
            b.show();
            if (a.find().no != b.find().no) {
                a.join(b);
                this.walls[r].remove();
                needRemove = true;
            }
        }
        if (!needRemove) {
            this.permanentWallls.push(this.walls[r]);
        }
        this.walls.splice(r, 1);
    }
}