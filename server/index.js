const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors())

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
 },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
 });

 const upload = multer({ storage });


//check
app.post('/', (req, res) => {
  res.send("ok");
});


// Serve the React build
app.use(express.static(path.join(__dirname, 'client/build')));

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
   console.log(req.file);
  res.send('File uploaded successfully.');
});


app.get('/api/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName);
  
    try {
      if (fs.existsSync(filePath)) {
        // If file exists, serve it
        res.sendFile(filePath);
      } else {
        // If file does not exist, return 404
        res.status(404).send('File not found.');
      }
    } catch (error) {
      // Handle server error
      console.error('Error downloading file:', error);
      res.status(500).send('Internal server error.');
    }
  });



  app.delete('/api/delete/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName);
  
    try {
      if (fs.existsSync(filePath)) {
        // If file exists, delete it
        fs.unlinkSync(filePath);
        res.send('File deleted successfully.');
      } else {
        // If file does not exist, return 404
        res.status(404).send('File not found.');
      }
    } catch (error) {
      // Handle server error
      console.error('Error deleting file:', error);
      res.status(500).send('Internal server error.');
    }
  });





  


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
