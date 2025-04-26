import './styles.css';
import { convertFigmaToExpress } from '../index';

interface ConversionError {
    message: string;
}

class FigmaExpressConverter {
    private textarea!: HTMLTextAreaElement;
    private convertBtn!: HTMLButtonElement;
    private downloadBtn!: HTMLButtonElement;
    private previewContainer!: HTMLDivElement;
    private currentTemplate: any = null;

    constructor() {
        this.initializeElements();
        this.attachEventListeners();
    }

    private initializeElements() {
        this.textarea = document.getElementById('figmaJson') as HTMLTextAreaElement;
        this.convertBtn = document.getElementById('convertBtn') as HTMLButtonElement;
        this.downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
        this.previewContainer = document.getElementById('previewContainer') as HTMLDivElement;

        // Set example JSON
        this.textarea.value = JSON.stringify({
            document: {
                children: [
                    {
                        id: "1",
                        type: "FRAME",
                        name: "Example Frame",
                        absoluteBoundingBox: {
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 300
                        },
                        children: [
                            {
                                id: "2",
                                type: "TEXT",
                                name: "Sample Text",
                                characters: "Hello Adobe Express!",
                                style: {
                                    fontFamily: "Inter",
                                    fontSize: 24,
                                    textAlignHorizontal: "CENTER"
                                },
                                absoluteBoundingBox: {
                                    x: 100,
                                    y: 100,
                                    width: 200,
                                    height: 50
                                }
                            }
                        ]
                    }
                ]
            },
            name: "Example Design"
        }, null, 2);
    }

    private attachEventListeners() {
        this.convertBtn.addEventListener('click', () => this.handleConvert());
        this.downloadBtn.addEventListener('click', () => this.handleDownload());
    }

    private handleConvert() {
        try {
            const figmaJSON = JSON.parse(this.textarea.value);
            this.currentTemplate = convertFigmaToExpress(figmaJSON);
            this.updatePreview();
            this.downloadBtn.disabled = false;
        } catch (error: unknown) {
            console.error('Conversion failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            this.previewContainer.innerHTML = `<div class="error">Error: ${errorMessage}</div>`;
            this.downloadBtn.disabled = true;
        }
    }

    private updatePreview() {
        if (!this.currentTemplate) {
            return;
        }

        this.previewContainer.innerHTML = `
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px;">
                ${JSON.stringify(this.currentTemplate, null, 2)}
            </pre>
        `;
    }

    private handleDownload() {
        if (!this.currentTemplate) {
            return;
        }

        const blob = new Blob([JSON.stringify(this.currentTemplate, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'express-template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application
new FigmaExpressConverter(); 