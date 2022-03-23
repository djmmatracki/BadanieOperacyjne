

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function drawPoints(points, start, end) {
    points.forEach((element, i) => {
        const main = document.getElementById("points");
        const point = document.createElement("div");
        point.className = "point"
        point.style.backgroundColor = (i === start) | (i === end) ? "red" : "black";

        point.style.top = `${element[0]}px`;
        point.style.left = `${element[1]}px`;

        main.appendChild(point);
    });
}

const eucDist = (P1, P2) => {
    return Math.sqrt((P1[0] - P2[0])*(P1[0] - P2[0]) + (P1[1] - P2[1])*(P1[1] - P2[1]))
}

const drawLine = (P1, P2, width=2, color="black") => {
    const svg = document.getElementById("svg");

    const line = document.createElementNS('http://www.w3.org/2000/svg', "line");
    line.style=`stroke:${color};stroke-width:${width}`

    line.setAttribute('x1', `${P1[1]+10}px`)
    line.setAttribute('y1', `${P1[0]+10}px`)

    line.setAttribute('x2', `${P2[1]+10}px`)
    line.setAttribute('y2', `${P2[0]+10}px`)

    svg.appendChild(line);

}

const fillMatrix = (n, screenWidth) => {
    let M = [];
    let points = [];
    let usedPoints = [];

    for (let i = 0; i < n; ++i){
        for (let j = 0; j < n; ++j) {
            points.push([i*80, j*(1/7)*screenWidth]); // Tworze wsporzedne punktow
        }
    }


    for (let i = 0; i < n*n; ++i){
        M.push([]);
        for (let j = 0; j < n*n; ++j) {
            M[i].push(0);
        }
    }

    for (let i = 0; i < n*n; ++i) {
        if (i + 1 < n*n & ((i+1)%n !== 0)) {
            if (!usedPoints.includes(i) | !usedPoints.includes(i+1)) {
                M[i][i+1] = eucDist(points[i], points[i+1]);
                M[i+1][i] = M[i][i+1];
                drawLine(points[i], points[i+1]);

                usedPoints.push(i);
                usedPoints.push(i+1);

            } else if (getRandomInt(0, 10) < 2) {
                M[i][i+1] = eucDist(points[i], points[i+1]);
                M[i+1][i] = M[i][i+1];
                drawLine(points[i], points[i+1]);
            }
        }

        if (i + n < n*n ) {
            if (!usedPoints.includes(i) | !usedPoints.includes(i+n)) {
                M[i][i+n] = eucDist(points[i], points[i+n]);
                M[i+n][i] = M[i][i+n];
                drawLine(points[i], points[i+n]);

                usedPoints.push(i);
                usedPoints.push(i+n);

            } else if (getRandomInt(0, 10) < 5) {
                M[i][i+n] = eucDist(points[i], points[i+n]);
                M[i+n][i] = M[i][i+n];
                drawLine(points[i], points[i+n]);
            }
        }
    }


    return [M, points];
}

class PriorityQueue {
    constructor() {
      this.queue = [];
    }

    enqueue(val, priority) {
      this.queue.push([val, priority]);
      this.queue.sort((a, b) => a[1] < b[1]);
    }

    dequeue() {
        return this.queue.pop()[0];
    }

    is_empty() {
        return this.queue.length === 0;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function a_star_algo(M, start, end, points) {
    const N = M.length;
    let queue = new PriorityQueue();
    queue.enqueue(start, 0)

    let prevVertex = [];
    let shortestDistList = [];

    for (let index = 0; index < N; index++) {
        prevVertex.push(0)
        shortestDistList.push(Infinity);
    }

    shortestDistList[start] = 0;
    prevVertex[start] = start;


    while (!queue.is_empty()) {
        current = queue.dequeue();
        drawLine(points[current], points[prevVertex[current]], 4, "blue");
        await sleep(500);

        if (current === end) {
            break;
        }

        for (let i=0; i < N; ++i) {
            if (M[current][i] > 0) {
                const new_cost = shortestDistList[current] + M[current][i];

                if (new_cost < shortestDistList[i]) {
                    shortestDistList[i] = new_cost;
                    priority = new_cost + M[i][end];
                    queue.enqueue(i, priority);
                    prevVertex[i] = current;
                }
            }
        }
    }

    let res = [];
    let i = start;
    let j = end;

    while (i != j) {
        res.push([prevVertex[j], j]);
        j = prevVertex[j];
    }
    return res;
}

const drawPath = (points, path) => {
    path.forEach((element) => {
        const svg = document.getElementById("svg");

        const P1 = points[element[0]];
        const P2 = points[element[1]];

        const line = document.createElementNS('http://www.w3.org/2000/svg', "line");
        // line.className = "line"
        line.style="stroke:rgb(255,0,0);stroke-width:5" 

        line.setAttribute('x1', `${P1[1]+10}px`)
        line.setAttribute('y1', `${P1[0]+10}px`)

        line.setAttribute('x2', `${P2[1]+10}px`)
        line.setAttribute('y2', `${P2[0]+10}px`)

        svg.appendChild(line);
    })
}

const resetImage = () => {
    const points = document.getElementById("points");
    points.innerHTML = "";

    const svg = document.getElementById("svg");
    svg.innerHTML = "";
}

let ended = true;

function main() {
    if (ended) {
        resetImage();
        const start = getRandomInt(0, 48);
        const end = getRandomInt(0, 48);
        
        const [M, points] = fillMatrix(7, window.screen.width);
        drawPoints(points, start, end);

        ended = false;
        a_star_algo(M, start, end, points).then((path) => {
            drawPath(points, path);
            ended = true;
        });
    }
}
