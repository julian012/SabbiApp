import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTP_URL} from '../models/httpStatus';
import {TrademarkModel} from '../models/Trademark.model';

@Injectable({
    providedIn: 'root'
})
export class TrademarkService {

    constructor(private http: HttpClient) {
    }

    public getTrademarks(): Observable<TrademarkModel[]> {
        return this.http.get<TrademarkModel[]>(HTTP_URL + '/trademark');
    }
}
