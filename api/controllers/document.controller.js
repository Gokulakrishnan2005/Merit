import Document  from "../models/document.model.js";
import { errorHandler } from '../utils/error.js';

export const createDocument = async (req, res, next) => {
    const { url, name } = req.body;
    const document = new Document({ url, name });
  
    try {
      await document.save();
      return res.status(201).json(document);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  // Get all listings
export const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find();
    if (!documents) {
      return next(errorHandler(404, 'Listings not found!'));
    }
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error retrieving listings:', error.message);
    next(error);
  }
};