import { convertFigmaToExpress } from '../src';

// Example Figma JSON with various node types and styles
const figmaJSON = {
  document: {
    children: [
      {
        id: "1",
        type: "FRAME",
        name: "Landing Page",
        absoluteBoundingBox: {
          x: 0,
          y: 0,
          width: 1440,
          height: 900
        },
        fills: [
          {
            type: "SOLID",
            color: { r: 1, g: 1, b: 1, a: 1 },
            opacity: 1
          }
        ],
        children: [
          // Header Section
          {
            id: "2",
            type: "FRAME",
            name: "Header",
            absoluteBoundingBox: {
              x: 0,
              y: 0,
              width: 1440,
              height: 80
            },
            fills: [
              {
                type: "SOLID",
                color: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
                opacity: 1
              }
            ],
            children: [
              {
                id: "3",
                type: "TEXT",
                name: "Logo",
                characters: "Brand",
                style: {
                  fontFamily: "Inter",
                  fontSize: 32,
                  fontWeight: 700,
                  textAlignHorizontal: "LEFT",
                  letterSpacing: -0.5,
                  lineHeightPx: 40
                },
                absoluteBoundingBox: {
                  x: 40,
                  y: 20,
                  width: 120,
                  height: 40
                }
              }
            ]
          },
          // Hero Section
          {
            id: "4",
            type: "FRAME",
            name: "Hero",
            absoluteBoundingBox: {
              x: 0,
              y: 80,
              width: 1440,
              height: 600
            },
            fills: [
              {
                type: "SOLID",
                color: { r: 0.95, g: 0.97, b: 1, a: 1 },
                opacity: 1
              }
            ],
            children: [
              {
                id: "5",
                type: "TEXT",
                name: "Headline",
                characters: "Welcome to Our Platform",
                style: {
                  fontFamily: "Inter",
                  fontSize: 64,
                  fontWeight: 800,
                  textAlignHorizontal: "CENTER",
                  letterSpacing: -1,
                  lineHeightPx: 76
                },
                absoluteBoundingBox: {
                  x: 320,
                  y: 160,
                  width: 800,
                  height: 80
                }
              },
              {
                id: "6",
                type: "RECTANGLE",
                name: "CTA Button",
                absoluteBoundingBox: {
                  x: 620,
                  y: 480,
                  width: 200,
                  height: 56
                },
                fills: [
                  {
                    type: "SOLID",
                    color: { r: 0, g: 0.4, b: 1, a: 1 },
                    opacity: 1
                  }
                ],
                strokes: [
                  {
                    color: { r: 0, g: 0.3, b: 0.8, a: 1 },
                    weight: 1
                  }
                ],
                effects: [
                  {
                    type: "DROP_SHADOW",
                    value: {
                      color: { r: 0, g: 0, b: 0, a: 0.1 },
                      offset: { x: 0, y: 4 },
                      radius: 8,
                      spread: 0
                    }
                  }
                ]
              },
              {
                id: "7",
                type: "TEXT",
                name: "Button Text",
                characters: "Get Started",
                style: {
                  fontFamily: "Inter",
                  fontSize: 18,
                  fontWeight: 600,
                  textAlignHorizontal: "CENTER",
                  letterSpacing: 0,
                  lineHeightPx: 24
                },
                absoluteBoundingBox: {
                  x: 620,
                  y: 496,
                  width: 200,
                  height: 24
                }
              },
              {
                id: "8",
                type: "VECTOR",
                name: "Decorative Shape",
                absoluteBoundingBox: {
                  x: 1200,
                  y: 100,
                  width: 200,
                  height: 200
                },
                fills: [
                  {
                    type: "GRADIENT_LINEAR",
                    gradientStops: [
                      { position: 0, color: { r: 1, g: 0.4, b: 0.8, a: 1 } },
                      { position: 1, color: { r: 0.4, g: 0.2, b: 1, a: 1 } }
                    ],
                    opacity: 0.8
                  }
                ]
              }
            ]
          },
          // Feature Section
          {
            id: "9",
            type: "FRAME",
            name: "Features",
            absoluteBoundingBox: {
              x: 0,
              y: 680,
              width: 1440,
              height: 220
            },
            fills: [
              {
                type: "SOLID",
                color: { r: 1, g: 1, b: 1, a: 1 },
                opacity: 1
              }
            ],
            effects: [
              {
                type: "INNER_SHADOW",
                value: {
                  color: { r: 0, g: 0, b: 0, a: 0.05 },
                  offset: { x: 0, y: -2 },
                  radius: 4,
                  spread: 0
                }
              }
            ]
          }
        ]
      }
    ]
  },
  name: "Modern Landing Page"
};

try {
  const expressTemplate = convertFigmaToExpress(figmaJSON);
  console.log('Conversion successful:', JSON.stringify(expressTemplate, null, 2));
} catch (error) {
  console.error('Conversion failed:', error);
} 