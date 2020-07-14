export const hitTestRectangle = (objectA, objectB) => {
  return (
    objectA.x + objectA.width > objectB.x &&
    objectA.x < objectB.x + objectB.width &&
    objectA.y + objectA.height > objectB.y &&
    objectA.y < objectB.y + objectB.height
  );
};
