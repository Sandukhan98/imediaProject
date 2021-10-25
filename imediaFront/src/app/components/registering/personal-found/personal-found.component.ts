import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-personal-found',
  templateUrl: './personal-found.component.html',
  styleUrls: ['./personal-found.component.css']
})
export class PersonalFoundComponent implements OnInit {
  customerForm = new FormGroup({
    wantRepare : new FormControl(),
    isAcceptingConditions : new FormControl(false, [Validators.requiredTrue]),
  });

  firstName = "";
  lastName= "";
  customerID = "";
  constructor(private activatedRoute: ActivatedRoute, private data : DataService,  private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.customerID = params.customerID;
    });
  }
  onSubmit(){
    if(this.customerForm.value.wantRepare){
      console.log("wantRepare");
      
      this.data.addWorkorder({customerID : this.customerID}).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => { console.log(error); });
    }

    this.router.navigate(['/ready'], {queryParams: {
      firstName : this.firstName,
      lastName : this.lastName,
    }});
  }
}
