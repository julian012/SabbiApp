import { Component, OnInit } from '@angular/core';
import {Platform} from 'cordova-res/dist/platform';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


  constructor(private platform: Platform) {

  }

  ngOnInit() {
  }

}
