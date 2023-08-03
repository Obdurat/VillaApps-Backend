import Issue from "../domain/issueDTO"
import { scheduledJobs } from "node-schedule"

type whContent = {
  content: string
}

type Webhook = {
  data: whContent[]
}

export const removePublished = (ghIssuesArray: Issue[], webhookIssuesArray: Webhook) => {
  const normalizedGH = ghIssuesArray.map((iss: Issue) => new Issue(iss))
  const normalizedWebhook = webhookIssuesArray.data.map((iss) => new Issue(JSON.parse(iss.content)));
  const mapper = new Map();
  normalizedGH.concat(normalizedWebhook).forEach((obj) => {
    const objKey = obj.id;
    if (mapper.has(objKey) || scheduledJobs[objKey]) { mapper.delete(objKey); return; }
    if (!mapper.has(objKey)) { mapper.set(objKey, obj); return;}
  });

  return Array.from(mapper.values());
}