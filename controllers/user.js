import User from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/features.js"
import ErrorHandler from "../middleware/err.js";



export const getRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user)
            return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });
        setCookies(user, res, "Registered Succesfully", 201);

    } catch (error) {
        next(error);
    }
};


export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};

export const getLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return next(new ErrorHandler("Invalid email or Password", 404));


        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch)
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Pasword",
            });
        setCookies(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error);
    }
};

export const getLogout = (req, res) => {

    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Developement" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });

}