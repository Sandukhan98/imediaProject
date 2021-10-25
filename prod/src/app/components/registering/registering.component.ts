import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter', [
              style({ opacity: 0 })
          ], { optional: true }
      ),
      group([
          query(':leave', [
                  animate(300, style({ opacity: 0 }))
              ],
              { optional: true }
          ),
          query(':enter', [
                  style({ opacity: 0 }),
                  animate(300, style({ opacity: 1 }))
              ],
              { optional: true }
          )
      ])
  ])  
]);

@Component({
  selector: 'app-registering',
  templateUrl: './registering.component.html',
  styleUrls: ['./registering.component.css'],
  animations: [ 
    fader
  ]
})
export class RegisteringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
