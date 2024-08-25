const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
  try {
    const response = {
      operation_code: 1,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array.",
      });
    }
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array.",
      });
    }
    // User details
    const userId = 'tanmay_agarwal_10102002';
    const email = 'tanmay10agarwal@gmail.com';
    const rollNumber = '21BDS0347';

    // Filter numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter(
      (item) => isNaN(item) && typeof item === 'string'
    );

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(
      (char) => char >= 'a' && char <= 'z'
    );
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
    const response = {
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});

app.all('*', (req, res) => {
  res.status(500).json({ error: 'This route is not defined' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
