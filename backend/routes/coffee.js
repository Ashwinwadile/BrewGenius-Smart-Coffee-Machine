import express from 'express';
import auth from '../middleware/auth.js';
import CoffeePreference from '../models/CoffeePreference.js';
import CoffeeStatus from '../models/CoffeeStatus.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/coffee/select
 * @desc    Select coffee type preference
 * @access  Private
 */
router.post('/select', auth, async (req, res) => {
  try {
    const { coffeeType } = req.body;
    const userId = req.user;
    
    if (!['Mild', 'Strong'].includes(coffeeType)) {
      return res.status(400).json({ message: 'Invalid coffee type. Choose Mild or Strong.' });
    }
    
    // Find existing preference or create new one
    let preference = await CoffeePreference.findOne({ user: userId });
    
    if (preference) {
      preference.coffeeType = coffeeType;
      await preference.save();
    } else {
      preference = new CoffeePreference({
        user: userId,
        coffeeType
      });
      await preference.save();
    }
    
    res.status(200).json({ 
      message: 'Coffee preference saved',
      preference
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/coffee/preferences/:userId
 * @desc    Get user's coffee preference
 * @access  Private
 */
router.get('/preferences/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own preferences
    if (userId !== req.user) {
      return res.status(403).json({ message: 'Not authorized to access this data' });
    }
    
    const preference = await CoffeePreference.findOne({ user: userId });
    
    if (!preference) {
      return res.status(404).json({ message: 'No coffee preference found' });
    }
    
    res.status(200).json({ preference });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/coffee/status
 * @desc    Simulate coffee preparation process
 * @access  Private
 */
router.post('/status', auth, async (req, res) => {
  try {
    const userId = req.user;
    
    // Check if user has a coffee preference
    const preference = await CoffeePreference.findOne({ user: userId });
    
    if (!preference) {
      return res.status(400).json({ message: 'Please select a coffee preference first' });
    }
    
    // Create or update coffee status
    let status = await CoffeeStatus.findOne({ user: userId });
    
    if (status && status.status === 'Preparing') {
      return res.status(400).json({ message: 'Coffee is already being prepared' });
    }
    
    if (!status) {
      status = new CoffeeStatus({
        user: userId,
        status: 'Preparing',
        progress: 0,
        message: 'Your coffee is being prepared. Please wait...',
        startTime: new Date()
      });
    } else {
      status.status = 'Preparing';
      status.progress = 0;
      status.message = 'Your coffee is being prepared. Please wait...';
      status.startTime = new Date();
      status.endTime = null;
    }
    
    await status.save();
    
    // Simulate coffee preparation (in a real app, this would be triggered by IoT device)
    // For demo purposes, we'll just return the initial status
    
    res.status(200).json({ 
      message: 'Coffee preparation started',
      status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/coffee/status/:userId
 * @desc    Get current coffee status
 * @access  Private
 */
router.get('/status/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own status
    if (userId !== req.user) {
      return res.status(403).json({ message: 'Not authorized to access this data' });
    }
    
    const status = await CoffeeStatus.findOne({ user: userId });
    
    if (!status) {
      return res.status(404).json({ message: 'No coffee status found' });
    }
    
    // Simulate progress update for demo purposes
    // In a real app, this would come from the IoT device
    if (status.status === 'Preparing') {
      const elapsedTime = new Date() - status.startTime;
      const simulatedProgress = Math.min(Math.floor(elapsedTime / 100), 100);
      
      status.progress = simulatedProgress;
      
      if (simulatedProgress >= 100) {
        status.status = 'Ready';
        status.message = 'Your coffee is ready!';
        status.endTime = new Date();
      }
      
      await status.save();
    }
    
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/coffee/history/:userId
 * @desc    Get user's coffee history
 * @access  Private
 */
router.get('/history/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own history
    if (userId !== req.user) {
      return res.status(403).json({ message: 'Not authorized to access this data' });
    }
    
    const preferences = await CoffeePreference.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json({ preferences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;