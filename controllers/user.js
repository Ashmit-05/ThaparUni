const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

class User {
    async signUp(req,res) {
        let {name,email,phoneNumber,password,confirmPassword} = req.body;
        if(password !== confirmPassword) {
            return res.send({error : "Passwords do not match!"});
        }
        if(password.length < 8) {
            return res.send({error : "Password must be at least 8 characters"});
        }
        if(!name || !email || !password || !phoneNumber) {
            return res.send({error : "All fields are required"});
        }
        if(phoneNumber.length !== 10) {
            return res.send({error : "Please enter a valid phone number"});
        }
        // WRITE A MIDDLEWARE TO VALIDATE EMAIL
        try{
            const user = await UserModel.findOne({email : email, phoneNumber : phoneNumber});
            if(user) {
                return res.send({error : "User already exists!"});
            }
            password = bcrypt.hashSync(password,10);
            const newUser = new UserModel({name,email,phoneNumber,password});
            const savedUser = await newUser.save();
            if (savedUser) {
                return res.send({success : "User created successfully"});
            }
        } catch(err) {
            console.log("An error occured while signing up");
            console.log(err);
        }
    }
    async signIn(req,res) {
        const {email,password} = req.body;
        try {
            const user = await UserModel.findOne({email : email});
            if(!user) {
                return res.send({error : "User does not exist!"});
            } else {
                const confirmPassword = await bcrypt.compare(password,user.password);
                if(confirmPassword) {
                    return res.json({
                        success : "Logged in successfully!",
                        user : user
                    })
                } else {
                    return res.send({error : "Wrong credentials!"});
                }
            }
        } catch(err) {
            console.log("An error occured while signing in");
            console.log(err);
        }
    }
}

const userController = new User();
module.exports = userController;