import { createExpense, getExpenseById, updateExpense } from "../services/expenses.service.js";


const expensesController = async (req, res) => {
    const { expense_name, amount, currency, members, paidBy, createdBy, expense_date } = req.body
    try {

        if (!expense_name || !amount || !currency || !members || !paidBy || !createdBy || !expense_date) {

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

        const expense = await createExpense({
            expense_name,
            amount: Number(amount),
            members,
            currency,
            paidBy,
            createdBy,
            expense_date
        })



        return res.status(201).json({
            message: "Expense created successfully",
            expense: {
                id: expense,
                expense_name,
                amount: Number(amount),
                currency,
                paidBy: paidBy,
                createdBy: createdBy,
                expense_date,
                members
            }
        });


    } catch (err) {
        return res.status(400).json({ message: "Validation or Internal Error", err: err.message })
    }
}

const getExpenseController = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await getExpenseById(id);
        return res.status(200).json({ success: true, data: expense });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
};

const updateExpenseController = async (req, res) => {
    const { id } = req.params;
    const { expense_name, amount, currency, members, paidBy, expense_date } = req.body;

    try {
        // Basic validation if provided
        if (amount && Number(amount) <= 0) {
            return res.status(400).json({ success: false, message: "Amount must be greater than zero" });
        }
        if (members && (!Array.isArray(members) || members.length === 0)) {
            return res.status(400).json({ success: false, message: "Members must be a non-empty array" });
        }

        await updateExpense(id, { expense_name, amount, currency, members, paidBy, expense_date });

        const updatedExpense = await getExpenseById(id);

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};



export { expensesController, getExpenseController, updateExpenseController };
