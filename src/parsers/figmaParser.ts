import { FigmaNode, FigmaFile } from '../types';

interface FigmaNodeInput {
  id?: string;
  type?: string;
  name?: string;
  children?: FigmaNodeInput[];
  fills?: Array<{
    type?: string;
    color?: {
      r: number;
      g: number;
      b: number;
      a?: number;
    };
    opacity?: number;
  }>;
  strokes?: Array<{
    color?: {
      r: number;
      g: number;
      b: number;
      a?: number;
    };
    weight?: number;
  }>;
  effects?: Array<{
    type: string;
    value: any;
  }>;
  characters?: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
    letterSpacing?: number;
    lineHeightPx?: number;
  };
  absoluteBoundingBox?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
}

interface FigmaFileInput {
  document: {
    children: FigmaNodeInput[];
  };
  name?: string;
}

export class FigmaParser {
  private validateNode(node: FigmaNodeInput): FigmaNode {
    // Basic validation with fallbacks for missing fields
    return {
      id: node.id || `generated-${Math.random().toString(36).substr(2, 9)}`,
      type: node.type || 'UNKNOWN',
      name: node.name,
      children: node.children?.map(child => this.validateNode(child)) || [],
      fills: node.fills || [],
      strokes: node.strokes || [],
      effects: node.effects || [],
      characters: node.characters,
      style: node.style ? {
        fontFamily: node.style.fontFamily,
        fontSize: node.style.fontSize,
        fontWeight: node.style.fontWeight,
        textAlignHorizontal: node.style.textAlignHorizontal,
        textAlignVertical: node.style.textAlignVertical,
        letterSpacing: node.style.letterSpacing,
        lineHeightPx: node.style.lineHeightPx
      } : undefined,
      absoluteBoundingBox: node.absoluteBoundingBox ? {
        x: node.absoluteBoundingBox.x || 0,
        y: node.absoluteBoundingBox.y || 0,
        width: node.absoluteBoundingBox.width || 100,
        height: node.absoluteBoundingBox.height || 100
      } : undefined
    };
  }

  public parseFigmaJSON(input: string | object): FigmaFile {
    try {
      const data = typeof input === 'string' ? JSON.parse(input) as FigmaFileInput : input as FigmaFileInput;
      
      if (!data.document || !Array.isArray(data.document.children)) {
        throw new Error('Invalid Figma file format: missing document or children');
      }

      return {
        document: {
          children: data.document.children.map((node: FigmaNodeInput) => this.validateNode(node))
        },
        name: data.name || 'Untitled Design'
      };
    } catch (error) {
      console.error('Error parsing Figma JSON:', error);
      // Return a minimal valid structure instead of throwing
      return {
        document: {
          children: []
        },
        name: 'Error: Invalid File'
      };
    }
  }

  public classifyNode(node: FigmaNode): string {
    // Robust node type classification
    if (!node.type) return 'UNKNOWN';

    switch (node.type.toUpperCase()) {
      case 'TEXT':
        return 'TEXT';
      case 'RECTANGLE':
      case 'VECTOR':
      case 'ELLIPSE':
      case 'POLYGON':
        return 'SHAPE';
      case 'FRAME':
      case 'GROUP':
      case 'COMPONENT':
      case 'COMPONENT_SET':
        return 'FRAME';
      case 'IMAGE':
        return 'IMAGE';
      default:
        // Check for image-like content in fills
        if (node.fills?.some(fill => fill.type === 'IMAGE')) {
          return 'IMAGE';
        }
        return 'UNKNOWN';
    }
  }

  public extractStyles(node: FigmaNode) {
    return {
      font: node.style ? {
        family: node.style.fontFamily || 'Arial',
        size: node.style.fontSize || 14,
        weight: node.style.fontWeight || 400,
        alignment: node.style.textAlignHorizontal || 'LEFT',
        letterSpacing: node.style.letterSpacing || 0,
        lineHeight: node.style.lineHeightPx || 1.2 * (node.style.fontSize || 14)
      } : undefined,
      position: node.absoluteBoundingBox ? {
        x: node.absoluteBoundingBox.x,
        y: node.absoluteBoundingBox.y,
        width: node.absoluteBoundingBox.width,
        height: node.absoluteBoundingBox.height
      } : undefined,
      fills: node.fills?.map(fill => ({
        type: fill.type || 'SOLID',
        color: fill.color ? `rgba(${fill.color.r * 255}, ${fill.color.g * 255}, ${fill.color.b * 255}, ${fill.color.a || 1})` : '#000000',
        opacity: fill.opacity || 1
      })) || []
    };
  }
} 