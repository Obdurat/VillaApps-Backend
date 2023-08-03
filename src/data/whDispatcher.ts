import Issue from "../domain/issueDTO";

export default async function whDispatcher(issue: Issue): Promise<void> {
  const URL = 'https://webhook.site/59dd4e34-3883-4e4f-8eec-e3233fb8a54d'
  await fetch(URL, { method: 'POST', body: JSON.stringify(issue), headers: { 'Content-Type': 'application/json' } })
  return;
}