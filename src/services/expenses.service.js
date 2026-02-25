import pool from "../db/db.js";

const createExpense = async (data) => {
    const { expense_name, amount, currency, members, paidBy, createdBy, expense_date } = data;
    let connection = null;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Checking for existing users in members list
        const memberHolders = members.map(() => "?").join(",");
        const [users] = await connection.query(
            `select id from users where id in (${memberHolders})`,
            members
        );

        if (users.length !== members.length) {
            throw new Error("One or more users in the members list do not exist.");
        }

        // Checking for creator existence
        const [creator] = await connection.query(
            "select id from users where id = ?",
            [createdBy]
        );

        if (creator.length === 0) {
            throw new Error("The user who created this expense does not exist.");
        }

        // Insert expense
        const [expenseRes] = await connection.query(
            `insert into expenses (expense_name, amount, currency, paid_by, created_by, expense_date) 
             values (?, ?, ?, ?, ?, ?)`,
            [expense_name, amount, currency, paidBy, createdBy, expense_date]
        );

        const expenseId = expenseRes.insertId;

        // Calculating equal split
        const share = (Number(amount) / members.length).toFixed(2);

        // Insert participants
        for (let userId of members) {
            await connection.query(
                `insert into expense_participants (expense_id, user_id, share_amount) 
                 values (?, ?, ?)`,
                [expenseId, userId, share]
            );
        }

        //commited

        await connection.commit();
        return { expenseId };

    } catch (err) {

        //if anything goes wrong rollback

        if (connection) await connection.rollback();
        console.error("Error in createExpense service:", err.message);
        throw err;
    }
    // finally {
    //     if (connection) connection.release();
    // }
};

export default createExpense