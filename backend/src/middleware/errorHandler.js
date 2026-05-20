const multer = require("multer");

module.exports = (err, req, res, next) => {
  console.error("ERROR 👉", err);

  // Handle file size limit error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size too large. Maximum allowed size is 5 MB."
      });
    }

    return res.status(400).json({
      message: err.message
    });
  }

  // Custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Default fallback
  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
};