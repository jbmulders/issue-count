import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() error$: Observable<{ message: string }>;

  show: boolean;
  private componentActive: boolean;

  ngOnInit() {
    this.componentActive = true;
    this.show = false;
    this.error$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((error: { message: string }) => {
        if (error) {
          this.show = true;
          setTimeout(() => (this.show = false), 4000);
        }
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
