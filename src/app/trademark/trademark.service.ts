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

    public createTrademark(trademark: TrademarkModel): Observable<TrademarkModel> {
        console.log(trademark);
        return this.http.post<TrademarkModel>(HTTP_URL + '/trademark', trademark);
    }

    public deleteTrademark(trademark: TrademarkModel): Observable<TrademarkModel> {
        return this.http.post<TrademarkModel>(HTTP_URL + '/trademark/delete', trademark);
    }

    public updateTrademark(trademark: TrademarkModel): Observable<TrademarkModel> {
        return this.http.put<TrademarkModel>(HTTP_URL + '/trademark', trademark);
    }

    public getTrademarks(): TrademarkModel[] {
        return this.trademarkList;
    }
}
