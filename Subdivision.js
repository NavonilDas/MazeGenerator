function Subdivision() {
    this.stack = [];
    this.setup = () => {
        // this.subdivide(0, 0, rows, cols);
        this.stack.push([0, 0, rows, cols]);
    }
    this.rand = (min, max) => {
        return floor((max - min) * random() + min)
    }
    this.subdivide = (si, sj, ei, ej) => {
        // console.log([si, ei], [sj, ej])
        if (si < (ei - 1) && sj < (ej - 1)) {
            let ri = floor((si + ei) / 2);
            let rj = floor((sj + ej) / 2);
            // let ri = this.rand(si, ei);
            // let rj = this.rand(sj, ej);

            // A
            line(si * cellSize, rj * cellSize, ri * cellSize, rj * cellSize);
            // B
            line(ri * cellSize, rj * cellSize, ei * cellSize, rj * cellSize);
            // C
            line(ri * cellSize, sj * cellSize, ri * cellSize, rj * cellSize);
            // D
            line(ri * cellSize, rj * cellSize, ri * cellSize, ej * cellSize);

            // 2nd Quad
            // if (si < (ri - 1) && sj < (rj - 1))
            this.subdivide(si, sj, ri, rj);

            // 1st Quad
            // if (ri < (ei - 1) && sj < (rj - 1))
            this.subdivide(ri, sj, ei, rj);

            // 3rd quad
            // if (si < (ri - 1) && rj < (ej - 1))
            this.subdivide(si, rj, ri, ej);

            // 4th quad
            // if (ri < (ei - 1) && rj < (ej - 1))
            this.subdivide(ri, rj, ei, ej);
            // this.subdivide(ri, rj, ei, ej);
            // console.log(ri, rj, ei, ej);
            // this.subdivide(ri, sj, ei, rj);
            // this.subdivide(si, rj, ei, rj);

            // si,rj,si,rj
            // 
            // line(si*cellSize,sj*cellSize,)            
            // console.log();
            // console.log();

        } else return;
    }
    this.drawline = (si, sj, ri, rj) => {
        let xi = this.rand(si, ri) * cellSize;
        let yi = this.rand(sj, rj) * cellSize;
        let ex = xi + cellSize;
        // let ey = yi + cellSize;
        line(si * cellSize, sj * cellSize, ri * cellSize, rj * cellSize);
        stroke(255);
        line(xi, yi, ex, yi);
        stroke(0);
    }
    this.loop = () => {
        if (this.stack.length === 0) return;
        const p = this.stack.pop();
        console.log(p);
        let si = p[0];
        let sj = p[1];
        let ei = p[2];
        let ej = p[3];
        let ri = floor((si + ei) / 2);
        let rj = floor((sj + ej) / 2);
        // let ri = this.rand(si, ei);
        // let rj = this.rand(sj, ej);

        if (!((ei - si) > 1 && (ej - sj) >= 1)) return;
        // if (si == ri || sj == rj || ei == ri || ej == rj) return;
        // A
        this.drawline(si, rj, ri, rj);
        // line(si * cellSize, rj * cellSize, ri * cellSize, rj * cellSize);

        // B
        // line(ri * cellSize, rj * cellSize, ei * cellSize, rj * cellSize);
        this.drawline(ri, rj, ei, rj);
        // C
        this.drawline(ri, sj, ri, rj);
        // line(ri * cellSize, sj * cellSize, ri * cellSize, rj * cellSize);
        // D
        line(ri * cellSize, rj * cellSize, ri * cellSize, ej * cellSize);


        // 2nd Quad
        if ((ri - si) > 1 && (rj - sj) > 1)
            this.stack.push([si, sj, ri, rj]);

        // 1st Quad
        if ((ei - ri) > 1 && (rj - sj) > 1)
            this.stack.push([ri, sj, ei, rj]);

        // 3rd quad
        if ((ej - rj) > 1 && (ri - si) > 1)
            this.stack.push([si, rj, ri, ej]);

        // 4th quad
        if ((ej - rj) > 1 && (ei - ri) > 1)
            this.stack.push([ri, rj, ei, ej]);

    }
}