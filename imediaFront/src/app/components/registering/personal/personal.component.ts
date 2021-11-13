import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {
  faArr = faArrowLeft;
  
  customerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    zipCode: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country : new FormControl("", [Validators.required]),
    wantRepare : new FormControl(),
    isAcceptingConditions : new FormControl(false, [Validators.requiredTrue]),
  });

  defaultCountry = {
    alpha2Code: "BE",
    alpha3Code: "BEL",
    callingCode: "+32",
    name: "Belgique",
    numericCode: "056"
 };

  constructor(private activatedRoute: ActivatedRoute, private data : DataService, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.customerForm.patchValue({  
        email : (params.email)? params.email : "",
      });
    });
  }

  onSubmit(){
    this.data.addCustomer({ 
      lastname : this.customerForm.value.lastName,
      name : this.customerForm.value.firstName,
      address : this.customerForm.value.address,
      zip : this.customerForm.value.zip,
      city : this.customerForm.value.city,
      tel : "+" + this.customerForm.value.phone.e164Number.substr(1),
      email : this.customerForm.value.email,
      country : this.customerForm.value.country.name}).subscribe(
      (response) => {
        if(this.customerForm.value.wantRepare){
          console.log("wantRepare");
          
          this.data.addWorkorder({customerID : response.customerID}).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => { console.log(error); });
        }

        this.router.navigate(['/ready'], {queryParams: {
          firstName : this.customerForm.value.firstName,
          lastName : this.customerForm.value.lastName,
        }});
      },
      (error) => { console.log(error); });
  }
}
