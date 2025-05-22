import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined,{
      type: 'line-spin-fade',
       bdColor: 'rgba(225, 225, 225, 0)',
       color:'#fff',
       size:'medium'
    })
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <=0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
