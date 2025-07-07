  import {Injectable} from '@angular/core';
  import {TodoType} from "../../../types/todo.type";
  import {BehaviorSubject, map, Observable} from "rxjs";
  import {NgxIndexedDBService} from "ngx-indexed-db";

  @Injectable({
    providedIn: 'root'
  })
  export class TodoService {

    constructor(private dbService: NgxIndexedDBService) {
    }

    searchParams$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setSearchParams(params: string): void {
      this.searchParams$.next(params);
    }

    getSearchParams(): string {
      return this.searchParams$.getValue();
    }


    getAllTodos(): Observable<TodoType[]> {
      return this.dbService.getAll('todos');
    }

    getTodoItem(id: number): Observable<TodoType> {
      return this.dbService.getByKey('todos', id);
    }

    createTodoItem(todo: TodoType): Observable<TodoType> {
      return this.dbService.add('todos', todo)
    }
    updateTodoItem(todo: TodoType): Observable<TodoType> {
      return this.dbService.update('todos', todo)
    }

    deleteTodoItem(id: number): Observable<void> {
      return this.dbService.delete('todos', id)
        .pipe(
          map(() => undefined),
        )
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
