import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskItem } from '../model/tasks.model';
import { LocalStorageService } from '../services/local-storage-service';
@Component({
    selector: 'todo-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterContentInit {
    name: string;
    alltasks = [];
    allTasksName = [];
    pendingTasks = [];
    completedTasks = [];
    taskCompleted: boolean = false;
    showDuplicateNameError: boolean = false;

    constructor(private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.alltasks = this.localStorageService.getAllObjects();

    }

    ngAfterContentInit() {
        this.buildTasksByCategory();
    }

    buildTasksByCategory() {
        this.buildPendingTasks();
        this.buildCompletedTasks();
    }

    saveTitle() {
        if (this.alltasks.length) {
            this.alltasks.forEach(t => {
                this.allTasksName.push(t.name)
            })
        }
        if (!(this.allTasksName.includes(this.name))) {
            this.showDuplicateNameError = false;
            this.localStorageService.setItem(this.name, this.taskCompleted)
            this.alltasks.push({ name: this.name, status: this.taskCompleted })
            this.buildTasksByCategory();
        } else {
            this.showDuplicateNameError = true;
        }
    }

    completeTask(task) {
        let taskStatus = this.alltasks.find(i => i.name === task.name).status = true;
        this.localStorageService.setItem(task.name, taskStatus)
        this.buildTasksByCategory();
    }

    inCompleteTask(task) {
        let taskStatus = this.alltasks.find(i => i.name === task.name).status = false;
        this.localStorageService.setItem(task.name, taskStatus)
        this.buildTasksByCategory();
    }

    deleteTask(task) {
        this.localStorageService.removeObject(this.alltasks.find(i => i.name === task.name).name);
        this.alltasks = this.localStorageService.getAllObjects();
        this.buildTasksByCategory();
        this.buildTasksByCategory();
    }

    checkDuplicateName() {

    }

    buildPendingTasks() {
        this.pendingTasks = this.alltasks.filter(t => t.status == false)
    }

    buildCompletedTasks() {
        this.completedTasks = this.alltasks.filter(t => t.status == true)
    }
}