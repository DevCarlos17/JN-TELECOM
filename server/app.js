import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import contactRoutes from "./routes/contacts.routes.js"
import recordsRoutes from "./routes/financialRecord.routes.js";
import verticalGrowthRoutes from "./routes/verticalGrowth.routes.js"
import ScheduledContactsRoutes from "./routes/scheduledContact.routes.js";
import streamingRoutes from "./routes/streaming.routes.js"


const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://jn-telecom.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



//middlewares
app.use(cors())
app.use(express.json({ limit: '500mb' }))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}))

//routes
app.use(contactRoutes)
app.use(authRoutes)
app.use(ventasRoutes)
app.use(recordsRoutes)
app.use(verticalGrowthRoutes)
app.use(ScheduledContactsRoutes)
app.use(streamingRoutes)


export default app