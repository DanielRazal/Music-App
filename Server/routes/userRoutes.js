const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const User = require('../models/user');
const handleErrors = require("../errors/handleErrors");
const jwtToken = require("../token/jwtToken");
const Song = require('../models/song');

// Getting all
router.get('/', asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Login route
router.post('/Login', async (req, res) => {
    const user = new User(req.body);
    const users = await User.find();
    const userLogin = users.find(u => u.userName === user.userName && u.password === user.password);

    try {
        if (!userLogin) {
            return res.status(404).json({ message: 'User not found' });
        }
        else {
            const token = jwtToken(userLogin);
            return res.status(200).json({ message: 'Login successful', token, userLogin, statusCode: 200 });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
});

// Register route
router.post('/Register', asyncHandler(async (req, res) => {

    const { userName, password } = req.body;

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
        return res.status(401).json({ message: 'Username already exists' });
    }

    const newUser = new User({ userName, password });

    try {
        const savedUser = await newUser.save();
        res.status(200).json({ savedUser, message: 'Registration successful', statusCode: 200 });

    } catch (err) {
        handleErrors(err, res);
    }
}));

// Deleting All
router.delete('/', asyncHandler(async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: `Deleted all ${User.modelName} records` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Getting One
router.delete('/:userId', asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId.replace(/"/g, '');

        await Song.deleteMany({ user: userId });

        const deleteUserResult = await User.findByIdAndDelete(userId);

        if (!deleteUserResult) {
            return res.status(404).json({ message: `Cannot find ${User.modelName}` });
        }

        res.json({ message: `User has been deleted successfully.`, statusCode: 200 });

    } catch (err) {
        console.error('Error deleting user and songs:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Deleting One
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const deletedUser = await User.findById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: `Cannot find ${User.modelName} with id ${req.params.id}` });
        }

        await User.findByIdAndRemove(req.params.id);

        res.json({ message: `Deleted ${User.modelName} with id ${req.params.id}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Updating One
router.patch('/:id', asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `Cannot find ${User.modelName} with id ${req.params.id}` });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}));

module.exports = router;