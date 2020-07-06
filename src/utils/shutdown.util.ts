import { closeDb } from "../db/database";

const gracefulShutdown = () => {
    closeDb();
};

const onShutdown = () => {
    process
        .on('uncaughtException', error => {
            console.error(error);
        })
        .on('beforeExit', gracefulShutdown);
}

export { onShutdown };