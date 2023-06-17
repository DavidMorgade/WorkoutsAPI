import express from 'express';

import workoutsRouter from './routes/workouts';

const app = express();

app.use(express.json()); //middleware that allows express to parse incoming json data

const PORT = 3000;


app.get('/ping', (_req, res) => {
    console.log('someone pinged here' + " " + new Date().toLocaleDateString());
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/workouts', workoutsRouter);