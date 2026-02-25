import getUserBalance from "../services/balance.service.js"


const balance = async (req, res) => {

    try {
        const { userId } = req.params

        const balance = await getUserBalance(Number(userId));

        return res.status(200).json({ success: true, balance: balance })
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message })

    }
}

export default balance;