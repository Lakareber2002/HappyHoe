const mongoose = require('mongoose');

// Define the schema for a sales receipt
const salesReceiptSchema = new mongoose.Schema({
  receiptNumber: {
    type: String,
    trim: true,
    unique: true
  },
  customerName: {
    type: String,
    trim: true
  },
  customerContact: {
    type: String,
    trim: true
  },
  customerLocation: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    trim: true
  },
  time: {
    type: String,
    trim: true
  },
  items: [
    {
      producename: {
        type: String,
        trim: true
      },
      produceType: {
        type: String,
        trim: true
      },
      unitPrice: {
        type: Number,
        trim: true
      },
      quantityPurchased: {
        type: Number,
        trim: true
      },
      totalPrice: {
        type: Number,
        trim: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    trim: true
  }
});

// Create the SalesReceipt model using the schema
const SalesReceipt = mongoose.model('SalesReceipt', salesReceiptSchema);

module.exports = SalesReceipt;
