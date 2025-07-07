import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {TodoType} from "../../../../types/todo.type";
import {TodoService} from "../../services/todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'todo-card-component',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnDestroy {

  @Input() todoItem!: TodoType;
  @Output() todoDeleteEmitter: EventEmitter<number> = new EventEmitter<number>();
  private subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {
  }

  deleteTodo(): void {

    this.subscription.add(
      this.todoService.deleteTodoItem(+this.todoItem.id).subscribe({
        next: (data) => {
          this.todoDeleteEmitter.emit(+this.todoItem.id);
        },
        error: err => {
          console.error(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
