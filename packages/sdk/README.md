# Good Example for create the comics, manga and manhwa with the webtoon SDK

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
