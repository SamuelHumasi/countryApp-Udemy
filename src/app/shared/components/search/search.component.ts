import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  private _debounce:Subject<string>= new Subject<string>()
  private _debounceSubscription?: Subscription

  @Input() public placeHolder:string=''
  @Input() public lastValue?:string=''
  @Output() public searchValue =  new EventEmitter<string>()
  @Output() public searchKeyPress =  new EventEmitter<string>()
  
  constructor() { }

  ngOnInit(): void { 
    this.initDebounce()
  }

  ngOnDestroy(): void {
    this._debounceSubscription?.unsubscribe()
    
  }

  initDebounce():void{
    this._debounceSubscription = this._debounce.pipe(
      debounceTime(500)
    ).subscribe(value=>{this.searchKeyPress.emit(value)})
  }

  emitValue (value:string) {
    this.searchValue.emit(value)
  }

  onKeyPress(value:string){
    this._debounce.next(value)
  }

}
