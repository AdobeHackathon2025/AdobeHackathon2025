import { convertFigmaToExpress } from '../src';

// Example Figma JSON
const figmaJSON = {
  document: {
    children: [
      {
        id: "1",
        type: "FRAME",
        name: "Main Frame",
        absoluteBoundingBox: {
          x: 0,
          y: 0,
          width: 1920,
          height: 1080
        },
        children: [
          {
            id: "2",
            type: "TEXT",
            name: "Title",
            characters: "Hello World",
            style: {
              fontFamily: "Arial",
              fontSize: 24,
              textAlignHorizontal: "LEFT"
            },
            absoluteBoundingBox: {
              x: 100,
              y: 100,
              width: 200,
              height: 50
            }
          }
        ]
      }
    ]
  },
  name: "My Design"
};

try {
  const expressTemplate = convertFigmaToExpress(figmaJSON);
  console.log('Conversion successful:', JSON.stringify(expressTemplate, null, 2));
} catch (error) {
  console.error('Conversion failed:', error);
} 