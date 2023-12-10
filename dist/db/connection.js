import { connect, disconnect } from "mongoose";
export default async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("DB Connected");
    }
    catch (error) {
        throw new Error("Cannot connect to DB");
    }
}
async function disconnectFromDataBase() {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error("Cannot disConnect to DB");
    }
}
export { connectToDatabase, disconnectFromDataBase };
//# sourceMappingURL=connection.js.map