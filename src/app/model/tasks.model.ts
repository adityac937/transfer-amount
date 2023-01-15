export class TaskItem {
    taskName: string;
    taskCompleted: boolean;

    constructor(args) {
        this.taskName = args.taskName;
        this.taskCompleted = args.taskCompleted;
    }
}