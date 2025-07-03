import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TodoService} from "../../../shared/services/todo.service";
import {TodoConstants} from "../../../shared/constants/todo.constants";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  todoCreateForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['not-completed'],
  })


  get todoTitle() {
    return this.todoCreateForm.get('title')
  }


  constructor(private fb: FormBuilder, private router: Router, private todoService: TodoService) {
  }

  ngOnInit() {
  }

  sendForm() {
    if (this.todoCreateForm.valid) {
      const formValues = this.todoCreateForm.value;
      let statusText: string = '';
      switch (formValues.status) {
        case TodoConstants.completed:
          statusText = 'Выполнена';
          break
        case TodoConstants.notCompleted:
          statusText = 'Не выполнена';
          break;
      }
      this.todoService.createTodoItem({
        id: Date.now(),
        title: formValues.title || '',
        description: formValues.description || '',
        status: formValues.status || '',
        statusText: statusText,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      })
    } else {
      this.todoTitle?.markAsDirty();
    }
  }
}
