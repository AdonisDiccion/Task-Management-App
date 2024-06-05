// import User from '../models/userSchema.js';

// export async function emailVerification (req, res) {
//     // const { token } = req.query;
//     const { verificationToken } = req.body;

//     if(!verificationToken) {
//         return res.json({error: 'Verification Token not found...'})
//     }

//     // find user by verification token
//     const user = await User.findOne({ verificationToken });

//     if(!user){
//         return res.json({error: 'Invalid Token'});
//     };

//     // Activate user's account
//     user.isActive = true,
//     user.verificationToken = undefined; // clear token
//     await user.save();

//     const token = createToken(user._id);

//     res.status(200).json({
//         username: user.username,
//         email: user.email,
//         password: user.hashPassword
        
//     })

//     res.status(200).send(`Account Verified! You Can Now Login`);

// }