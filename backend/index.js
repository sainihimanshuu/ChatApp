import connectToDatabase from "./src/database/index.js";
import { httpServer } from "./src/socket/socket.js";

const PORT = process.env.PORT;

connectToDatabase()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log("listening to port", PORT);
        });
    })
    .catch((error) => {
        console.log("error while connecting to mongoDB", error);
    });
