import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.LoadToLocalStorage()
  }


  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore)) 
  }

  private LoadToLocalStorage(){
    if(localStorage.getItem('cacheStore')){
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }
  }

  private getCountryRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  getCountriesData(value:string, param?: string): Observable<Country[]> {
    const url = `${this.baseUrl}${param}/${value}`;
    return this.getCountryRequest(url).pipe(
      tap((countries) =>
        param === 'capital'
          ? (this.cacheStore.byCapital = { term: value, countries })
          : param === 'name'? (this.cacheStore.byCountry = { term: value, countries })
          : (this.cacheStore.byRegion = { region: value, countries })
      ),
      tap(()=>this.saveToLocalStorage())
    );
  }

  getById(value: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}alpha/${value}`).pipe(
      map((countries) => (countries.length >= 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
