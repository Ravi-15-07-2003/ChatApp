import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import gentoken from '../config/token.js';

export const signUp = async (req, res) => {
  try {
    const {userName, email, password} = req.body;

    // Check if user already exists
    const CheckUserByUserName = await User.findOne({userName})
    if (CheckUserByUserName) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const CheckUserByEmail = await User.findOne({email})
    if (CheckUserByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if(password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = await gentoken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      sameSite: 'None', // Adjust as needed
      secure: false, // Set to true if using HTTPS
    });

    return res.status(201).json({ message: `User Signup successfully ${user}`});

} catch (error) {
    console.error('Error during sign up:', error);
    return res.status(500).json({ message: `signUp Internal server error ${error}`});
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user already exists
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({ message: 'User  does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { 
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = await gentoken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      sameSite: 'None', // Adjust as needed
      secure: false, // Set to true if using HTTPS
    });

    return res.status(201).json({ message: `User Login successfully ${user}`});

} catch (error) {
    console.error('Error during sign up:', error);
    return res.status(500).json({ message: `login Internal server error ${error}`});
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: `logout Internal server error ${error}`});
  }
}