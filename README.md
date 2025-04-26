# Figma to Adobe Express Converter

A TypeScript module that converts Figma design files to Adobe Express format with AI-powered enhancements.

## Features

- Parses Figma File JSON (nodes, frames, texts, vectors)
- Classifies node types (TEXT, RECTANGLE, IMAGE, FRAME)
- Converts to Adobe Express JSON format
- Applies AI enhancements:
  - Adjusts font sizes for better readability
  - Suggests improved color palettes for better contrast
  - Fixes inconsistent text styles
- Handles partial/broken Figma JSON gracefully
- Modular architecture for easy extension

## Installation

```bash
npm install figma-to-express
```

## Usage

```typescript
import { convertFigmaToExpress } from 'figma-to-express';

// Convert Figma JSON to Adobe Express format
const figmaJSON = {
  // Your Figma JSON here
};

try {
  const expressTemplate = convertFigmaToExpress(figmaJSON);
  console.log('Conversion successful:', expressTemplate);
} catch (error) {
  console.error('Conversion failed:', error);
}
```

## API Reference

### Main Function

#### `convertFigmaToExpress(figmaJSON: string | object): ExpressTemplate`

Converts a Figma design file to Adobe Express format with AI enhancements.

### Classes

#### `FigmaParser`
- `parseFigmaJSON(input: string | object): FigmaFile`
- `classifyNode(node: FigmaNode): string`
- `extractStyles(node: FigmaNode)`

#### `ExpressConverter`
- `convertToExpressTemplate(figmaFile: FigmaFile): ExpressTemplate`
- `mapNodeToExpressElement(node: FigmaNode): ExpressElement`

#### `AIEnhancer`
- `applyEnhancements(template: ExpressTemplate): ExpressTemplate`
- Includes color contrast, layout, and style consistency improvements

## AI Enhancements

1. **Color Contrast**
   - Analyzes text and background color combinations
   - Suggests improvements based on WCAG AA standards
   - Maintains design aesthetics while improving readability

2. **Layout Optimization**
   - Adjusts font sizes based on container dimensions
   - Maintains proper padding and spacing
   - Prevents text overflow

3. **Style Consistency**
   - Identifies and normalizes inconsistent font styles
   - Suggests common text styles for better design coherence
   - Preserves intentional style variations

## Error Handling

The module includes robust error handling:
- Validates input JSON structure
- Provides fallbacks for missing properties
- Returns meaningful error messages
- Maintains partial conversion results when possible

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## License

MIT
