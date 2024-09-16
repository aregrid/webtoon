
// Example usage
const webtoonSDK = new WebtoonSDK("YOUR_API_KEY");

// Create comic artwork
webtoonSDK.createComicArtwork({
    prompt: "running",
    imageUrl: "https://example.com/image.png",
    comicRoles: ["hero", "villain"],
    name: "Captain Awesome",
    aspectRatio: "16:9",
    preset: "superhero",
    seed: 12345,
    gender: "male",
    age: 30,
}).then(response => {
    console.log("Artwork created:", response);
}).catch(error => {
    console.error("Error creating artwork:", error);
});

// Retrieve comic artwork
webtoonSDK.getComicArtwork("YOUR_ARTWORK_ID").then(response => {
    console.log("Artwork retrieved:", response);
}).catch(error => {
    console.error("Error retrieving artwork:", error);
});