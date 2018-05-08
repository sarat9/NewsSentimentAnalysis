import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

import { HttpResponse } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class NewsdataService{

  private newsorgUrl:string="http://newsapi.org/v2/everything?q=pnb&from=2018-05-06&to=2018-05-06&sortBy=popularity&apiKey=18a81e7f02da4a14990277a8e2e386c5";
  private newsorgUrlExternal:string="http://newsapi.org/v2/everything?q=pnb&from=2018-05-06&to=2018-05-06&sortBy=popularity&apiKey=18a81e7f02da4a14990277a8e2e386c5";

  public postcupdata={};

     constructor( private _http: HttpClient, private datePipe:DatePipe ) {
       let currentdate=this.datePipe.transform(Date(), 'yyyy-MM-dd')
       console.log(this.datePipe.transform(Date(), 'yyyy-MM-dd')); //whatever format you need.
       let olddate=this.datePipe.transform(new Date(new Date().getTime()-(30*24*60*60*1000)),'yyyy-MM-dd');
       console.log(this.datePipe.transform(new Date(new Date().getTime()-(30*24*60*60*1000)),'yyyy-MM-dd'));

       this.newsorgUrl="http://newsapi.org/v2/everything?q=pnb&from="+olddate+"&to="+currentdate+"&sortBy=popularity&apiKey=18a81e7f02da4a14990277a8e2e386c5";
       this.newsorgUrlExternal="&from="+olddate+"&to="+currentdate+"&sortBy=popularity&apiKey=18a81e7f02da4a14990277a8e2e386c5";

     }




     getNewsFromWeb(): Observable<HttpResponse<any>> {
         let headers = new Headers( { 'Content-Type': 'application/json' } );
         let options = new RequestOptions( { headers: headers } );
         return this._http
             .get( this.newsorgUrl, { observe: 'response'})
             .map(( response: HttpResponse<any> ) => response )
             .catch( this.handleErrorObservable );
     }
     getNewsFromWebById(query): Observable<HttpResponse<any>> {
         let headers = new Headers( { 'Content-Type': 'application/json' } );
         let options = new RequestOptions( { headers: headers } );
         return this._http
             .get( "http://newsapi.org/v2/everything?q="+query+this.newsorgUrlExternal, { observe: 'response'})
             .map(( response: HttpResponse<any> ) => response )
             .catch( this.handleErrorObservable );
     }


     private handleError( error: Response | any ) {
         console.error( error.message || error );
         return Observable.throw( error.message || error );
     }

     private handleErrorObservable (error: Response | any) {
          console.error(error.message || error);
          return Observable.throw(error.message || error);
     }

   }
