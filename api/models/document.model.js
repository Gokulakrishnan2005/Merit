import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;

