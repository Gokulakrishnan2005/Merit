import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Create a new listing
export const createListing = async (req, res, next) => {
  const { name, imageUrls, idNumber, phoneNumber, birthDate, address, email, password, gender, course, cgpa, attence, high } = req.body;

  // Hash the password before creating the listing
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const listing = new Listing({
    name,
    imageUrls,
    idNumber,
    phoneNumber,
    birthDate,
    address,
    email,
    password: hashedPassword, // Save hashed password
    gender,
    course,
    cgpa,
    attence,
    high
  });

  try {
    await listing.save(); // Save the listing to the database
    return res.status(201).json(listing);
  } catch (error) {
    // Handle the error properly
    return res.status(400).json({ error: error.message });
  }
};

// Get all listings with search feature
export const getAllListing = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      query.$or = [
        { name: searchRegex },
        { course: searchRegex },
        { email: searchRegex }
      ];
    }

    const listings = await Listing.find(query);
    if (!listings) {
      return next(errorHandler(404, 'Listings not found!'));
    }
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error retrieving listings:', error.message);
    next(error);
  }
};

// Get student details by ID
export const studentDetail = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Student login
export const studentlogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await Listing.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'Email not found'));
    }

    const idPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!idPasswordValid) {
      return next(errorHandler(401, 'Invalid password'));
    }

    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, 'Error signing in'));
  }
};

// Get student details for students
export const Details = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a listing by ID
export const updateListing = async (req, res, next) => {
  const { id } = req.params;
  const { password, ...updateData } = req.body;

  if (password) {
    updateData.password = bcryptjs.hashSync(password, 10);
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedListing) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a listing by ID
export const deleteListing = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
