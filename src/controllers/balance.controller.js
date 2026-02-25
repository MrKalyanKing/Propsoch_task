import getUserBalance from "../services/balance.service.js"


const balance = async (req, res) => {
    try {
        const { userId } = req.params;

        const data = await getUserBalance(Number(userId));

        return res.status(200).json({ success: true, data });

    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export default balance;