import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    rentalDates: [{ type: Date, required: true }]
  });


  const rentalModel = mongoose.model("rental",rentalSchema)

  export default rentalModel