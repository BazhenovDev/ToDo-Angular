import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../../../shared/services/todo.service";
import {Router, ActivatedRoute} from '@angular/router';
import {TodoType} from "../../../../types/todo.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: ['./viewing.component.scss']
})
export class ViewingComponent implements OnInit, OnDestroy {

  todoItem: TodoType | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params.subscribe(params => {
        const id = +params['id'];
        if (isNaN(id)) {
          this.router.navigate(['/']);
          return;
        }
        if (id) {
          this.todoService.getTodoItem(id)
            .subscribe(todoItem => {
              this.todoItem = todoItem;
              if (!this.todoItem) {
                this.router.navigate(['/']);
              }
            });
        }
      })
    )
  }

  deleteTodo(): void {
    this.todoService.deleteTodoItem(+this.todoItem!.id)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
