const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Models
const Moviemodel = require('./model/Movie');
const Loginmodel = require('./model/Login');
const Genre = require('./model/Genres');
const Language = require('./model/Language'); // Update the path to Language model

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://krishnayadhu361:krish@cluster0.afifdaa.mongodb.net/ott?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Multer configuration for video uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const videoUpload = multer({ storage: videoStorage });

// Route to handle video uploads
app.post('/video/upload', videoUpload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('Video uploaded successfully.');
});

// Serve uploaded videos statically
app.use('/videos', express.static(path.join(__dirname, 'uploads')));

// Route to upload a video
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
});

// Serve uploaded videos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to add a new movie
app.post('/new', upload.single('image1'), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { MovieId, MovieName, Description, Language, Genre } = req.body;
    const newdata = Moviemodel({
      MovieId,
      MovieName,
      Language,
      Description,
      Genre,
      image1: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    console.log('New data:', newdata);
    await newdata.save();

    res.status(200).json({ message: 'Record saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to view all movies
app.get('/view', async (req, res) => {
  try {
    const data = await Moviemodel.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to edit a movie
app.put('/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Moviemodel.findByIdAndUpdate(id, req.body);
    res.send('Record updated');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to search for login
app.post('/Loginsearch', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Loginmodel.findOne({ username, password });
    console.log(user);
    if (user) {
      res.json({ success: true, message: 'Login successfully' });
    } else {
      res.json({ success: false, message: 'Invalid Username or email' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
});

// POST route to add a new genre
app.post('/genres', async (req, res) => {
  const { name } = req.body;

  try {
    const newGenre = new Genre({ name });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    console.error('Error adding genre:', error);
    res.status(500).json({ error: 'Failed to add genre' });
  }
});

// POST route to add a new language
app.post('/languages', async (req, res) => {
  const { name } = req.body;

  try {
    const newLanguage = new Language({ name });
    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error('Error adding language:', error);
    res.status(500).json({ error: 'Failed to add language' });
  }
});

// Get movie by ID
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Moviemodel.findById(id);
    res.json(movie);
  } catch (error) {
    console.error('Error getting movie by ID:', error);
    res.status(500).json({ error: 'Failed to get movie by ID' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
