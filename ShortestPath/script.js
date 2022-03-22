

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function createPoints(number) {
    let points = [];
    for (let i=0; i <= number; ++i) {
        points.push([getRandomInt(0, 900), getRandomInt(0, 700)])
    }
    return points;
}


function dijkstra(start, end) {

}


function addPoints(points) {
    points.forEach(element => {
        const point = document.createElement('div');
        point.className = 'point';
        point.style.left = `${element[0]}px`;
        point.style.top = `${element[1]}px`;

        document.getElementById('main').appendChild(point);
    });
}

const eucDist = (P1, P2) => {
    return Math.sqrt((P1[0] - P2[0])*(P1[0] - P2[0]) + (P1[1] - P2[1])*(P1[1] - P2[1]))
}

const fillMatrix = (points) => {
    let M = [];
    M.fill([], n);
    M.forEach(element => {
        element.fill(0, n);
    });


    for (let i = 0; i < n; ++i){
        for (let j = 0; j < n; ++j) {
            M[i][j] = eucDist(points[i], points[j]);
        }
    }

    return M;
}

function dijkstra() {
    return path;
}

function drawLine(P1, P2) {

    const line = document.createElement('div');
    const angle = Math.atan2(P2[1] - P1[1], P2[0] - P1[0]) * 180 / Math.PI;
    const distance = eucDist(P1, P2);

    // if(pointB.left < pointA.left) {
    //     $(line).offset({top: pointA.top + pointAcenterY, left: pointB.left + pointBcenterX});
    //   } else {
    //     $(line).offset({top: pointA.top + pointAcenterY, left: pointA.left + pointAcenterX});

    // Set Angle
    line.style.transform = 'rotate(' + angle + 'deg)'
    line.className = "line";
  
    // Set Width
    line.style.width = distance + 'px'
    line.style.height = '10px'
                    
    // Set Position
    line.style.position = "absolute"
    line.style.backgroundColor = "black"

    line.style.top = `${(distance / 2) * Math.sin((Math.PI * angle) / 180)}px`;
    line.style.left = `${(distance / 2) * Math.cos((Math.PI * angle) / 180)}px`;
    
    document.getElementById('main').appendChild(line);
  }


function main() {
    // const n = 10;
    // const points = createPoints(n);

    // addPoints(points);
    // const M = fillMatrix(points);

    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${0}px`;
    point.style.top = `${0}px`;

    const point2 = document.createElement('div');
    point2.className = 'point';
    point2.style.left = `${500}px`;
    point2.style.top = `${500}px`;

    document.getElementById('main').appendChild(point);
    document.getElementById('main').appendChild(point2);
    drawLine([0, 0], [500, 500])
}

main()