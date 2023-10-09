// Create a Node.js server
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');

const app = express();
const port = 3000;

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    const responseObject = {
      success: true,
      message: 'Hello from backend',
    };
  
    res.json(responseObject);
  });

app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  const buffer = req.file.buffer;

  // Use pdf-parse to extract text from the PDF
  pdf(buffer).then((data) => {
    const text = data.text;
    res.json({ text });
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
