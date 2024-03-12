const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://krishnayadhu361:krish@cluster0.afifdaa.mongodb.net/ott?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

const logschema=new mongoose.Schema({
    username:String,
    password:String,
})
var Loginmodel=mongoose.model("log",logschema)
module.exports=Loginmodel