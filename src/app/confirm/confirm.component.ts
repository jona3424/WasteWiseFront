import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  @Input("heading")
  heading : string = ""

  @Output() onResponse: EventEmitter<any> = new EventEmitter();

  decline(): void {
    this.onResponse.emit(false);
  } 
  accept(): void {
    this.onResponse.emit(true);
  }

}
