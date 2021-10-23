import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'imediaFront';
  active = true;
  userActivity : any = null;
  userInactive: Subject<any> = new Subject();

  constructor() {
    this.setTimeout();
    this.userInactive.subscribe(() => this.active = false);
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    this.active = true;
    clearTimeout(this.userActivity);
    this.setTimeout();
    
  }
}
