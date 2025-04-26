"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIEnhancer = exports.ExpressConverter = exports.FigmaParser = void 0;
exports.convertFigmaToExpress = convertFigmaToExpress;
__exportStar(require("./types"), exports);
var figmaParser_1 = require("./parsers/figmaParser");
Object.defineProperty(exports, "FigmaParser", { enumerable: true, get: function () { return figmaParser_1.FigmaParser; } });
var expressConverter_1 = require("./converters/expressConverter");
Object.defineProperty(exports, "ExpressConverter", { enumerable: true, get: function () { return expressConverter_1.ExpressConverter; } });
var aiEnhancer_1 = require("./enhancers/aiEnhancer");
Object.defineProperty(exports, "AIEnhancer", { enumerable: true, get: function () { return aiEnhancer_1.AIEnhancer; } });
// Main converter function
const figmaParser_2 = require("./parsers/figmaParser");
const expressConverter_2 = require("./converters/expressConverter");
const aiEnhancer_2 = require("./enhancers/aiEnhancer");
function convertFigmaToExpress(figmaJSON) {
    try {
        const parser = new figmaParser_2.FigmaParser();
        const converter = new expressConverter_2.ExpressConverter();
        const enhancer = new aiEnhancer_2.AIEnhancer();
        // Parse and validate Figma JSON
        const parsedFigma = parser.parseFigmaJSON(figmaJSON);
        // Convert to Express format
        const expressTemplate = converter.convertToExpressTemplate(parsedFigma);
        // Apply AI enhancements
        const enhancedTemplate = enhancer.applyEnhancements(expressTemplate);
        return enhancedTemplate;
    }
    catch (error) {
        console.error('Error in Figma to Express conversion:', error);
        throw error;
    }
}
//# sourceMappingURL=index.js.map