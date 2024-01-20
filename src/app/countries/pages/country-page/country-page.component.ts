import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?:Country
  public countryTranslations?:string[]=[]
  
  constructor(
    private _countriesService: CountriesService,
    private _activatedRoute: ActivatedRoute,
    private _router :Router
  ) {}

  ngOnInit(): void {
    this.searchByAlphaCode();
  }

  
  // Utiliza el operador switchMap para manejar la suscripción anidada
  searchByAlphaCode() {
    this._activatedRoute.params
    .pipe(switchMap(({ id }) => this._countriesService.getById(id)))
    .subscribe((country) => {
      if (country) {
        this.country = country;
        this.countryTranslations = Object.values(country.translations).map(translation => translation.common);
      } else {
        this._router.navigateByUrl('');
      }
    });
  }
  /*
    suscripción anidada:dificil de manejar errores y cancelar suscripciones.

    searchByAlphaCode(){
      this._activatedRoute.params.subscribe(({id})=>{
        this._countriesService.getById(id).subscribe(res=>{
          console.log(res)
        })
      })
    }
  */
}
