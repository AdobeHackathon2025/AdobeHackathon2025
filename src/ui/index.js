import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

class FigmaConverterUI {
    constructor() {
        this.textarea = document.getElementById('figmaJson');
        this.convertBtn = document.getElementById('convertBtn');
        this.applyBtn = document.getElementById('applyBtn');
        this.previewContainer = document.getElementById('previewContainer');
        this.currentTemplate = null;

        this.initializeUI();
    }

    async initializeUI() {
        try {
            await addOnUISdk.ready;
            this.setupEventListeners();
            this.setupMessageHandlers();
            console.log('UI initialized successfully');
        } catch (error) {
            console.error('Failed to initialize UI:', error);
        }
    }

    setupEventListeners() {
        this.convertBtn.addEventListener('click', () => this.handleConvert());
        this.applyBtn.addEventListener('click', () => this.handleApply());
    }

    setupMessageHandlers() {
        addOnUISdk.app.on('conversionComplete', (result) => {
            if (result.success) {
                this.currentTemplate = result.template;
                this.updatePreview();
                this.applyBtn.disabled = false;
            } else {
                this.showError(result.error);
                this.applyBtn.disabled = true;
            }
        });

        addOnUISdk.app.on('applyComplete', (result) => {
            if (!result.success) {
                this.showError(result.error);
            }
        });
    }

    handleConvert() {
        try {
            const figmaJSON = JSON.parse(this.textarea.value);
            // Send the Figma JSON to the sandbox for conversion
            addOnUISdk.app.emit('message', {
                type: 'convert',
                figmaJSON
            });
        } catch (error) {
            this.showError('Invalid JSON format');
        }
    }

    handleApply() {
        if (!this.currentTemplate) return;

        addOnUISdk.app.emit('message', {
            type: 'apply',
            template: this.currentTemplate
        });
    }

    updatePreview() {
        if (!this.currentTemplate) return;

        this.previewContainer.innerHTML = `
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px;">
                ${JSON.stringify(this.currentTemplate, null, 2)}
            </pre>
        `;
    }

    showError(message) {
        this.previewContainer.innerHTML = `
            <div class="error">Error: ${message}</div>
        `;
    }
}

// Initialize the UI
new FigmaConverterUI(); 