import bcrypt from "bcrypt"
import validator from "validator"

import { getUserProfile, updateUserProfile, userRegister } from "../services/users.service.js"
import pool from "../db/db.js"
const userRegisterController = async (req, res) => {


    const { name, email, password, default_currency } = req.body
    console.log(email, password, default_currency)
    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: "email and password required" })

        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }
        const hash = await bcrypt.hash(password, 10);

        const user = await userRegister({
            name,
            email,
            password: hash,
            default_currency
        })


        return res.status(201).json({
            message: "User saved",
            user: {
                id: user,
                name,
                email,
                default_currency: default_currency || "INR"
            }
        });
    } catch (err) {
        return res.status(400).json({ message: "User not  saved", err: err.message })

    }
}


const getUserProfileController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserProfile(userId);
        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
}

const updateUserProfileController = async (req, res) => {
    const { userId } = req.params;
    const { email, default_currency } = req.body;

    try {
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        await updateUserProfile(userId, { email, default_currency });

        // Fetch updated user
        const updatedUser = await getUserProfile(userId);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export { userRegisterController, getUserProfileController, updateUserProfileController }
