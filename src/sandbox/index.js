import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Import our Figma converter code
import { convertFigmaToExpress } from '../converters/expressConverter';

class FigmaExpressConverter {
    constructor() {
        this.initializeAddOn();
    }

    async initializeAddOn() {
        try {
            await addOnUISdk.ready;
            this.setupMessageHandlers();
            console.log('Add-on initialized successfully');
        } catch (error) {
            console.error('Failed to initialize add-on:', error);
        }
    }

    setupMessageHandlers() {
        // Listen for messages from the UI
        addOnUISdk.app.on('message', async (message) => {
            switch (message.type) {
                case 'convert':
                    await this.handleConvert(message.figmaJSON);
                    break;
                case 'apply':
                    await this.handleApply(message.template);
                    break;
            }
        });
    }

    async handleConvert(figmaJSON) {
        try {
            const template = convertFigmaToExpress(figmaJSON);
            // Send the converted template back to the UI
            addOnUISdk.app.emit('conversionComplete', { success: true, template });
        } catch (error) {
            addOnUISdk.app.emit('conversionComplete', { 
                success: false, 
                error: error.message 
            });
        }
    }

    async handleApply(template) {
        try {
            // Apply the template to the current document
            await addOnUISdk.app.document.addElements(template.elements);
            addOnUISdk.app.emit('applyComplete', { success: true });
        } catch (error) {
            addOnUISdk.app.emit('applyComplete', { 
                success: false, 
                error: error.message 
            });
        }
    }
}

// Initialize the converter
new FigmaExpressConverter(); 