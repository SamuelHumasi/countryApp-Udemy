import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })


export class CountriesService {
  
  private baseUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) {}

  getCountriesData(value: string, param?:string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.baseUrl}${param}/${value}`)
      .pipe(catchError(() => of([])));
  }

  getById(value: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${this.baseUrl}alpha/${value}`)
      .pipe(
        map(countries=>countries.length>=0?countries[0]:null),
        catchError(() => of(null)));
  }
}
