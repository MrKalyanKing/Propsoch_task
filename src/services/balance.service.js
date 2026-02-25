import pool from "../db/db.js"

const getUserBalance = async (userId) => {

    console.log(userId)
    const balance = {}
    const expenseDetails = []

    try {
        const [userexpense] = await pool.query(

            ` Select 
                E.expense_name,
                E.paid_by,
                payer.name AS payer_name,
                Ep.user_id,
                participant.name AS participant_name,
                Ep.share_amount
            from  expense_participants Ep
            join expenses E ON Ep.expense_id = E.id
            join users payer ON E.paid_by = payer.id
            join users participant ON Ep.user_id = participant.id
            where Ep.expense_id IN (
                select expense_id
                from expense_participants
                where user_id = ?)`,
            [userId]
        )



        for (const row of userexpense) {

            const payer = Number(row.paid_by);
            const participant = Number(row.user_id);
            const amount = Number(row.share_amount);

            // If current user paid → others owe you
            if (payer === userId && participant !== userId) {

                balance[row.participant_name] =
                    (balance[row.participant_name] || 0) + amount;

                expenseDetails.push({
                    expense_name: row.expense_name,
                    type: "you_are_owed",
                    other_user: row.participant_name,
                    amount
                });
            }

            // If current user owes someone
            else if (participant === userId && payer !== userId) {

                balance[row.payer_name] =
                    (balance[row.payer_name] || 0) - amount;

                expenseDetails.push({
                    expense_name: row.expense_name,
                    type: "you_owe",
                    other_user: row.payer_name,
                    amount
                });
            }
        }
    } catch (err) {
        throw new Error("Error while fetching the expenses balance", err.message)
    }

    return { balance, expenseDetails }

}

export default getUserBalance