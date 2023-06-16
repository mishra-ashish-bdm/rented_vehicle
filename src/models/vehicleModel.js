import mongoose from "mongoose";


const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true }
  });


  const vehicleModel = mongoose.model('vehicle',vehicleSchema)

  export default vehicleModel