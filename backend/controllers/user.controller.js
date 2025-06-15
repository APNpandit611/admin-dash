import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
    }
};

export const createAdmin = async (req, res) => {
    try {
        // automatic admin creation.
        // hashing the password using bcrypt
        const hashedAdminPassword = await bcrypt.hash("Admin", 10);

        // creating a new admin user
        const admin = new User({
            name: "Admin",
            email: "admin@ipark.com",
            password: hashedAdminPassword,
            role: "admin",
        });

        // saving the admin user to the database
        await admin.save();

        // returning admin in response
        return res.status(201).json({
            message: "Admin created successfully",
            admin,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const adminLogin = async (req, res) => {
    try {
        // admin login controller
        // getting the admin email and password from the request body
        const { email, password } = req.body;

        // check if both the fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // check if the user exists
        let admin = await User.findOne({ email });

        // if user not found and role is not admin
        if (!admin || admin.role !== "admin") {
            return res.status(404).json({
                message: "Invalid Email or Password",
                success: false,
            });
        }

        // compare the password using bcrypt
        const isAdminPassword = await bcrypt.compare(password, admin.password);
        if (!isAdminPassword) {
            return res.status(404).json({
                message: "Invalid Email or Password",
                success: false,
            });
        }

        // create token data and store userid and role
        const tokenData = {
            userId: admin._id,
        };

        admin = {
            _id: admin._id,
            email: admin.email,
            role: admin.role,
        }
        // create the token using jsonwebtoken
        const token = jwt.sign(tokenData, process.env.ADMIN_SECRET_KEY, {
            expiresIn: "1d",
        });

        // return the token and success message
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite:"None",
                secure: true,
            })
            .json({
                message: "Welcome Admin",
                admin,
                success: true,
            });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 0,
        });

        // Return success message
        return res.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error logging out",
            success: false,
        });
    }
};

// export const verifyToken = (req, res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized", success:false });
//         }
//         // const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
//         // // if not decoded, return error message
//         // if (!decodedToken) {
//         //     return res.status(403).json({
//         //         message: "Invalid Token",
//         //         success: false,
//         //     });
//         // }
//         // res.status(200).json({ message: "Token verified", success: true });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Unauthorized Access",
//             success: false,
//         });
        
//     }
// };
