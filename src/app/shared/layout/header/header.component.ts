import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchValue: string = '';

  private subscription: Subscription = new Subscription();

  searchInput: FormControl = new FormControl<string>('', {nonNullable: true});

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        if (!params['search']) {
          this.searchInput.reset();
        }
      }))
  }

  search() {
    this.searchValue = this.searchInput.value;
    if (this.searchValue) {
      this.router.navigate(['/'], {queryParams: {search: this.searchValue}});
      this.searchInput.setValue('');
    } else if (!this.searchValue) {
      this.router.navigate(['/'], {queryParams: {}});
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
