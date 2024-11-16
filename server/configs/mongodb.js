import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB está conectado");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`);

        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Salir del proceso con un error
    }
};

export default connectDB;