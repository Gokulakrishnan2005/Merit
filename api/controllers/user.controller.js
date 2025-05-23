import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (res, req) => {
    res.json({
        message: 'api route has working!',
    });
};


export const getUserListing = async(req, res, next) => {

    if (req.user.id === req.params.id) {
        try {
          const listings = await Listing.find({ userRef: req.params.id });
          res.status(200).json(listings);
        } catch (error) {
          next(error);
        }
      } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
      }

}


