import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await userModel.create({ name, email, phone });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}