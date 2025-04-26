import Color from 'color';
import contrast from 'wcag-contrast';
import { ExpressTemplate, ExpressElement, ColorEnhancement, LayoutEnhancement, StyleEnhancement, ExpressFont } from '../types';

export class AIEnhancer {
  private readonly MIN_CONTRAST_RATIO = 4.5; // WCAG AA standard
  private readonly MIN_TEXT_SIZE = 14;
  private readonly MAX_TEXT_SIZE = 72;
  private readonly PADDING_RATIO = 0.1;

  private enhanceColors(elements: ExpressElement[]): ColorEnhancement[] {
    const enhancements: ColorEnhancement[] = [];

    elements.forEach(element => {
      if (element.style.fill?.[0]?.color && element.type === 'text') {
        const backgroundColor = element.style.fill[0].color;
        const textColor = element.style.font?.color || '#000000';

        try {
          const bgColor = Color(backgroundColor);
          const txtColor = Color(textColor);
          const contrastRatio = contrast.ratio(bgColor.rgb().array(), txtColor.rgb().array());

          if (contrastRatio < this.MIN_CONTRAST_RATIO) {
            // Adjust text color to improve contrast
            const suggestedColor = this.findBetterContrast(bgColor, txtColor);
            enhancements.push({
              original: textColor,
              suggested: suggestedColor.hex(),
              contrastRatio: contrast.ratio(bgColor.rgb().array(), suggestedColor.rgb().array())
            });
          }
        } catch (error) {
          console.warn('Color enhancement failed:', error);
        }
      }
    });

    return enhancements;
  }

  private findBetterContrast(background: Color, text: Color): Color {
    const lightness = text.lightness();
    let step = 5;
    let attempts = 0;
    let newColor = text;

    while (contrast.ratio(background.rgb().array(), newColor.rgb().array()) < this.MIN_CONTRAST_RATIO && attempts < 10) {
      // If text is darker than background, make it lighter, and vice versa
      if (lightness < background.lightness()) {
        newColor = newColor.darken(step);
      } else {
        newColor = newColor.lighten(step);
      }
      attempts++;
    }

    return newColor;
  }

  private enhanceLayout(elements: ExpressElement[]): LayoutEnhancement[] {
    const enhancements: LayoutEnhancement[] = [];

    elements.forEach(element => {
      if (element.type === 'text' && element.style.font?.size) {
        const { width, height } = element.style.position;
        const fontSize = element.style.font.size;
        const content = element.content || '';
        
        // Estimate text space requirements
        const estimatedWidth = content.length * (fontSize * 0.6); // Rough approximation
        const estimatedHeight = fontSize * 1.2; // Including line height

        if (estimatedWidth > width * (1 - this.PADDING_RATIO)) {
          const suggestedSize = Math.max(
            this.MIN_TEXT_SIZE,
            Math.min(
              this.MAX_TEXT_SIZE,
              fontSize * (width / estimatedWidth) * (1 - this.PADDING_RATIO)
            )
          );

          enhancements.push({
            elementId: element.id,
            originalSize: fontSize,
            suggestedSize: suggestedSize,
            reason: 'Text width exceeds container width'
          });
        }

        if (estimatedHeight > height * (1 - this.PADDING_RATIO)) {
          const suggestedSize = Math.max(
            this.MIN_TEXT_SIZE,
            Math.min(
              this.MAX_TEXT_SIZE,
              fontSize * (height / estimatedHeight) * (1 - this.PADDING_RATIO)
            )
          );

          enhancements.push({
            elementId: element.id,
            originalSize: fontSize,
            suggestedSize: suggestedSize,
            reason: 'Text height exceeds container height'
          });
        }
      }
    });

    return enhancements;
  }

  private enhanceStyles(elements: ExpressElement[]): StyleEnhancement[] {
    const enhancements: StyleEnhancement[] = [];
    const fontStyles = new Map<string, number>();

    // Collect font style usage statistics
    elements.forEach(element => {
      if (element.type === 'text' && element.style.font?.family && element.style.font?.size) {
        const key = `${element.style.font.family}-${element.style.font.size}`;
        fontStyles.set(key, (fontStyles.get(key) || 0) + 1);
      }
    });

    // Find the most common font style
    let mostCommonStyle: { key: string; count: number } = { key: '', count: 0 };
    fontStyles.forEach((count, key) => {
      if (count > mostCommonStyle.count) {
        mostCommonStyle = { key, count };
      }
    });

    // Suggest consistency improvements
    if (mostCommonStyle.key) {
      const [family, size] = mostCommonStyle.key.split('-');
      elements.forEach(element => {
        if (element.type === 'text' && element.style.font?.family && element.style.font?.size) {
          const currentKey = `${element.style.font.family}-${element.style.font.size}`;
          if (currentKey !== mostCommonStyle.key && fontStyles.get(currentKey) === 1) {
            enhancements.push({
              elementId: element.id,
              property: 'font',
              originalValue: {
                family: element.style.font.family,
                size: element.style.font.size
              },
              suggestedValue: {
                family,
                size: parseInt(size)
              },
              reason: 'Inconsistent font style'
            });
          }
        }
      });
    }

    return enhancements;
  }

  public applyEnhancements(template: ExpressTemplate): ExpressTemplate {
    const colorEnhancements = this.enhanceColors(template.elements);
    const layoutEnhancements = this.enhanceLayout(template.elements);
    const styleEnhancements = this.enhanceStyles(template.elements);

    // Apply enhancements to template
    const enhancedElements = template.elements.map(element => {
      const enhanced = { ...element };

      // Apply color enhancements
      colorEnhancements.forEach(enhancement => {
        if (enhanced.type === 'text' && enhanced.style.font?.color === enhancement.original) {
          if (enhanced.style.font) {
            enhanced.style.font = {
              ...enhanced.style.font,
              color: enhancement.suggested
            };
          }
        }
      });

      // Apply layout enhancements
      layoutEnhancements.forEach(enhancement => {
        if (enhanced.id === enhancement.elementId && enhanced.style.font) {
          enhanced.style.font = {
            ...enhanced.style.font,
            size: enhancement.suggestedSize
          };
        }
      });

      // Apply style enhancements
      styleEnhancements.forEach(enhancement => {
        if (enhanced.id === enhancement.elementId && enhanced.style.font) {
          enhanced.style.font = {
            ...enhanced.style.font,
            ...enhancement.suggestedValue
          };
        }
      });

      return enhanced;
    });

    return {
      ...template,
      elements: enhancedElements
    };
  }
} 