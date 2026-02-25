import db from "../db/db.js"

const userRegister = async ({ name, email, password, default_currency = "INR" }) => {


    const [existingUser] = await db.query(
        "select id from users WHERE email=? ",
        [email]
    )

    if (existingUser.length > 0) {
        throw new Error("Email already exists");
    }

    const [result] = await db.query(
        "insert into users (name,email, password, default_currency) values (?, ?, ?,?) ",
        [name, email, password, default_currency]
    )

    return result.insertId;

}


const getUserProfile = async (userId) => {
    const [user] = await db.query(
        "select id, name, email, default_currency from users where id = ?",
        [userId]
    )

    if (user.length === 0) {
        throw new Error("User not found")
    }

    return user[0];
}

const updateUserProfile = async (userId, { email, default_currency }) => {
    // Check if email already exists for another user
    if (email) {
        const [existingUser] = await db.query(
            "select id from users where email = ? and id != ?",
            [email, userId]
        )
        if (existingUser.length > 0) {
            throw new Error("Email already in use by another account")
        }
    }

    const [result] = await db.query(
        "update users set email = coalesce(?, email), default_currency = coalesce(?, default_currency) where id = ?",
        [email, default_currency, userId]
    )

    if (result.affectedRows === 0) {
        throw new Error("Failed to update profile or user not found")
    }

    return result;
}

export { userRegister, getUserProfile, updateUserProfile }
