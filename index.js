const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors') 
const port = 3000



// const User = require('./routes')
app.use(cors())

const main = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

main();



app.use('/', require('./routes/index'));


app.get('/', (req, res) => {
    res.send('Hello Worldd!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})