const { MongoClient } = require('mongodb');
const Fuse = require('fuse.js');

const uri = "mongodb+srv://plantake:Thisisatemppass321@cluster1.pteg18b.mongodb.net/calorieTrackerDB?retryWrites=true&w=majority"; // Replace with your actual connection string

async function searchFoods(userInput) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("calorieTrackerDB");
    const collection = database.collection("foods");

    // Fetch all data from the database
    const allFoods = await collection.find({}).toArray();
    console.log(allFoods);

    // Configure Fuse.js options
    const fuseOptions = {
      keys: ["foodName", "brand"],  // Fields to search within
      threshold: 0.3,  // Adjusts the sensitivity of the fuzzy search (lower is more strict)
      distance: 100,  // Max distance for an approximate match
    };

    // Initialize Fuse.js
    const fuse = new Fuse(allFoods, fuseOptions);

    // Perform fuzzy search
    const results = fuse.search(userInput).map(result => result.item);

    console.log(results);
    return results;
  } catch (error) {
    console.error("Error performing search:", error);
  } finally {
    await client.close();
  }
}

// Example usage
searchFoods("prat");  // Will match "Organic" despite typo