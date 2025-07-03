import {Injectable} from '@angular/core';
import {TodoType} from "../../../types/todo.type";
import {map, Observable} from "rxjs";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private dbService: NgxIndexedDBService) {
  }

  getAllTodos(): Observable<TodoType[]> {
    return this.dbService.getAll('todos');
  }

  getTodoItem(id: number): Observable<TodoType> {
    return this.dbService.getByKey('todos', id);
  }

  createTodoItem(array: TodoType): Observable<TodoType> {
    return this.dbService.add('todos', array)
  }
  updateTodoItem(array: TodoType): Observable<TodoType> {
    return this.dbService.update('todos', array)
  }

  deleteTodoItem(id: number): Observable<TodoType[]> {
    return this.dbService.delete('todos', id)
  }

  searchTodos(str: string): Observable<TodoType[]> {
    return this.dbService.getAll<TodoType>('todos')
      .pipe(
        map((todos: TodoType[]) => {
          return todos.filter((item: TodoType) => item.title.toLowerCase().includes(str.toLowerCase().trim()))
        })
      );
  }

}
