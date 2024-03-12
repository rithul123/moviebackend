const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://krishnayadhu361:yadhu123@cluster0.nc7cqgh.mongodb.net/ott?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

const studentschema=new mongoose.Schema({
    FullName:String,
    PhoneNO:Number,
    Email:Character,
    Password:Password,
    ConfirmPassword:Passowrd,
   
});

var studentmodel=mongoose.model('student',studentschema)
module.exports=studentmodel;

