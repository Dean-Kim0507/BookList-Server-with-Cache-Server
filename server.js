import express from "express";
import routes from './routes/routes.js';
import http from 'http';
const app = express();

app.use('/api/', routes);


// Error generator
app.use((error, req, res, next) => {
    res.status(400).json({ success: false, message: error })
})

const port = process.env.PORT || 5000

// app.listen(port, () => {
//     console.log(`Server Listening on ${port}`)
// });



const server = http.Server(app);
server.listen(port, () => {
    return console.log(`Server Listening on ${port}`);
});