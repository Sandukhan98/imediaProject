import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css']
})
export class ReadyComponent implements OnInit {
  firstName = "";
  lastName= "";
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.firstName = params.firstName;
      this.lastName = params.lastName;
    });

    setTimeout(() => {
      this.router.navigate(['/']);
  }, 5000);  //5s
  }
  
}
