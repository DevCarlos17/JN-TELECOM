import { connectDB } from "./db.js";
import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, "0.0.0.0")
connectDB();
