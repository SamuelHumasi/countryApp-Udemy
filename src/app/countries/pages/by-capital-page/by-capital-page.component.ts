import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  private countryParam:string = 'capital'
  
  public lastSearchValue?:string = ''
  public countriesList:Country[]=[]
  public isLoad:boolean = false


  constructor(
    private _countriesServices:CountriesService
  ) { }

  ngOnInit(): void {
    this.countriesList = this._countriesServices.cacheStore.byCapital.countries
    this.lastSearchValue = this._countriesServices.cacheStore.byCapital.term

  }

  searchByCapital(value:string){
    this.isLoad=true
    this._countriesServices.getCountriesData(value, this.countryParam).subscribe((res)=>{
      this.countriesList = res
      this.isLoad=false
    })
  }

}
