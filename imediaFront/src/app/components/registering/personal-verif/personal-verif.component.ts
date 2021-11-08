import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-personal-verif',
  templateUrl: './personal-verif.component.html',
  styleUrls: ['./personal-verif.component.css']
})
export class PersonalVerifComponent implements OnInit {
  faArr = faArrowLeft;

  emailForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });
  constructor(private router: Router, private data : DataService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.data.verifyExistence({
      email : this.emailForm.value.email }).subscribe(
      (response) => {
        if(response.found){
          console.log(response)
          this.router.navigate(['/personalFound'], {queryParams: response});
        }
        else{
          this.router.navigate(['/personal'], {queryParams: {email : this.emailForm.value.email}});
        }
        // this.router.navigate(['/companyInfo'], {queryParams: response});
      },
      (error) => { console.log(error); });
}
}
