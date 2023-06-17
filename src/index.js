import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import rentalRouter from './routes/rentalRoute.js';
import vehicleRouter from './routes/vehicleRoute.js';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'assert { type: "json" }
import seedData from './seeder/vehicleSeed.js';
import fs from 'fs';
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
const app = express();
app.use(express.json());
dotenv.config();
connectDB();

let PORT = process.env.PORT || 3000;

// Function to check if the seeded data flag file exists
async function checkSeededDataFlag() {
  return new Promise((resolve) => {
    fs.access('./seededDataFlag', fs.constants.F_OK, (err) => {
      if (err) {
        // Flag file does not exist
        resolve(false);
      } else {
        // Flag file exists
        resolve(true);
      }
    });
  });
}

// Function to create the seeded data flag file
async function setSeededDataFlag() {
  return new Promise((resolve, reject) => {
    fs.writeFile('./seededDataFlag', '', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use(userRouter);
app.use(vehicleRouter);
app.use(rentalRouter);

// Check if the seeded data flag is set
checkSeededDataFlag()
  .then((hasSeededData) => {
    if (!hasSeededData) {
      seedData()
        .then(() => {
          console.log('Data seeded successfully.');
          // Set the seeded data flag
          setSeededDataFlag()
            .then(() => {
              // Start the server
              app.listen(PORT, () => {
                console.log(`Server is running on ${PORT}`);
              });
            })
            .catch((error) => {
              console.error('Error occurred while setting the seeded data flag:', error);
            });
        })
        .catch((error) => {
          console.error('Error occurred while seeding data:', error);
        });
    } else {
      // Start the server directly if data has already been seeded
      app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('Error occurred while checking the seeded data flag:', error);
  });