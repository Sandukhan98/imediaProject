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
    this.router.navigate(['/personal'], {queryParams: {orgstructure: 1}});
  }

  public companyClick(){
    this.router.navigateByUrl('/companyTva');
  }

  
}
