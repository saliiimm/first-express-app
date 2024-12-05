const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBURL = process.env.DB_URL;

async function main() {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to mongodb ', err);
  }
}

main().catch((err) => console.error(err));
