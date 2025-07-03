import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoType} from "../../../types/todo.type";
import {TodoService} from "../../shared/services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

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
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['search']) {
          this.todoService.searchTodos(params['search'])
            .subscribe({
              next: (todos: TodoType[]) => {
                this.todoList = todos
                if (this.todoList.length <= 0) {
                  this.notFoundTodos = true;
                }
              },
              error: (error) => {
                console.log(error);
              }
            });
        } else {
          this.todoService.getAllTodos()
            .subscribe({
              next: (todos: TodoType[]) => {
                this.todoList = todos
                this.notFoundTodos = false;
              },
              error: (err) => {
                console.log(err)
              }
            })
        }
      })
    )
  }

  todoDeleted(id: number) {
    this.todoList = this.todoList!.filter(item => +item.id !== +id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
