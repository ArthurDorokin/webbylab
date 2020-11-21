module.exports = (res, error) => {
    res.status(422).json({
        success: false,
        message: error.message ? error.message : error
    })
}