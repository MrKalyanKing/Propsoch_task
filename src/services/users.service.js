import db from "../db/db.js"

const userRegister = async ({ email, password, default_currency = "INR" }) => {


    const [existingUser] = await db.query(
        "select id from users WHERE email=? ",
        [email]
    )

    if (existingUser.length > 0) {
        throw new Error("Email already exists");
    }

    const [result] = await db.query(
        "insert into users (email, password, default_currency) values (?, ?, ?) ",
        [email, password, default_currency]
    )

    return result;

}

export { userRegister }