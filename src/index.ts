import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
const port = 3000;

const app = express();
// middleware to parse incoming request
app.use(express.json());
// Middleware
app.use(morgan('common'));
// http security middleware
app.use(helmet());
// limit requests to increase security
app.use(
    rateLimit({
        windowMs: 60 * 60 * 1000, // 15 minutes
        max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'TOO MANY REQUESTS!!',
    })
);

// get request
app.get('/', (req, res) => {
    throw new Error('ERROR EXIST');

    res.send('hello world!');
});
// post request
app.post('/', (req, res) => {
    res.send('hello world from post!');
    console.log(req.body);
});

app.use(errorMiddleware);
app.use((_req, res) => {
    res.status(404).json({
        message: 'go to main',
    });
});

// listening on port
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

export default app;
