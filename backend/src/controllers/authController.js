const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "123456") {
        return res.json({
            message: "Login successful",
            user: {
                email: email,
                role: "admin"
            }
        });
    }

    res.status(401).json({
        message: "Invalid email or password"
    });
};

module.exports = {
    loginUser
};