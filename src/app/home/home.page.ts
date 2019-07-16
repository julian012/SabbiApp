import {Component, OnInit} from '@angular/core';
import {ClientService} from '../client/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {

  constructor(private clientService: ClientService) {

  }

  ngOnInit(): void {
    this.clientService.loadClients();
  }



}
