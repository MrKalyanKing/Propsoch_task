
const errHandler = (err, req, res, next) => {
    console.log(err)
    res.status(400).json({
        message: "Internal server err", err
    })
}

export default errHandler