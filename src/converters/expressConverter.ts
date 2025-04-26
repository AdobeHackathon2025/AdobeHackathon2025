import { FigmaNode, ExpressElement, ExpressTemplate, FigmaFile } from '../types';
import { FigmaParser } from '../parsers/figmaParser';

export class ExpressConverter {
  private parser: FigmaParser;

  constructor() {
    this.parser = new FigmaParser();
  }

  private mapNodeToExpressElement(node: FigmaNode): ExpressElement {
    const nodeType = this.parser.classifyNode(node);
    const styles = this.parser.extractStyles(node);

    const element: ExpressElement = {
      id: node.id,
      type: nodeType.toLowerCase() as 'text' | 'image' | 'shape' | 'frame',
      style: {
        position: styles.position || {
          x: 0,
          y: 0,
          width: 100,
          height: 100
        }
      }
    };

    // Add type-specific properties
    if (nodeType === 'TEXT' && node.characters) {
      element.content = node.characters;
      element.style.font = styles.font;
    }

    if (styles.fills?.length > 0) {
      element.style.fill = styles.fills;
    }

    // Handle strokes safely
    const strokes = node.strokes;
    if (strokes && strokes.length > 0) {
      element.style.stroke = strokes.map(stroke => ({
        color: stroke.color ? `rgba(${stroke.color.r * 255}, ${stroke.color.g * 255}, ${stroke.color.b * 255}, ${stroke.color.a || 1})` : '#000000',
        width: stroke.weight || 1
      }));
    }

    // Handle effects safely
    const effects = node.effects;
    if (effects && effects.length > 0) {
      element.style.effects = effects.map(effect => ({
        type: effect.type,
        value: effect.value
      }));
    }

    return element;
  }

  public convertToExpressTemplate(figmaFile: FigmaFile | string | object): ExpressTemplate {
    try {
      const parsedFile = typeof figmaFile === 'string' || !('document' in figmaFile) 
        ? this.parser.parseFigmaJSON(figmaFile)
        : figmaFile as FigmaFile;
      
      // Find canvas dimensions from root frame
      const rootFrame = parsedFile.document.children[0];
      const dimensions = rootFrame?.absoluteBoundingBox || {
        width: 1920,
        height: 1080
      };

      // Recursively convert all nodes to Express elements
      const convertNodes = (nodes: FigmaNode[]): ExpressElement[] => {
        return nodes.flatMap(node => {
          const element = this.mapNodeToExpressElement(node);
          if (node.children?.length) {
            return [element, ...convertNodes(node.children)];
          }
          return [element];
        });
      };

      return {
        id: `express-${Date.now()}`,
        name: parsedFile.name,
        elements: convertNodes(parsedFile.document.children),
        metadata: {
          width: dimensions.width,
          height: dimensions.height,
          version: '1.0.0'
        }
      };
    } catch (error) {
      console.error('Error converting to Express template:', error);
      return {
        id: `error-${Date.now()}`,
        name: 'Error: Conversion Failed',
        elements: [],
        metadata: {
          width: 1920,
          height: 1080,
          version: '1.0.0'
        }
      };
    }
  }
} 