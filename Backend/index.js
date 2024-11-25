const port = 4000;
const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//Database connection
mongoose.connect("mongodb+srv://jeslyjames5:Kallimel123@cluster0.q5ih4qe.mongodb.net/bakeryDB");

//API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//Creating schema product
const product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
})
 
app.post('/addproduct',async (req,res)=>{
    let products = await product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id = 1;
    }
    const product = new product({
        id:id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        imageUrl:req.body.imageUrl,
        category:req.body.category,
        stock:req.body.stock,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        succes:true,
        name:req.body.name,
    })
})
//Creating API to get products
app.get('/allProducts',async (req,res) =>{
    let products = await product.find({});
    console.log("All product fetched");
    res.send(products);
})

//creating endpoint for feature product
app.get('/featureproduct',async(req,res)=>{
    let products = await product.find({});
    let featureproduct = products.slice(1).slice(-8);
    console.log("Feature Product fetched");
    res.send(featureproduct);
})

//create a middleware to fetch user
const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        console.log("no token provided");
        res.status(401).send({errors:"Please authenicate using vaild token"});
    }
    else{
        try{
            console.log(token);
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user.id;
            console.log("User authenticated:", req.user);
            next();
        }
        catch(error){
            res.status(401).send({errors:"Please authenicate using vaild token"});
        }
    }
}

//  Creating endpoint for addtocart
app.post('/addtocart',fetchUser,async(req,res) =>{
  console.log(req.body,req.user); 
  let UserData = await Users.findOne({_id:req.user});
    UserData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user},{cartData:UserData.cartData});
    res.send("Added");
})
//Creating API to remove product 
app.post('/removefromcart',fetchUser,async (req,res) =>{
    console.log("removed",req.body.itemId);
    let UserData = await Users.findOne({_id:req.user});
    if(UserData.cartData[req.body.itemId]>0)
    UserData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user},{cartData:UserData.cartData});
    res.send("Removed");
})

//creating end point to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("get cart");
    let userData = await Users.findOne({_id:req.user});
    res.json(userData.cartData);
})
//Creating api to store user
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    role:{
        type:String,
        default:"Customer",
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating endpoint for user
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same Email ID"})
    }
    let cart = {};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    
    const data ={
        user:{
            id:user.id, 
            role: user.role
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token, role: user.role })
})

//Creating endpoint for userlogin
app.post('/login',async (req,res) =>{
    console
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id,
                    role: user.role
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token, role: user.role });
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email ID"});
    }
})
app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error: "+error)
    }
})
