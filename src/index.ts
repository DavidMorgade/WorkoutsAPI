import Server from './models/server';
import dotenv from 'dotenv';

// dotenv for environment variables
dotenv.config();

const server = new Server();

server.listen();