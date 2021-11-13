import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent implements OnInit {

  images : Array<String> =[];
  onePic : boolean = false;
  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.data.getPub().subscribe(
      (response) => {
        response.forEach((element : any) => {
          this.images.push("http://192.168.1.60:8000/pub/" + element.filename);
        });

        this.onePic = this.images.length == 1;
      },
      (error) => { console.log(error); });
  }

}
