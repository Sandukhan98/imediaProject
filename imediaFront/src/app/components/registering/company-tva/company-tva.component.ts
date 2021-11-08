import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-tva',
  templateUrl: './company-tva.component.html',
  styleUrls: ['./company-tva.component.css']
})
export class CompanyTVAComponent implements OnInit {
  faArr = faArrowLeft;
  
  tvaForm = new FormGroup({
    tva: new FormControl("", [Validators.required, Validators.pattern(/^(BE|Be|bE|be)\d{10}$/)])
  });
  constructor(private router: Router, private data : DataService) { }

  ngOnInit(): void {
  }

  onSubmit(){
      this.data.getCompanyInfo({
        code : this.tvaForm.value.tva.substr(0,2).toUpperCase(),
        number : this.tvaForm.value.tva.substr(2,4) + "."
         + this.tvaForm.value.tva.substr(6,3) + "."
         + this.tvaForm.value.tva.substr(9,3)}).subscribe(
        (response) => {
          this.router.navigate(['/companyInfo'], {queryParams: response});
        },
        (error) => { console.log(error); });
  }
}
