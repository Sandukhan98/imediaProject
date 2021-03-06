import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './services/data.service';

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
  timeout = 60000;
  constructor(private data : DataService) {
    setTimeout(() => {
      this.intTimeout();
    }, 3000);
    setInterval(()=>{
      this.intTimeout();
    }, 3600000);
  }

  intTimeout() {
    console.log("init timeout");
    
    this.data.getTimeOut().subscribe((response) => {
      
      console.log(response);
      this.timeout = response.adTimeout;
      this.setTimeout();
      console.log("adTimeOut => " + response.adTimeout);
      this.userInactive.subscribe(() => this.active = false);
    });
    
  }

  setTimeout():void{
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.timeout);
  }

  @HostListener('window:mousemove') refreshUserStateMouse() {
    this.active = true;
    clearTimeout(this.userActivity);
    this.setTimeout();
    
  }

  @HostListener('window:keypress') refreshUserStateKey() {
    this.active = true;
    clearTimeout(this.userActivity);
    this.setTimeout();
    
  }
}
