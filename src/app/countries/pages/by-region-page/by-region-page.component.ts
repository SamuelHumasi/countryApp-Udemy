import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countriesList: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  private countryParam: string = 'region';
  public selectedRegion?:Region

  constructor(private _countriesServices: CountriesService) {}

  ngOnInit(): void {
    this.countriesList = this._countriesServices.cacheStore.byRegion.countries
    this.selectedRegion = this._countriesServices.cacheStore.byRegion.region
  }

  searchByRegion(value: Region) {
    this.selectedRegion = value
    console.log(this.selectedRegion===value)
    this._countriesServices
      .getCountriesData(value, this.countryParam)
      .subscribe((res) => {
        this.countriesList = res;
      });
  }
}
