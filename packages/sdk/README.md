# Good Example for create the comics, manga and manhwa with the webtoon SDK

Here's a good example of how to use the Webtoon SDK to create and retrieve comic artworks:

```javascript
import {
    createComicArtwork,
    getComicArtwork,
    config
} from 'webtoon';

config({
    apiKey: "YOUR_API_KEY"
});

// Example parameters for creating comic artwork
const createArtworkParams = {
    prompt: "running",
    imageUrl: "https://example.com/image.png",
    gender: "male",
    age: 30,
};

// Create comic artwork
createComicArtwork(createArtworkParams).then(response => {
    console.log("Artwork created:", response);
}).catch(error => {
    console.error("Error creating artwork:", error);
});

// Example artwork ID for retrieval
const artworkId = "YOUR_ARTWORK_ID";

// Retrieve comic artwork
getComicArtwork(artworkId).then(response => {
    console.log("Artwork retrieved:", response);
}).catch(error => {
    console.error("Error retrieving artwork:", error);
});
```
