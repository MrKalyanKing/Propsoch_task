import pool from "../db/db"

const getUserBalance = async (userId) => {



    const [userexpense] = pool.query(
        `select E.id as expense_id
        E.paid_by,
        Ep.user_id,
        Ep.share_amount
        from expense_participants Ep
        join expenses E on ep.expense_id = e.id
        where ep.user_id= ? `,
        [userId]
    )

    const balance = {}

    for (const row of userexpense) {
        const payer = row.paid_by
        const participant = row.user_id
        const share = row.share_amount

        const amount = Number(share)

        // if user paid , others owe me

        if (payer === userId && participant !== userId) {
            balance[participant] = (balance[participant] || 0) + amount
        }

        //user participates , owe payer
        else if (participant === userId && payer !== userId) {
            balance[payer] = (balance[payer] || 0) - amount
        }
    }

    return balance

}