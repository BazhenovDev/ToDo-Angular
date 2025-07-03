import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoType} from "../../../../types/todo.type";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'todo-card-component',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() todoItem: TodoType;
  @Output() todoDeleteEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService) {
    this.todoItem = {
      id: 0,
      title: '',
      status: '',
      statusText: ''
    }
  }

  ngOnInit() {

  }

  deleteTodo(): void {
    this.todoService.deleteTodoItem(+this.todoItem.id).subscribe({
      next: (data) => {
        this.todoDeleteEmitter.emit(+this.todoItem.id);
      },
      error: err => {
        console.error(err);
      }
    })
  }



}
