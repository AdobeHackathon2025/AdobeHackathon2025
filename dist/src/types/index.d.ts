export interface FigmaNode {
    id: string;
    type: string;
    name?: string;
    children?: FigmaNode[];
    fills?: any[];
    strokes?: any[];
    effects?: any[];
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
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface FigmaFile {
    document: {
        children: FigmaNode[];
    };
    name: string;
}
export interface ExpressFont {
    family: string;
    size: number;
    weight: number;
    alignment: string;
    letterSpacing: number;
    lineHeight: number;
    color?: string;
}
export interface ExpressElement {
    id: string;
    type: 'text' | 'image' | 'shape' | 'frame';
    content?: string;
    style: {
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        font?: ExpressFont;
        fill?: {
            type: string;
            color: string;
            opacity: number;
        }[];
        stroke?: {
            color: string;
            width: number;
        }[];
        effects?: {
            type: string;
            value: any;
        }[];
    };
}
export interface ExpressTemplate {
    id: string;
    name: string;
    elements: ExpressElement[];
    metadata: {
        width: number;
        height: number;
        version: string;
    };
}
export interface ColorEnhancement {
    original: string;
    suggested: string;
    contrastRatio: number;
}
export interface LayoutEnhancement {
    elementId: string;
    originalSize: number;
    suggestedSize: number;
    reason: string;
}
export interface StyleEnhancement {
    elementId: string;
    property: string;
    originalValue: any;
    suggestedValue: any;
    reason: string;
}
