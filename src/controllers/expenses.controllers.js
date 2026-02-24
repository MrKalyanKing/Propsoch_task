import createExpense from "../services/expenses.service"


const expensesController = async (req, res) => {
    const { name, amount, currency, members, paidBy, createdBy, expense_date } = req.body
    try {

        if (!name || !amount || !currency || !members || !paidBy || !createdBy || !expense_date) {

            return res.status(400).json({ message: "All the data fields were required" })
        }

        if (!Array.isArray(members)) {
            return res.status(400).json({ message: "members are must be an array" })
        }
        if (!members.includes(paidBy)) {
            return res.status(400).json({ message: "The payer must be include in members list" })

        }

        //checking for unique members by ids
        const uniquemembers = [...new Set(members)]

        if (uniquemembers.length !== members.length) {
            return res.status(400).json({ message: "Duplicate members are not allowed" })

        }

        //validating amount
        if (Number(amount) <= 0) {
            return res.status(400).json({ message: "The amount must be greater than or eqaul to zero" })

        }

        const expense = createExpense({
            name,
            amount: Number(amount),
            members,
            currency,
            paidBy,
            createdBy,
            expense_date
        })

        return res.status(200).json({ message: "The expenses are created" })


    } catch (err) {
        return res.status(400).json({ message: "Internal Error", err: err })
    }
}

export { expensesController }