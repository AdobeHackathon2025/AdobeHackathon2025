"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.css");
const index_1 = require("../index");
class FigmaExpressConverter {
    constructor() {
        this.currentTemplate = null;
        this.initializeElements();
        this.attachEventListeners();
    }
    initializeElements() {
        this.textarea = document.getElementById('figmaJson');
        this.convertBtn = document.getElementById('convertBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.previewContainer = document.getElementById('previewContainer');
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
    attachEventListeners() {
        this.convertBtn.addEventListener('click', () => this.handleConvert());
        this.downloadBtn.addEventListener('click', () => this.handleDownload());
    }
    handleConvert() {
        try {
            const figmaJSON = JSON.parse(this.textarea.value);
            this.currentTemplate = (0, index_1.convertFigmaToExpress)(figmaJSON);
            this.updatePreview();
            this.downloadBtn.disabled = false;
        }
        catch (error) {
            console.error('Conversion failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            this.previewContainer.innerHTML = `<div class="error">Error: ${errorMessage}</div>`;
            this.downloadBtn.disabled = true;
        }
    }
    updatePreview() {
        if (!this.currentTemplate) {
            return;
        }
        this.previewContainer.innerHTML = `
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px;">
                ${JSON.stringify(this.currentTemplate, null, 2)}
            </pre>
        `;
    }
    handleDownload() {
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
//# sourceMappingURL=index.js.map