import whDispatcher from "../data/whDispatcher";
import Issue from "../domain/issueDTO";
import { scheduleJob, cancelJob, scheduledJobs, rescheduleJob } from 'node-schedule'

export default class Scheduler {
  
  static repositories: { [key: string]: Issue[] } = {};

  static removedIssues: { [key: string]: string[] } = {};

  static setSchedules(identifier: string ,schedules: Issue[]): void {
    const normalize = schedules.map((issue) => {
      if (!issue.scheduled_to) issue.scheduled_to = new Date(Date.now() + (30000 + (Object.keys(scheduledJobs).length * 1000)));
      Scheduler.setDispatch(issue, identifier)
      return issue;
    });
    Scheduler.repositories[identifier] = normalize;
    return;
  }

  static getSchedules(identifier: string): Issue[] {
    return this.repositories[identifier];
  }

  static removeSchedule(identifier: string, issue_id: string): void {
    if (scheduledJobs[issue_id]) cancelJob(issue_id);
    const index = this.repositories[identifier].findIndex(issue => issue.id === issue_id);
    this.repositories[identifier].splice(index, 1);
    return;
  }

  private static setDispatch(issue: Issue, identifier: string): void {
    if (issue.scheduled_to === undefined) return;
    if (scheduledJobs[issue.id]) { rescheduleJob(issue.id, issue.scheduled_to); return; }
    scheduleJob(`${issue.id}`, issue.scheduled_to, () => { whDispatcher(issue); Scheduler.removeSchedule(identifier, issue.id) });
    return;
  }

  static removeIssue(identifier: string, issue_id: string): void {
    if (!Scheduler.removedIssues[identifier]) {
      Scheduler.removedIssues[identifier] = [issue_id]
      return;
    }
    Scheduler.removedIssues[identifier].push(issue_id);
  }
}