import { Component, OnInit } from '@angular/core';
import { GarmentModel } from '../models/Garment.model';
import { GarmentService } from './garment.service';

@Component({
  selector: 'app-garment',
  templateUrl: './garment.page.html',
  styleUrls: ['./garment.page.scss'],
  providers: [GarmentService]
})
export class GarmentPage implements OnInit {

  public  dataGarment: Array<GarmentModel>;

  constructor(private garmentService: GarmentService) { }

  ngOnInit() {
    this.loadGarment();
  }

  public loadGarment(): void {
    this.garmentService.getGarments().subscribe(res => {
          this.dataGarment = res;
          console.log(this.dataGarment);
        },
        (error: any) => {
          console.log('Error al obtener las prendas');
          this.dataGarment = new Array<GarmentModel>();
        }
    );
  }
}
