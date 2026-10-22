import { Component, effect, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-signal',
  styleUrl: './signal.css',
  templateUrl: './signal.html',
})
export class Signal {
  constructor(){
    effect(()=>{
      console.log('effect:',this.count());
      
    })
  }

  count = signal(0)

  do(){
    // this.count.set(10);

    this.count.update(v=> v + 10);

   // console.log(this.count());
    
  }

}
