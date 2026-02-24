
import db from "../db/db.js"

const userRegister = async (email, password, currency = "INR") => {

    const [existingUser] = await db.query(
        "select id from users WHERE email=? "
        [email]
    )

    if (existingUser.length > 0) {
        throw new Error("Email already exists");
    }

    const [result] = db.query(
        "insert into (email,password,currency) users values (? ? ?) "
        [email, password, currency]
    )

    return { id: result.id, email, currency }

}

export { userRegister }