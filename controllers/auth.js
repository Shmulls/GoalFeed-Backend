import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import User from '../models/User.js';

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      phoneNumber,
      team,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      phoneNumber,
      team,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist. ');
      return res.status(400).json({ msg: 'User does not exist. ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials. ');
      return res.status(400).json({ msg: 'Invalid credentials. ' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    // if dont work delete the return in the next line
    return res.status(500).json({ error: err.message });
  }
};

async function sendNewPasswordEmail(email, newPassword) {
  console.log(email, newPassword);
  // Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter:
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: 'sshmoel1@gmail.com', // Your email address
      pass: 'tcgrrxnsvfmxrmlt', // Password (for gmail, your app password)
    },
  });

  const info = await transporter.sendMail({
    from: 'sshmoel1@gmail.com',
    to: `${email}`,
    subject: 'Your new password',
    html: `
    <h1>Hello there from GoalFeed System</h1>
    <p>Your new password: ${newPassword}</p>
    `,
  });

  console.log(info.messageId);
}

// Helper function to generate a random password
function generateRandomPassword() {
  const newPassword = randomstring.generate({
    length: 10, // Set the desired length of the password
    charset: 'alphanumeric', // Use a combination of alphabets and numbers
  });

  console.log(newPassword);

  return newPassword;
}

/* EMAIL VERIFICATION */
export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: 'User doesn\'t exist' });
    }
    // Generate a new random password
    const newPassword = generateRandomPassword();

    // Update the user's password with the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    oldUser.password = hashedPassword;
    await oldUser.save();

    // Send the new password to the user via email or notify to check email for the new password
    await sendNewPasswordEmail(oldUser.email, newPassword);

    return res.status(200).json({
      message:
        'Password reset successful. Check your email for the new password.',
    });
  } catch (error) {
    console.log(error);
    // Handle any potential errors
    return res.status(500).json({ message: 'An error occurred' });
  }
};
