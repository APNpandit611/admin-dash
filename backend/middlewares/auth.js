import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        // request token from the cookies
        const token = req.cookies.token;

        // verify the token
        if (!token) {
            return res
                .status(401)
                .json({ 
                    message: "Unauthorized", 
                    success: false 
                });
        }

        // if verified, decode the token
        const decodedToken = await jwt.verify(token, process.env.ADMIN_SECRET_KEY)

        // if not decoded, return error message
        if (!decodedToken) {
            return res.status(403).json({
                message: "Invalid Token",
                success: false
            })
        }

        // if decoded, save the admin id in req.adminId
        req.id = decodedToken.userId
        next()

    } catch (error) {
        console.log(error);
    }
};

export default isAuth
