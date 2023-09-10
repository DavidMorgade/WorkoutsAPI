type apiPath = `/api/${string}`;

export interface IPaths {
    users: apiPath;
    workouts: apiPath;
    auth: apiPath;
}
export interface IServer {
    readonly app: Express.Application;
    readonly paths: IPaths;
    readonly port: string;


    readonly connectDB: () => void;
    readonly routes: () => void;
    readonly middlewares: () => void;
    readonly listen: () => void;

}