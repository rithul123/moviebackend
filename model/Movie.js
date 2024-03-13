const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://krishnayadhu361:krish@cluster0.afifdaa.mongodb.net/ott?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

const movieschema = new mongoose.Schema({
    MovieId:String,
    MovieName:String,
    Description:String,
    Language:String,
    Genre:String,
    image1:{
        data:Buffer,
        contentType:String,
    },
   
})
var Moviemodel=mongoose.model('movie',movieschema)
module.exports=Moviemodel;

