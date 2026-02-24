import bcrypt from "bcrypt"
import validator from "express-validator"

import { userRegister } from "../services/users.service"
const userRegisterController = async (req, res) => {
    const { email, password, deafault_currency } = req.body
    try {

        if (!email || !password) {
            return res.status(400).json({ message: "email and password required" })

        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }
        const hash = await bcrypt.hash(password, 10);

        const user = await userRegister.createUser({
            email,
            password: hash,
            deafault_currency
        })

        return res.status(200).json({ message: "User saved", user: user })
    } catch (err) {
        return res.status(400).json({ message: "User not  saved", err })

    }
}

export { userRegisterController }