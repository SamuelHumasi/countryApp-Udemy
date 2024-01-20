import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './contry-table.component.html',
  styles: [
  ]
})
export class ContryTableComponent implements OnInit {
  @Input()
  public countriesList:Country[]=[]

  constructor() { }

  ngOnInit(): void {
  }

}
