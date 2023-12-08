const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const uploadPdf = (req, res) => {
  const buffer = req.file.buffer;
  const pdfFileName = req.file.originalname;

  // Use pdf-parse to extract text from the PDF
  pdf(buffer).then((data) => {
    const text = data.text;

    // Name the new file with the original name from the PDF
    const txtFileName = pdfFileName.replace(/\.[^.]+$/, '.txt');

    // Create a new .txt file with the extracted text
    const filePath = path.join(__dirname, txtFileName);

    // Use fs.writeFile to write the text to the file asynchronously
    fs.writeFile(filePath, text, 'utf-8', (err) => {
      if (err) {
        console.error(err);
        res.json({ success: false, message: "An error occurred while saving the text to a file." });
      } else {
        res.json({ success: true, message: "Text extracted and saved to a file.txt" });
      }
    });

  });
};

module.exports = uploadPdf;
