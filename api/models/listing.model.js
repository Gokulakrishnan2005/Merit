import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrls:{
    type: String,
    default: "https://www.w3schools.com/w3images/avatar2.png",
  },
  idNumber: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'student',
  },
  cgpa: {
    type: Number,

  },
  attence: {
    type: Number,

  },
  high: {
    type: Number,

  }
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
