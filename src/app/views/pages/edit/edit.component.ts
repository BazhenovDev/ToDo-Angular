import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../../../shared/services/todo.service";
import {TodoConstants} from "../../../shared/constants/todo.constants";
import {TodoType} from "../../../../types/todo.type";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  todoItem!: TodoType;

  todoEditForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['not-completed'],
  })


  get todoTitle() {
    return this.todoEditForm.get('title')
  }


  constructor(private fb: FormBuilder, private router: Router, private todoService: TodoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      const id = +params['id'];

      if (isNaN(id)) {
        this.router.navigate(['/']);
        return;
      }
      if (id) {
        this.todoService.getTodoItem(id)
          .subscribe({
            next: (data: TodoType) => {

              if (data) {
                this.todoItem = data;
                this.todoEditForm.patchValue({
                  title: data.title,
                  description: data.description || '',
                  status: data.status
                })
              } else {
                this.router.navigate(['/']);
              }
            }
          })
      }
    })
  }


  sendForm() {
    if (this.todoEditForm.valid) {
      const formValues = this.todoEditForm.value;
      let statusText: string = '';
      switch (formValues.status) {
        case TodoConstants.completed:
          statusText = 'Выполнена';
          break
        case TodoConstants.notCompleted:
          statusText = 'Не выполнена';
          break;
      }
      this.todoService.updateTodoItem({
        id: this.todoItem.id,
        title: formValues.title || '',
        description: formValues.description || '',
        status: formValues.status || '',
        statusText: statusText,
      })
        .subscribe({
          next: () => {
            this.router.navigate([`/tasks/${this.todoItem.id}`]);
          }
        })
    }
  }
}
