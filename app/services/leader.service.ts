import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService{
    constructor(public http:Http,
        private processHttpMsgService: ProcessHTTPMsgService){}

    getLeaders(): Observable<Leader[]>{
        return this.http.get(baseURL+'leaders')
            .map(res => { return this.processHttpMsgService.extractData(res);})
            .catch(error => { return this.processHttpMsgService.handleError(error);});
    }

    getLeader(id: number): Observable<Leader>{
        return this.http.get(baseURL+'leaders/'+id)
        .map(res => { return this.processHttpMsgService.extractData(res);})
        .catch(error => { return this.processHttpMsgService.handleError(error);});

    }

    getFeaturedLeader(): Observable<Leader>{
        return this.http.get(baseURL+'leaders?featured=true')
        .map(res => { return this.processHttpMsgService.extractData(res)[0];})
        .catch(error => { return this.processHttpMsgService.handleError(error)[0];});

    }

}