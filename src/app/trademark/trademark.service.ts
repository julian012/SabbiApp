import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTP_URL} from '../models/httpStatus';
import {TrademarkModel} from '../models/Trademark.model';

@Injectable({
    providedIn: 'root'
})
export class TrademarkService {

    public trademarkList: TrademarkModel[] = [];

    constructor(private http: HttpClient) {
    }

    public loadTrademarks() {
        if (!this.trademarkList[0]) {
            this.getTrademarkList().subscribe(res => {
                    this.trademarkList = res;
                    console.log(this.trademarkList);
                },
                (error: any) => {
                    console.log('Error al obtener las marcas');
                }
            );
        }
    }

    private getTrademarkList(): Observable<TrademarkModel[]> {
        return this.http.get<TrademarkModel[]>(HTTP_URL + '/trademark');
    }

    public getTrademarks(): TrademarkModel[] {
        return this.trademarkList;
    }
}
