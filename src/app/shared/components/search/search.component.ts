import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{
  @Input() public placeHolder:string=''
  @Output() public searchValue =  new EventEmitter<string>()
  
  constructor() { }
  ngOnInit(): void { }



  emitValue (value:string) {
    this.searchValue.emit(value)
  }

}
