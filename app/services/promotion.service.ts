import { Injectable } from '@angular/core';
import { Promotion } from './../shared/promotion';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService{
    constructor(public http:Http,
        private processHttpMsgService: ProcessHTTPMsgService){}

    getPromotions(): Observable<Promotion[]>{
        return this.http.get(baseURL+'promotions')
            .map(res => { return this.processHttpMsgService.extractData(res);})
            .catch(error => { return this.processHttpMsgService.handleError(error);});
    }

    getPromotion(id: number): Observable<Promotion>{
        return this.http.get(baseURL+'promotions/'+id)
        .map(res => { return this.processHttpMsgService.extractData(res);})
        .catch(error => { return this.processHttpMsgService.handleError(error);});

    }

    getFeaturedPromotion(): Observable<Promotion>{
        return this.http.get(baseURL+'promotions?featured=true')
        .map(res => { return this.processHttpMsgService.extractData(res)[0];})
        .catch(error => { return this.processHttpMsgService.handleError(error)[0];});

    }

}