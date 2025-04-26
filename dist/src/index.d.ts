export * from './types';
export { FigmaParser } from './parsers/figmaParser';
export { ExpressConverter } from './converters/expressConverter';
export { AIEnhancer } from './enhancers/aiEnhancer';
import { ExpressTemplate } from './types';
export declare function convertFigmaToExpress(figmaJSON: string | object): ExpressTemplate;
