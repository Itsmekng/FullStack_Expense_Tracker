const responseHandler = (req, res, next) => {
    res.success = (data = null, message = "Success", statusCode = 200) => {
        console.log(data,message,statusCode)
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    };

    next();
};

module.exports = responseHandler;