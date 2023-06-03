import express from "express";
import fileUpload from "express-fileupload";
import postsRoutes from "./routes/posts.routes.js"
import authRoutes from "./routes/auth.routes.js"
import ventasRoutes from "./routes/ventas.routes.js"
import cors from "cors";

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://jn-telecom.onrender.com/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//middlewares
app.use(cors())
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}))

//routes
app.use(postsRoutes)
app.use(authRoutes)
app.use(ventasRoutes)

export default app