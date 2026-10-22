import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, LowerCasePipe, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Nospace } from '../../core/pipes/nospace.pipe';

@Component({
  imports: [UpperCasePipe,LowerCasePipe,TitleCasePipe, DatePipe,CurrencyPipe,PercentPipe,DecimalPipe,JsonPipe, AsyncPipe,Nospace],
  selector: 'app-pipes',
  styleUrl: './pipes.css',
  templateUrl: './pipes.html',
})
export class Pipes {
  name='mona ali ahmed'
  nameTwo = 'SARA SAYED'
  myDate= new Date();
  price= '22.6'
  grade=22/150

  myData = new Promise((resolve,reject)=>{
    setTimeout(()=> resolve('my data from promise'),3000)
  })
}
