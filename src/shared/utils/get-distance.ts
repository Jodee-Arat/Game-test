type Coords = { coords: { x: number; y: number } };

export default function getDistance<T extends Coords, S extends Coords>(
  firstObject: T,
  secondObject: S
) {
  const { x: firstX, y: firstY } = firstObject.coords;
  const { x: secondX, y: secondY } = secondObject.coords;
  const dx = firstX - secondX;
  const dy = firstY - secondY;
  return Math.sqrt(dx * dx + dy * dy);
}
