import { FigmaNode, FigmaFile } from '../types';
export declare class FigmaParser {
    private validateNode;
    parseFigmaJSON(input: string | object): FigmaFile;
    classifyNode(node: FigmaNode): string;
    extractStyles(node: FigmaNode): {
        font: {
            family: string;
            size: number;
            weight: number;
            alignment: string;
            letterSpacing: number;
            lineHeight: number;
        } | undefined;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        } | undefined;
        fills: {
            type: any;
            color: string;
            opacity: any;
        }[];
    };
}
