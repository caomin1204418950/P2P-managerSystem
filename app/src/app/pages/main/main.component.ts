import { Component, OnInit } from '@angular/core';
import resource from '../../shared/app-load/resource';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  menu=[

  ]
  nowIndex
  constructor() {
     this.menu=resource.menu
   }

  ngOnInit() {
  }
  openHandler(index){
    this.nowIndex=index
  }
}
