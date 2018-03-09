import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { WeatherService } from './../weather.service'

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss']
})
export class LocatorComponent implements OnInit {

  _router: Router;
  rForm: FormGroup;
  post: any;
  city: string;
  postal: number;
  _weatherService:WeatherService;
  gps:boolean = true;

  constructor(router: Router, private fb:FormBuilder, weatherService:WeatherService ) { 
    this._router = router;
    this._weatherService = weatherService;
    this.rForm = fb.group({
      'city': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'postal': [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  
  }

  ngOnInit() {
  }

  getLocation(){
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position){
      if(position.coords.latitude && position.coords.longitude){
        var location = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        sessionStorage.setItem('gps', 'true');
        self.gps=true;        
        sessionStorage.setItem('location', JSON.stringify(location));
        self._weatherService.getWeather(location,false).subscribe(data => {
          if(data && data.name !== ""){
            sessionStorage.setItem('basecity', data.name);
            sessionStorage.setItem(data.name, JSON.stringify(data));
            self._router.navigate(['dashboard',data.name]);
          }
        });
      }
    }, function(err){
      console.log('unable to get location');
      self.gps=false;
      sessionStorage.setItem('gps', 'false');      
    });
  }
  
  submitLocation(post){
    this.city = post.city;
    this.postal = post.postal;
    let self = this;
    this._weatherService.getWeather(this.city,false).subscribe(data => {
      console.log(data);
      if(data && data.name !== ""){
        sessionStorage.setItem('basecity', data.name);
        sessionStorage.setItem(data.name, JSON.stringify(data));
        self._router.navigate(['dashboard',data.name]);
      }
    }, function(err){
      alert("Unable to find city. Please enter a correct city name");
    });
  }

}
