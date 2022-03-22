

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function createPoints(number) {
    let points = [];
    for (let i=0; i <= number; ++i) {
        points.push([getRandomInt(0, 300), getRandomInt(0, 100)])
    }
    return points;
}


function dijkstra(M, start, end) {
    const N = M.length;
    let shortestDistList = [];
    shortestDistList.fill(Infinity, 0, N-1);

    let prevVertex = [];
    prevVertex.fill(0, 0, N-1);

    let visited = [];
    let current = start;

    while (visited.length < N) {
        visited.push(current);
        minimalNode = current;
        minimal = Infinity;

        for (let i=0; i < N; ++i) {
            if ((M[current][i] > 0) & (!visited.includes(i))) {
                if (shortestDistList[current] + M[current][i] < shortestDistList[i]) {
                    shortestDistList[i] = shortestDistList[current] + M[current][i];
                    prevVertex[i] = current + 1;
                }

                if (minimal > M[current][i]) {
                    minimalNode = i;
                    minimal = M[current][i];
                }
            }
        }
        current = minimalNode
    }

    let res = [];
    let i = start;
    let j = end;

    while (i != j) {
        res.push((prevVertex[j], j));
        j = prevVertex[j];
    }
    return res;
}


function addPoints(points) {
    points.forEach(element => {
        var c = document.getElementById("main");
        var ctx = c.getContext("2d");

        ctx.beginPath();
        ctx.arc(element[0], element[1], 1, 0, 2 * Math.PI);
        ctx.stroke();
    });
}

const eucDist = (P1, P2) => {
    return Math.sqrt((P1[0] - P2[0])*(P1[0] - P2[0]) + (P1[1] - P2[1])*(P1[1] - P2[1]))
}

const fillMatrix = (points) => {
    let M = [];
    const n = points.length;


    for (let i = 0; i < n; ++i){
        M.push([])
        for (let j = 0; j < n; ++j) {
            M[i].push(0);
        }
    }

    for (let i = 0; i < n; ++i){
        for (let j = 0; j < n; ++j) {
            M[i][j] = eucDist(points[i], points[j]);
        }
    }

    return M;
}

function drawLine(P1, P2) {
    const canvas = document.getElementById('main');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(P1[0], P1[1]);
    ctx.lineTo(P2[0], P2[1]);
    ctx.stroke();
  }


function main() {
    const n = 10;
    const points = createPoints(n);

    addPoints(points);
    const M = fillMatrix(points);
    // drawLine([0, 0], [100, 100]);
    console.log(dijkstra(M, 0, 5));
}

main()