

<div style="display: flex; flex-direction: row;">
    <img width="32px" style="margin-right: 10px;" height="32px" src="./public/icons/light-logo-v3.jpg" alt="LlamaGen.Ai Logo" width="50%" />
    <img width="256px" height="31px" src="./public/icons/LlamaGen.Ai-word-white.png" alt="LlamaGen.Ai Word Logo" width="50%" />
</div>

---
> We are LlamaGen.Ai OpenAPI Team, dedicated to shipping the best comic-APIs infused with AI.


Here's a good example of how to use the Webtoon SDK to create and retrieve comic artworks:

```javascript
import {
    createComic,
    getComic,
    config
} from 'webtoon';

config({
    apiKey: "YOUR_API_KEY"
});

// Example parameters for creating comic artwork
const generationParams = {
  "model": "cyani-model",
  "prompt": "a comic about a cat and a dog",
  "size": "1024x1024"
};

// Create comic artwork
createComic(generationParams).then(response => {
    console.log("Artwork created:", response);
}).catch(error => {
    console.error("Error creating artwork:", error);
});

// Example artwork ID for retrieval
const artworkId = "YOUR_ARTWORK_ID";

// Retrieve comic artwork
getComic(artworkId).then(response => {
    console.log("Artwork retrieved:", response);
}).catch(error => {
    console.error("Error retrieving artwork:", error);
});
```
