import User from "../models/userSchema.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../helpers/authHelpers.js";
import { sendVerificationEmail } from "../config/emailVerification.js";
import crypto from  'crypto';

// * Create User Controller
export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if there is username
    if (!username.trim()) {
      return res.json({ error: "username cannot be empty" });
    }

    // Check if username is taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ error: "username is taken" });
    }

    // Validate username format
    if (!username || username.length < 6 || /\s/.test(username)) {
      return res.json({ error: "Invalid username format" });
    }

    // Check if there is email
    if (!email.trim()) {
      return res.json({ error: "email cannot be empty" });
    }

    // Check if email is taken
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.json({ error: "email is already taken" });
    }

    // Check if there is password
    if (!password.trim()) {
      return res.json({ error: "password cannot be empty" });
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    // Create user
    const user = await new User({
      username,
      email,
      password: hashedPass,
      isActive: false,
      verificationToken: crypto.randomBytes(16).toString('hex'),
    }).save();

    console.log("new user:", user);

    // Send verification email
    sendVerificationEmail(user.email, user.verificationToken);
    
    // Generate token
    const token = generateToken(user);

    // Send response
    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

// * Login User Controller
export async function loginUser(req, res) {
  try {
    const { usrml, password } = req.body;

    if (!usrml) {
      return res.status(400).json({ message: "Login is required" });
    }

    // Check if user exist
    let user;

    if (usrml.includes("@")) {
      user = await User.findOne({ email: usrml });
    } else {
      user = await User.findOne({ username: usrml });
    }

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const comparePass = await comparePassword(password, user.password);
    if (!comparePass) {
      return res.json({ error: "Password does not match" });
    }

    // Generate token
    const token = generateToken(user);

    // Send response
    res.status(200).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        isActive: user.isActive
      },
      token,
    });
  } catch (err) {
    console.error(`Error logging in user: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

// * Email Verification Controller
export async function emailVerification (req, res) {
  try {
    
    const { token } = req.query;
  
  
  // find user by verification token
  const user = await User.findOne({ verificationToken: token });
  
  
  if(!token) {
      return res.json({error: 'Verification Token not found...'})
  }


  if(!user){
      return res.json({error: 'Invalid Token'});
  };

  // Activate user's account
  user.isActive = true,
  user.verificationToken = undefined; // clear token
  await user.save();

  res.redirect('http://localhost:5000/login');


  } catch (err) {
    console.error(`Error verifying user: ${err}`)
    res.status(500).json({message: 'Internal server error'});
  }

}

//* Resend email 
export async function resendEmailVerification (req, res) {
  try {
    const { email } = req.query;

    const user = await User.findOne({email});

    if(!user) {
      return res.json({message: 'User not found...'});
    }

    if(user.isActive === true){
      return res.json({message: 'User already verified'})
    }

    // Generate new verification token
    user.verificationToken = crypto.randomBytes(16).toString("hex");
    await user.save();

    // Send verification email
    sendVerificationEmail(user.email, user.verificationToken);

    // Send response
    res.status(200).json({Message: 'Verification Email Sent!'});

  } catch (err) {
    console.error(`Error sending verification email: ${err}`);
    res.status(500).json({message: 'Internal server error'});
  }
}