import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTP_URL} from '../models/httpStatus';
import {GarmentModel} from '../models/Garment.model';

@Injectable({
    providedIn: 'root'
})
export class GarmentService {

    public garmentList: GarmentModel[] = [];

    constructor(private http: HttpClient) {
    }

    public loadGarments() {
        if (!this.garmentList[0]) {
            this.getGarments().subscribe(res => {
                    this.garmentList = res;
                    console.log(this.garmentList);
                },
                (error: any) => {
                    console.log('Error al obtener las prendas');
                }
            );
        }
    }

    private getGarments(): Observable<GarmentModel[]> {
        return this.http.get<GarmentModel[]>(HTTP_URL + '/garment');
    }

    public getGarmentList(): GarmentModel[] {
        return this.garmentList;
    }
}
