import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class WeatherService {
  appid:string = "&appid=89c1eda4214914ffba5adcc025270d0d";
  baseurl:string = "http://api.openweathermap.org/data/2.5/weather";
  query:string;

  constructor(private http:HttpClient) { }

  getWeather(param,forecast): Observable<any>{
    console.log('called');
    var url:string;
    if(forecast == true){
      this.baseurl = "http://api.openweathermap.org/data/2.5/forecast";
      if(typeof param === "string"){
        this.query = `?q=${param}`;
      }else if(typeof param === "object"){
        this.query = `?lat=${param.lat}&lon=${param.long}`;
      }
      url = this.baseurl+this.query+this.appid;

    }
    else{
      if(typeof param === "string"){
        this.query = `?q=${param}`;
      }else if(typeof param === "object"){
        this.query = `?lat=${param.lat}&lon=${param.long}`;
      }
      url = this.baseurl+this.query+this.appid;
    }
    return this.http.get<any>(url);    
  }

}
