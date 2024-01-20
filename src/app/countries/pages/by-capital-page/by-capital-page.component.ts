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

  public countriesList:Country[]=[]
  private countryParam:string = 'capital'

  constructor(
    private _countriesServices:CountriesService
  ) { }

  ngOnInit(): void {
  }

  searchByCapital(value:string){
    this._countriesServices.getCountriesData(value, this.countryParam).subscribe((res)=>{
      this.countriesList = res
    })
  }

}
