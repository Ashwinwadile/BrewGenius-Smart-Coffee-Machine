import mongoose from 'mongoose';

const coffeeStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Idle', 'Preparing', 'Ready', 'Error'],
    default: 'Idle'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  message: {
    type: String,
    default: ''
  },
  startTime: {
    type: Date,
    default: null
  },
  endTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const CoffeeStatus = mongoose.model('CoffeeStatus', coffeeStatusSchema);

export default CoffeeStatus;