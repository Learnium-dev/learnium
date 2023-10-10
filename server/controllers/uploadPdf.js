const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

export const uploadPdf = (req, res) => {
  const buffer = req.file.buffer;
  const pdfFileName = req.file.originalname;

  // Use pdf-parse to extract text from the PDF
  pdf(buffer).then((data) => {
    const text = data.text;
    
    // Name the new file with the original name from the PDF
    const txtFileName = pdfFileName.replace(/\.[^.]+$/, '.txt'); 

    // Create a new .txt file with the extracted text
    const filePath = path.join(__dirname, txtFileName);
    fs.writeFileSync(filePath, text, 'utf-8');

    // Send a confirmation message and the path to the text file to the frontend
    res.json({ success: true, message: 'Text extracted and saved to extracted-text.txt' });
  });
};

