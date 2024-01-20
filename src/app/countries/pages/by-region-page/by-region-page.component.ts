import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countriesList:Country[]=[]
  private countryParam:string = 'region'

  constructor(private _countriesServices:CountriesService) { }

  ngOnInit(): void {
  }

  searchByRegion(value:string){
    this._countriesServices.getCountriesData(value, this.countryParam).subscribe((res)=>{
      this.countriesList = res
    })
  }

}
