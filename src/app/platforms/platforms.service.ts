import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlatformModel} from '../models/Platform.model';
import {HTTP_URL} from '../models/httpStatus';
import {constructExclusionsMap} from 'tslint/lib/rules/completed-docs/exclusions';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  constructor(private http : HttpClient) {}

  public getDataPlatforms(): Observable<PlatformModel[]>{
    return this.http.get<PlatformModel[]>(HTTP_URL+'/platforms');
  }

  public createPlatform( platform : PlatformModel ): Observable<PlatformModel>{
    console.log(platform);
    return this.http.post<PlatformModel>(HTTP_URL + '/platform', platform);
  }

  public updatePlatform( platform : PlatformModel ): Observable<PlatformModel>{
    return this.http.put<PlatformModel>(HTTP_URL + '/platform', platform);
  }
}
