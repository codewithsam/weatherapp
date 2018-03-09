import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  weatherData;
  basecity;
  gps;
  location;
  forecastData;
  combinedData;
  _weatherService:WeatherService;
  constructor(weatherService:WeatherService, private route: ActivatedRoute) {
    this._weatherService = weatherService; 
    this.basecity = this.route.snapshot.params.basecity;
    if(sessionStorage.getItem('gps')){
      this.gps = sessionStorage.getItem('gps');
    }
    if(sessionStorage.getItem('location')){
      this.location = sessionStorage.getItem('location');
    }

  }

  ngOnInit() {
    if(this.basecity in sessionStorage){
      this.weatherData = JSON.parse(sessionStorage.getItem(this.basecity));
    }else{
      this._weatherService.getWeather(this.basecity, false).subscribe(data => {
        this.weatherData = data;
        sessionStorage.setItem('basecity', data.name);        
        sessionStorage.setItem(data.name, JSON.stringify(data));        
      }); 
    }
    let currentgraph = sessionStorage.getItem(this.basecity+'forecast');
    if(currentgraph && currentgraph.substring(this.basecity)){
        this.combinedData = JSON.parse(sessionStorage.getItem(this.basecity+'forecast'));
    }else{
      this._weatherService.getWeather(this.basecity, true).subscribe(data => {
        this.combinedData = data.list.reduce((combination,current) => {
          var day = new Date(current.dt*1000).getDay();
          combination[day] = combination[day] || [];
          combination[day].push(current);
          return combination;
        }, []);
        sessionStorage.setItem(`${this.basecity}forecast`, JSON.stringify(this.combinedData));
      })
    }
  }

}
