import e from "express";
import router from "./routes.ts";
import cors from "cors";

const PORT = 8080;

const app = e();
app.use(e.json());
app.use(cors());
app.use(router);

app.listen(PORT, "0.0.0.0", () => {
    console.log("Listening on port: ${port}");
});
