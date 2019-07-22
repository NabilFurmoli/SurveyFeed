
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({age: 22});
})

// TO Find the underlying port number heroku assignes us in runtime, if not 5000 by default
const PORT = process.env.PORT || 5000; 
app.listen(PORT)