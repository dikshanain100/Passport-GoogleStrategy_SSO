import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

// This module takes data and id offline and once user comes online, posts the data to DB
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private _mainService: MainService) { }

  ssoLogin(){
    let data ={};
    this._mainService.login(data).then(
      (res: any) => {
        console.log('res :: ', res)
        if (res.error) {
          alert(res.message);
        }
        else {
          console.log('hey there ', res)
        }
      },
      (err: Object) => {
        console.log('err :: ', err)
        alert('Error while login ' + err);
      })
      .catch((err: Object) => {
      });
  }
  
  ngOnInit() {
   
  }



}
