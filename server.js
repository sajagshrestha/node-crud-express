import express from "express";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());

server.use("/auth", authRoutes);
server.use("/admin", adminRoutes);

server.use((err, req, res, next) => {
	res.status(500).json({ error: err, msg: "Something went wrong" });
});

server.listen(PORT, () => console.log("server is up and running"));
