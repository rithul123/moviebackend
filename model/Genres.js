const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://krishnayadhu361:krish@cluster0.afifdaa.mongodb.net/ott?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));



const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;