// Rectangle

function perimeterRectangle(sideA, sideB) {
  const perimeter = 2 * (sideA + sideB);

  return perimeter;
}

function areaRectangle(sideA, sideB) {
  const area = sideA * sideB;

  return area;
}

//Triangle

function perimeterTriangle(sideA, sideB, sideC) {
  const perimeter = sideA + sideB + sideC;

  return perimeter;
}

function areaTriangle(sideA, sideB, sideC) {
  const perimeter = perimeterTriangle(sideA, sideB, sideC);
  const p = perimeter / 2;
  const area = Math.sqrt(p * ((p - sideA) * (p - sideB) * (p - sideC)));

  return area;
}

// Circle

function perimeterCircle(radius) {
  const perimeter = 2 * Math.PI * radius;

  return perimeter;
}

function areaCircle(radius) {
  const area = Math.PI * (radius * radius);

  return area;
}
