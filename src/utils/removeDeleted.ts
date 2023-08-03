import Issue from "../domain/issueDTO";

export const removeDeleted = (FirstArray: Issue[], SecondArray: string[]) => {
  const normalized1 = FirstArray.map((iss: Issue) => new Issue(iss))
  const result = normalized1.filter((issue: Issue) => !SecondArray.includes(`${issue.id}`));
  return result
}