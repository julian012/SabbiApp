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

    public createGarment(garment: GarmentModel): Observable<GarmentModel> {
        return this.http.post<GarmentModel>(HTTP_URL + '/garment', garment);
    }

    public deleteGarment(garment: GarmentModel) {
        console.log(garment);
        return this.http.post(HTTP_URL + '/garment/delete', garment);
    }

    public updateGarment(garment: GarmentModel) {
        console.log(garment);
        return this.http.put(HTTP_URL + '/garment', garment);
    }

    public getGarmentList(): GarmentModel[] {
        return this.garmentList;
    }
}
