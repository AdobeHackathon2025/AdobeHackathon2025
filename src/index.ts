export * from './types';
export { FigmaParser } from './parsers/figmaParser';
export { ExpressConverter } from './converters/expressConverter';
export { AIEnhancer } from './enhancers/aiEnhancer';

// Main converter function
import { FigmaParser } from './parsers/figmaParser';
import { ExpressConverter } from './converters/expressConverter';
import { AIEnhancer } from './enhancers/aiEnhancer';
import { FigmaFile, ExpressTemplate } from './types';

export function convertFigmaToExpress(figmaJSON: string | object): ExpressTemplate {
  try {
    const parser = new FigmaParser();
    const converter = new ExpressConverter();
    const enhancer = new AIEnhancer();

    // Parse and validate Figma JSON
    const parsedFigma = parser.parseFigmaJSON(figmaJSON);

    // Convert to Express format
    const expressTemplate = converter.convertToExpressTemplate(parsedFigma);

    // Apply AI enhancements
    const enhancedTemplate = enhancer.applyEnhancements(expressTemplate);

    return enhancedTemplate;
  } catch (error) {
    console.error('Error in Figma to Express conversion:', error);
    throw error;
  }
} 