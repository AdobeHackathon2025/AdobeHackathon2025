import { ExpressTemplate } from '../types';
export declare class AIEnhancer {
    private readonly MIN_CONTRAST_RATIO;
    private readonly MIN_TEXT_SIZE;
    private readonly MAX_TEXT_SIZE;
    private readonly PADDING_RATIO;
    private enhanceColors;
    private findBetterContrast;
    private enhanceLayout;
    private enhanceStyles;
    applyEnhancements(template: ExpressTemplate): ExpressTemplate;
}
