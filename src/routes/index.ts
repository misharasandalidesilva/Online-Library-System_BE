
import { Router } from "express";
import authRouter from "./auth.routes";
import readerRouter from "./reader.routes";
import bookRoutes from "./book.routes";
import landingRouter from "./lending.routes";
import emilRoutes from "./email.routes";

const rootRouter =  Router()
rootRouter.use("/auth",authRouter)
rootRouter.use("/reader",readerRouter)
rootRouter.use("/book",bookRoutes)
rootRouter.use("/landing", landingRouter)
rootRouter.use("/email", emilRoutes)



export default rootRouter
