import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Child } from './child/child';

@Component({
  imports: [Child],
  selector: 'app-parent',
  styleUrl: './parent.css',
  templateUrl: './parent.html',
})
export class Parent implements AfterViewInit{
  ngAfterViewInit(): void {
   this.myChild.getMSG('parent started')
  }
  // ngOnInit(): void {
  // this.myChild.getMSG('parent started')
  // }

  @ViewChild(Child) myChild!:Child;
private _cdr = inject(ChangeDetectorRef);

  do(){
    console.log('send');
    this.myChild.getMSG('button click')
     this.myChild.msg = 'Hellllo'
    // this._cdr.detectChanges();
  }

}
