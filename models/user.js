// user model for JWT authentication
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//  Mongoose middleware to hash password with bcrypt before saving to database
// Example Workflow
// Generate Salt: bcrypt generates a salt using the specified cost factor.
// Hash Password: bcrypt combines the salt with the password and applies the hashing algorithm multiple times.
// Store Hash: The final hash, including the salt and cost factor, is stored in the database.

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

module.exports = mongoose.model('User', userSchema);