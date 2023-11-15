const handleErrors = (err, res) => {
    if (err.errors) {
        const errorMessages = [];
        for (const key in err.errors) {
            if (err.errors.hasOwnProperty(key)) {
                errorMessages.push(err.errors[key].message);
            }
        }
        res.status(400).json({ message: errorMessages });
    } else {
        res.status(400).json({ message: err.message });
    }
}

module.exports = handleErrors;