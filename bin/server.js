const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(process.cwd()+"/dist"));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});