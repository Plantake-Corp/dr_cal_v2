const { MongoClient } = require('mongodb');

// Connection URL and database name
const uri = 'mongodb+srv://plantake:Thisisatemppass321@cluster1.pteg18b.mongodb.net/calorieTrackerDB?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'calorieTrackerDB'; // Replace with your database name

async function run() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the client
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection('foods');

    // Example search term
    const userInput = "juice apple";
    const searchTerms = userInput.split(" ");

    // Use a more concise query by combining terms
    const results = await collection.find({
      $text: { $search: searchTerms.join(" ") } // Combine terms into a single $search
    }).limit(10).toArray();

    console.log('Search results:', results);

  } catch (err) {
    console.error('Error performing search:', err);
  } finally {
    // Close the connection
    await client.close();
  }
}

run().catch(console.dir);