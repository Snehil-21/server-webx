const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.signupUser = async(req, res) => {
    const { fullName, email, username, password } = req.body;
    try {
        const userEmail = await User.findOne({email});
        if(userEmail) {
            res.status(200).json({success: false, message: 'Email already in use!'});
        }
        
        const userName = await User.findOne({username});
        if(userName) {
            res.status(200).json({success: false, message: 'Username already in use!'});
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        
        const user = new User({
            fullName, email, username, hashPassword
        });
        await user.save();
        return res.status(200).json({success: true, message: 'User signed up successfully!'})
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    };
}

exports.loginUser = async(req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({username});

        if(!user) {
            return res.status(200).json({success: false, message: 'No user found'});
        }

        if(await bcrypt.compare(password, user.hashPassword)) {
            return res.status(200).json({success: true, message: {fullName: user.fullName, email: user.email, username: user.username}})
        }
        return res.status(200).json({success: false, message: 'Incorrect username or password'})
    } catch(error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.signupAdmin = async(req, res) => {
    const { fullName, email, username, password } = req.body;
    try {
        const adminEmail = await Admin.findOne({email});
        if(adminEmail) {
            res.status(200).json({success: false, message: 'Email already in use!'});
        }
        
        const adminName = await Admin.findOne({username});
        if(adminName) {
            res.status(200).json({success: false, message: 'Username already in use!'});
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        
        const admin = new Admin({
            fullName, email, username, hashPassword
        });
        await admin.save();
        return res.status(200).json({success: true, message: 'Admin signed up successfully!'})
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    };
}

exports.loginAdmin = async(req, res) => {
    const { username, password } = req.body;

    try{
        const admin = await Admin.findOne({username});

        if(!admin) {
            return res.status(200).json({success: false, message: 'No admin found'});
        }

        if(await bcrypt.compare(password, admin.hashPassword)) {
            return res.status(200).json({success: true, message: {fullName: admin.fullName, email: admin.email, adminname: admin.username}})
        }
        return res.status(200).json({success: false, message: 'Incorrect username or password'})
    } catch(error) {
        res.status(400).json({success: false, message: error.message});
    }
}