exports.upload = async (req, res) => {
    console.log("Inside upload PDF function");
    const pdfFile = req.file.filename;
    try {
        res.status(200).json({ message: "Upload PDF successfully" }); // Sending JSON object as response
    } catch (error) {
        res.status(401).json({ error: `Request failed ${error}` }); // Sending JSON object as response
    }
};
