import mongoose from 'mongoose';

const coffeePreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coffeeType: {
    type: String,
    enum: ['Mild', 'Strong'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const CoffeePreference = mongoose.model('CoffeePreference', coffeePreferenceSchema);

export default CoffeePreference;