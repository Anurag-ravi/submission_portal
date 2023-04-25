const Admin = require('../models/admin');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { generateToken } = require('../utilities/admintoken');
const saltRounds = config.SALT_ROUNDS;

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(admin);
    res.status(200).json({ token });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(409).json({ message: 'Admin already exists' });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({ email, password: hash });
    await newAdmin.save();
    res.status(201).json({ admin: newAdmin });
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const admin = req.admin;
    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) {
        return res.status(401).json({ message: 'Wrong Password' });
    }
    const hash = await bcrypt.hash(newPassword, saltRounds);
    admin.password = hash;
    await admin.save();
    res.status(200).json({ admin });
};

const getAdmin = async (req, res) => {
    const admin = req.admin;
    res.status(200).json({ admin });
};

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users });
};

const makeUserFaculty = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.is_faculty = true;
    await user.save();
    res.status(200).json({ user });
}

const removeUserFaculty = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.is_faculty = false;
    await user.save();
    res.status(200).json({ user });
}

const makeNewAdmin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(409).json({ message: 'Admin already exists' });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({ email, password: hash });
    await newAdmin.save();
    res.status(201).json({ admin: newAdmin });
};

module.exports = {
    login,
    register,
    changePassword,
    getAdmin,
    getAllUsers,
    makeUserFaculty,
    removeUserFaculty,
    makeNewAdmin
};