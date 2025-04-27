// import { colorUtils, constants, editor, fonts, viewport } from "express-document-sdk";

const jsonData = {
  // your expressTemplate json
};

async function createElementsFromJson(jsonData: any) {
  for (const element of jsonData.elements) {
    if (element.type === "text") {
      const textNode = editor.createText();
      textNode.fullContent.text = element.content || "";

      // Set font properties
      if (element.style.font) {
        const fontSize = element.style.font.size;
        const lineHeight = element.style.font.lineHeight;
        const alignment = element.style.font.alignment;

        if (alignment === "CENTER") {
          textNode.textAlignment = constants.TextAlignment.center;
        } else if (alignment === "LEFT") {
          textNode.textAlignment = constants.TextAlignment.left;
        } else if (alignment === "RIGHT") {
          textNode.textAlignment = constants.TextAlignment.right;
        }

        textNode.fullContent.applyCharacterStyles({
          fontSize: fontSize,
          color: colorUtils.fromRGB(0, 0, 0), // You could extract color from style.fill if you want
          letterSpacing: element.style.font.letterSpacing || 0,
        });
      }

      // Set position
      if (element.style.position) {
        textNode.frame.x = element.style.position.x;
        textNode.frame.y = element.style.position.y;
        textNode.frame.width = element.style.position.width;
        textNode.frame.height = element.style.position.height;
      }

      editor.context.insertionParent.children.append(textNode);
    }
    else if (element.type === "frame") {
      const frameNode = editor.createFrame();

      if (element.style.position) {
        frameNode.frame.x = element.style.position.x;
        frameNode.frame.y = element.style.position.y;
        frameNode.frame.width = element.style.position.width;
        frameNode.frame.height = element.style.position.height;
      }

      // You could also apply fills, strokes, etc. here

      editor.context.insertionParent.children.append(frameNode);
    }
    else if (element.type === "image") {
      const imageNode = editor.createImage();
      if (element.style.position) {
        imageNode.frame.x = element.style.position.x;
        imageNode.frame.y = element.style.position.y;
        imageNode.frame.width = element.style.position.width;
        imageNode.frame.height = element.style.position.height;
      }
      // Note: inserting the actual image content will require more work (uploading blobs)

      editor.context.insertionParent.children.append(imageNode);
    }
    else if (element.type === "shape") {
      const shapeNode = editor.createShape("rectangle"); // default to rectangle
      if (element.style.position) {
        shapeNode.frame.x = element.style.position.x;
        shapeNode.frame.y = element.style.position.y;
        shapeNode.frame.width = element.style.position.width;
        shapeNode.frame.height = element.style.position.height;
      }

      editor.context.insertionParent.children.append(shapeNode);
    }
    else {
      console.warn(`Unsupported element type: ${element.type}`);
    }
  }
}

createElementsFromJson(jsonData);

