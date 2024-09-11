const { MongoClient } = require('mongodb');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://admin:admin@Cluster0.7vvfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function searchFoods(userInput) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("calorieTrackerDB");
    const collection = database.collection("foods");

    const results = await collection.aggregate([
      {
        $search: {
          index: "default", // Use your index name
          compound: {
            should: [
              {
                autocomplete: {
                  query: userInput,
                  path: "foodName", // Search in the 'foodName' field
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 2
                  }
                }
              },
              {
                autocomplete: {
                  query: userInput,
                  path: "brand", // Search in the 'brand' field
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 2
                  }
                }
              }
            ]
          }
        }
      },
      { $limit: 10 }
    ]).toArray();

    console.log(results);
    return results;
  } catch (error) {
    console.error("Error performing search:", error);
  } finally {
    await client.close();
  }
}

// Example usage
searchFoods("prat");