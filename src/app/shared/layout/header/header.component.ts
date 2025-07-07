import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchValue: string = '';
  cleanSearch: boolean = false;

  private subscription: Subscription = new Subscription();

  searchInput: FormControl = new FormControl<string>('', {nonNullable: true});

  constructor(private router: Router,
              private todoService: TodoService) {

  }

  ngOnInit() {
    this.subscription.add(
      this.todoService.searchParams$.subscribe((params: string) => {
        this.searchValue = params;
        this.searchInput.setValue(params, {emitEvent: false})
        this.updateClearSearch();
      })
    );

    this.subscription.add(
      this.searchInput.valueChanges
        .subscribe((text: string) => {
          this.updateClearSearch();
        })
    );
  }

  search(): void {
    this.todoService.setSearchParams(this.searchInput.value);
    if (this.searchInput.value) {
      this.router.navigate(['/'], {queryParams: {search: this.searchInput.value}});
    } else {
      this.router.navigate(['/'], {queryParams: {}});
    }
  }

  clearSearch(): void {
    this.searchInput.setValue('');
    this.todoService.setSearchParams('');
    this.router.navigate(['/'], {queryParams: {}});
  }

  updateClearSearch(): void {
    this.cleanSearch = this.searchInput.value === this.searchValue && !!this.searchValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
