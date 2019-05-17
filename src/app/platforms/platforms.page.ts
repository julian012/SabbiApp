import { Component, OnInit } from '@angular/core';
import {PlatformModel} from '../models/Platform.model';
import {PlatformsService} from './platforms.service';
import {OK} from '../models/httpStatus';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
  providers: [PlatformsService]
})
export class PlatformsPage implements OnInit {

  private dataPlatform: Array<PlatformModel>;

  constructor(
      private dataPlatformService : PlatformsService
  ) {
    this.dataPlatform= new Array<PlatformModel>();
  }

  ngOnInit() {
    this.loadPlatforms();
  }

  private loadPlatforms(): void{
    this.dataPlatformService.getDataPlatforms().subscribe(res =>{
      this.dataPlatform = res;
      console.log(this.dataPlatform);
    },
        (error: any) => this.dataPlatform = new Array<PlatformModel>()
    );
  }

}
