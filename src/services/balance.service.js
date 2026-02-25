import pool from "../db/db.js"

const getUserBalance = async (userId) => {

    console.log(userId)
    const balance = {}

    try {
        const [userexpense] = await pool.query(
            `select 
                E.id as expense_id,
                E.paid_by,
                Ep.user_id,
                Ep.share_amount
            from expense_participants Ep
            join expenses E on Ep.expense_id = E.id
            where Ep.user_id= ? `,
            [userId]
        )



        for (const row of userexpense) {
            const payer = row.paid_by
            const participant = row.user_id
            const share = row.share_amount

            const amount = Number(share)

            // if user paid , others owe to user

            if (payer === userId && participant !== userId) {
                balance[participant] = (balance[participant] || 0) + amount
            }

            //user is  participates , user owes to other
            else if (participant === userId && payer !== userId) {
                balance[payer] = (balance[payer] || 0) - amount
            }
        }
    } catch (err) {
        throw new Error("Error while fetching the expenses balance", err.message)
    }

    return balance

}

export default getUserBalance