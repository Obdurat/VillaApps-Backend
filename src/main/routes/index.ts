import { Router } from "express";
import { Handler } from "../../presentation";

export const endpoints: Router = Router();
    
endpoints.route("/:owner/:repo")
    .get(Handler)

