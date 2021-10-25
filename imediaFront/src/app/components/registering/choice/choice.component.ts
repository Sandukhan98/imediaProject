import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public personalClick(){
    this.router.navigateByUrl('/personalVerif');
  }

  public companyClick(){
    this.router.navigateByUrl('/companyTva');
  }

  
}
