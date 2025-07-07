import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoType} from "../../../types/todo.type";
import {TodoService} from "../../shared/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  todoList: TodoType[] = [];
  notFoundTodos: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams
        .subscribe(params => {
          const searchParams = params['search'] || '';
          this.loadTodos(searchParams);
        })
    )
  }

  loadTodos(params: string): void {

    const getTodos: Observable<TodoType[]> = params
      ? this.todoService.searchTodos(params)
      : this.todoService.getAllTodos();

    this.subscription.add(
      getTodos.subscribe({
        next: (todos: TodoType[]) => {
          this.todoList = todos;
          this.notFoundTodos = this.todoList.length === 0;
        }, error: (error: Error) => {
          this.todoList = [];
          this.notFoundTodos = true;
        }
      })
    )
  }

  todoDeleted(id: number) {
    this.todoList = this.todoList!.filter(item => +item.id !== +id)
  }

  clearSearch(event: Event): void {
    event.preventDefault();
    this.todoService.setSearchParams('');
    this.router.navigate(['/'], {queryParams: {}});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
