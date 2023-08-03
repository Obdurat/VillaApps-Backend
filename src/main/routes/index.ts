import { Router } from "express";
import { getIssues, dispatchIssues, removeIssues } from "../../presentation";

export const endpoints: Router = Router();
    
endpoints.route("/:owner/:repo")
    .get(getIssues)
    .put(dispatchIssues);

endpoints.route("/:owner/:repo/:issue_id")
    .delete(removeIssues)
