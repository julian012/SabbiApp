import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../../models/Client.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {

  public dataClient: ClientModel;

  constructor() { }

  ngOnInit() {}

}
