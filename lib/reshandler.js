const reshandler = (res, data = null, error = false, message = '', statusCode = 200) => {
    return res.status(statusCode).json({
        data,
        error,
        message
    });
};

module.exports = reshandler;
