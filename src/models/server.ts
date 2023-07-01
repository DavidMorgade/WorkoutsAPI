import express from 'express';
//Types
import { IPaths, IServer } from '../types/global';
// Routers
import workoutsRouter from '../routes/workouts';
import usersRouter from '../routes/users';
// database
import dbConnection from '../db/config';
// middlewares
import cors from 'cors';  

class Server implements IServer {
    readonly app: express.Application;
    readonly paths: IPaths;
    readonly port: string;

    constructor() {
        this.app = express();
        this.paths = {
            users: '/api/users',
            workouts: '/api/workouts'
        };
        this.port = process.env.PORT || '3000';
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    // routes for express app
    routes() {
        // test route
        this.app.get('/ping', (_req, res) => {
            console.log('someone pinged here' + " " + new Date().toLocaleDateString());
            res.send('pong');
        });
        // workouts route
        this.app.use(this.paths.workouts, workoutsRouter);
        // users route
        this.app.use(this.paths.users, usersRouter);
    };
    // start the express server and listen on dotenv port
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    // connect to database method
    connectDB = async () => {
        await dbConnection();
    }
    // middlewares for express app
    middlewares() {
        // cors for cross origin resource sharing
        this.app.use(cors())
        // parse body to json
        this.app.use(express.json());
        // public directory
        this.app.use(express.static('public'));
    }
}


export default Server;