const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://krishnayadhu361:krish@cluster0.afifdaa.mongodb.net/ott?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));


const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
