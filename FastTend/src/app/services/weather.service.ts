import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '49ca00b439bb16fa7487a12fa668f280';
  URI: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?q=santiago,cl&appid=${this.apiKey}&units=metric&q=`
   }
   getWeather(cityName : string, coutryCode: string){
     return this.http.get(`${this.URI}${cityName},${coutryCode}`);
   }

}
