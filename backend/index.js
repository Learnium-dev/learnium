// Create a Node.js server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdf = require('pdf-parse');

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
    const pdfFileName = req.file.originalname;

  
    // Use pdf-parse to extract text from the PDF
    pdf(buffer).then((data) => {
      const text = data.text;
      
      // name the new file with the original name from the pdf
      const txtFileName = pdfFileName.replace(/\.[^.]+$/, '.txt'); 

  
      // Create a new .txt file with the extracted text
      const filePath = path.join(__dirname, txtFileName);
      fs.writeFileSync(filePath, text, 'utf-8');
  
      // Send a confirmation message and the path to the text file to the frontend
      res.json({ success: true, message: 'Text extracted and saved to extracted-text.txt' });
    });
  });


// app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
//   const buffer = req.file.buffer;

//   // Use pdf-parse to extract text from the PDF
//   pdf(buffer).then((data) => {
//     const text = data.text;
//     res.json({ text });
//   });
// });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
