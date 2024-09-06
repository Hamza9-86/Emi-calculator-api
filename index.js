const express = require('express');
const app = express();
const emiRoutes = require('./routes/route');

app.use(express.json());
app.use('/api', emiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
