import vehicleModel from "../models/vehicleModel.js";
import mongoose from 'mongoose';

export default async function seedData() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rentVehicle", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB server.");

    const seedData = [
      { type: 'hatchback', name: 'Car1' },
      { type: 'hatchback', name: 'Car2' },
      { type: 'suv', name: 'Car3' },
      { type: 'suv', name: 'Car4' },
      { type: 'sedan', name: 'Car5' },
      { type: 'sedan', name: 'Car6' },
      { type: 'cruiser', name: 'Bike1' },
      { type: 'sports', name: 'Bike2' }
    ];

    const savePromises = seedData.map(async (data, index) => {
      const p = new vehicleModel(data);
      try {
        const result = await p.save();
        if (index === seedData.length - 1) {
          console.log("DONE!");
        }
        return result;
      } catch (error) {
        throw error;
      }
    });

    await Promise.all(savePromises);
    console.log("All vehicles saved successfully.");
  } catch (error) {
    console.error("Error occurred while saving vehicles:", error);
  } 
}
