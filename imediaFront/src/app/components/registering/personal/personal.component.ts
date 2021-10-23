import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {
  customerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    zipCode: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country : new FormControl("", [Validators.required]),
    isAcceptingConditions : new FormControl(false, [Validators.requiredTrue]),
  });

  defaultCountry = {
    alpha2Code: "BE",
    alpha3Code: "BEL",
    callingCode: "+32",
    name: "Belgique",
    numericCode: "056"
 };

  constructor(private data : DataService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.data.addCustomer({ 
      lastname : this.customerForm.value.lastName,
      name : this.customerForm.value.firstName,
      address : this.customerForm.value.address,
      zip : this.customerForm.value.zip,
      city : this.customerForm.value.city,
      tel : "00" + this.customerForm.value.phone.e164Number.substr(1),
      email : this.customerForm.value.email,
      country : this.customerForm.value.country.name}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => { console.log(error); });
  }
}
