
import { convertFigmaToExpress } from 'figma-to-express';
import axios from 'axios'; // We'll use axios for the API call

const ADOBE_EXPRESS_API_URL = 'https://api.adobe.io/express/v1/projects';
const ADOBE_API_KEY = 'your-api-key-here'; // Replace with your Adobe API Key
const ADOBE_ACCESS_TOKEN = 'your-access-token-here'; // OAuth token or Bearer token

async function createExpressPage(figmaJson: object) {
  try {
    // Step 1: Convert Figma JSON to Express Template
    const expressTemplate = convertFigmaToExpress(figmaJson);

    console.log('Converted Express Template:', expressTemplate);

    // Step 2: Make API request to Adobe Express
    const response = await axios.post(
      ADOBE_EXPRESS_API_URL,
      expressTemplate,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ADOBE_API_KEY,
          'Authorization': `Bearer ${ADOBE_ACCESS_TOKEN}`
        }
      }
    );

    console.log('Adobe Express Project Created Successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create Adobe Express project:', error);
    throw error;
  }
}

// Example usage:
const figmaJson = {
  // Your Figma JSON here
};

createExpressPage(figmaJson)
  .then(result => console.log('Success!', result))
  .catch(err => console.error('Error:', err));

