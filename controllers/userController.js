const path = require("path");

// Helper function to decode base64 and check mime type and size
const decodeBase64File = (base64Str) => {
  // Check if the base64 string exists, if not return invalid
  if (!base64Str) {
    return {
      isValid: false,
      fileMimeType: null,
      fileSizeKB: 0,
    };
  }

  try {
    // Decode the base64 string to a buffer
    const buffer = Buffer.from(base64Str, "base64");
    const fileSizeKB = buffer.length / 1024; // Convert file size to KB

    // Define MIME type patterns (you can add more if needed)
    const mimeTypes = {
      jpeg: "/9j/",
      png: "iVBORw0KGgo",
      pdf: "JVBERi0xLj",
    };

    let fileMimeType = "";

    // Identify the MIME type from the base64 header
    if (base64Str.startsWith(mimeTypes.jpeg)) {
      fileMimeType = "image/jpeg";
    } else if (base64Str.startsWith(mimeTypes.png)) {
      fileMimeType = "image/png";
    } else if (base64Str.startsWith(mimeTypes.pdf)) {
      fileMimeType = "doc/pdf";
    } else {
      fileMimeType = "application/octet-stream"; // Fallback MIME type for unknown files
    }

    // Return the file details
    return {
      isValid: true,
      fileMimeType,
      fileSizeKB: fileSizeKB.toFixed(2), // Limit to two decimal points
    };
  } catch (err) {
    // In case of any errors during decoding, consider the file invalid
    return {
      isValid: false,
      fileMimeType: null,
      fileSizeKB: 0,
    };
  }
};

// POST API to process the input data
exports.processData = (req, res) => {
  const { data, file_b64 } = req.body;
  let is_success = true;

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(
    (item) => item === item.toLowerCase()
  );
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  // Handle base64 file (decode base64) or mark as invalid if not provided
  let fileData = { isValid: false, fileMimeType: null, fileSizeKB: 0 };
  if (file_b64) {
    fileData = decodeBase64File(file_b64);
    if (!fileData.isValid) {
      is_success = false;
    }
    if (fileData.fileMimeType == "application/octet-stream") {
      fileData.fileMimeType = null;
    }
  }

  // Construct and return the response
  res.status(200).json({
    is_success,
    user_id: "Debojyoti_Chanda_05022003", // Format: {full_name_ddmmyyyy}
    email: "debojyoti_debasish@srmap.edu.in",
    roll_number: "AP21110011138",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileData.isValid,
    file_mime_type: fileData.fileMimeType,
    file_size_kb: fileData.fileSizeKB,
  });
};


 // GET API to return hardcoded response
exports.getOperationCode = (req, res) => {
    try {
        // Hardcoded response
        const response = {
            "operation_code": 1
        };

        // Return the response with status 200
        res.status(200).json(response);
    } catch (error) {
        // In case of any error, return a generic error response
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
