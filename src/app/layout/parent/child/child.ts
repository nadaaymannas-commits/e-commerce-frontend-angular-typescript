import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child {
   msg=''
private _cdr = inject(ChangeDetectorRef);

  getMSG(myMSG:string){
    console.log('child');
    
    this.msg = myMSG

    this._cdr.detectChanges();
  }
}
