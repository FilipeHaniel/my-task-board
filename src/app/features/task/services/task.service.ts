import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'

import { Task } from '../model/task_model'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient)

  public tasks = signal<Task[]>([])
  public numberOfTasks = computed(() => this.tasks().length)

  public readonly _apiUrl = environment.apiUrl

  public getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this._apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.sortedTasks(tasks)
        this.tasks.set(sortedTasks)
      })
    )
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this._httpClient.post<Task>(`${this._apiUrl}/tasks`, task).pipe(
      tap(createdTask => {
        const tasks = this.tasks()
        const sortedTasks = this.sortedTasks([...tasks, createdTask])
        this.tasks.set(sortedTasks)
      })
    )
  }

  public insertATaskInATaskList(newTask: Task): void {
    const updatedTasks = this.sortedTasks([...this.tasks(), newTask])
    const sortedTasks = this.sortedTasks(updatedTasks)

    this.tasks.set(sortedTasks)
  }

  public updateTask(updatedTask: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this._apiUrl}/tasks/${updatedTask.id}`, updatedTask)
  }

  public updateATaskInATaskList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(task => task.id !== updatedTask.id)
      const updatedTasksList = [...allTasksWithUpdatedTaskRemoved, updatedTask]

      return this.sortedTasks(updatedTasksList)
    })
  }

  public sortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title))
  }
}
