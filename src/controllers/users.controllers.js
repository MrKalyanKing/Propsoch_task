import bcrypt from "bcrypt"
import validator from "validator"

import { userRegister } from "../services/users.service.js"
import pool from "../db/db.js"
const userRegisterController = async (req, res) => {


    const { name, email, password, default_currency } = req.body
    console.log(email, password, default_currency)
    try {

        if (!email || !password) {
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

        const { userData } = await pool.query(
            `select * from users`, [user]
        )
        return res.status(201).json({ message: "User saved", userData: userData })
    } catch (err) {
        return res.status(400).json({ message: "User not  saved", err: err.message })

    }
}

export { userRegisterController }