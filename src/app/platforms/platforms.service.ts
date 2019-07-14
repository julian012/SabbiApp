import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import {Observable} from 'rxjs';
import {PlatformModel} from '../models/Platform.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
    providedIn: 'root'
})
export class PlatformsService {

    constructor(private http2: HTTP,
                private http: HttpClient) {
    }

    public getDataPlatforms(): Observable<PlatformModel[]> {
        return this.http.get<PlatformModel[]>(HTTP_URL + '/platform');
    }

    public createPlatform(platform: PlatformModel): Observable<PlatformModel> {
        console.log(platform);
        return this.http.post<PlatformModel>(HTTP_URL + '/platform', platform);
    }

    public updatePlatform(platform: PlatformModel): Observable<PlatformModel> {
        return this.http.put<PlatformModel>(HTTP_URL + '/platform', platform);
    }

    public deletePlatform(platform: PlatformModel): Observable<PlatformModel> {
        return this.http.post<PlatformModel>(HTTP_URL + '/platform/delete', platform);
    }

    public validateUrlImagePlatform(name: string) {
        let path = 'https://logo.clearbit.com/';
        let alternative = 'https://ui-avatars.com/api/?name=';
        this.http.get(path + name).subscribe(res => {
                return path + name;
            },
            (error: any) => {
                return alternative + name;
            }
        );
    }
}
