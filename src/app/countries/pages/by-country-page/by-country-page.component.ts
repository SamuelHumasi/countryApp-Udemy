import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countriesList:Country[]=[]
  private countryParam:string = 'name'

  constructor(private _countriesServices:CountriesService) { }

  ngOnInit(): void {
  }

  searchByCountry(value:string){
    this._countriesServices.getCountriesData(value, this.countryParam).subscribe((res)=>{
      this.countriesList = res
    })
  }

}
