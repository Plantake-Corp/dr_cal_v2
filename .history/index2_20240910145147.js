const mongoose = require('mongoose');

// database connection with mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://plantake:Thisisatemppass321@cluster0.brgz2.mongodb.net/?retryWrites=true&w=majority&appName=cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Define the schema
const foodSchema = new mongoose.Schema({
  foodName: String,
  brand: String,
  calories: Number,
  // other fields if needed
});

// Create the model
const Food = mongoose.model('Food', foodSchema);

// Search function using Mongoose
async function searchFoods(userInput) {
  try {
    // Use the $search stage for MongoDB Atlas search
    const results = await Food.aggregate([
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
    ]);

    console.log(results);
    return results;
  } catch (error) {
    console.error("Error performing search:", error);
  }
}

// Example usage
searchFoods("prat");
