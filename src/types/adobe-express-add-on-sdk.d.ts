declare module '@adobe/express-add-on-sdk' {
    interface AddOnSdk {
        ready: Promise<void>;
        app: {
            document: {
                addElements: (elements: any[]) => Promise<void>;
            };
        };
    }

    export const addOnSdk: AddOnSdk;
} 