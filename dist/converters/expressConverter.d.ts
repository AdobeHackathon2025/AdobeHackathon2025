import { ExpressTemplate, FigmaFile } from '../types';
export declare class ExpressConverter {
    private parser;
    constructor();
    private mapNodeToExpressElement;
    convertToExpressTemplate(figmaFile: FigmaFile | string | object): ExpressTemplate;
}
