const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

/**
 * CRUD
 * CREATE USER (POST)
 * READ USER (GET) : GENERAL GET, SINGLE GET
 * UPDATE USER (PUT)
 * DELETE USER (DELETE)
 */

//create user send data to the database

const createUser = async (req, res) => {
    try{
        const{name, email, password} = req.body
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const user = await userModel.create({
            name, email, password:hashedPassword
        })

        res.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

//log in

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res,status(404).json({
                message: "User not signed up"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(404).json({
                message: "Password is incorrect"
            })
        }

        return res.status(200).json({
            message: "Login successfully",
            data: user
        })

    }catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//GENERAL GET

const getAllUsers = async (req, res) => {
    try {
        const getAll = await userModel.find()
        return res.status(200).json({
            message: "All users fetched successfully",
            data: getAll
        })
    } catch (error) {
        return res.status(500).json({ 
            message: error.message 
        });
    }
}

// SINGLE GET
 
const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params
        const getSingle = await userModel.findById(id)
        if(!getSingle){
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            data: getSingle
        })
    } catch (error) {
        return res.status(500).json({ 
            message: error.message 
        });
    }
}

//UPDATE USER

const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {name, email, password} = req.body
        const update = await userModel.findByIdAndUpdate(id, {
            name, email, password
        }, {new: true})
        return res.status(200).json({
            message: "User updated successfully",
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params
        const deleteuser = await userModel.findByIdAndDelete(userId)
        return res.status(200).json({
            message: "User deleted successfully",
            data: deleteuser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {loginUser,createUser, getAllUsers, getSingleUser, updateUser, deleteUser}

//install bcrypt npm install bcrypt