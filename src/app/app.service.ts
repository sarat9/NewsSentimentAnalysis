import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {


  private profileUrl:string = "http://localhost:8080/myprofile/";
     constructor( private _http: Http ) {
     }

     getProfileDetails(uid): Observable<String> {
         let headers = new Headers( { 'Content-Type': 'application/json','Authorization':'Basic '+btoa('sarat:sarat') } );
         let options = new RequestOptions( { headers: headers } );
         return this._http
             .get( this.profileUrl+uid,  options)
             .map(( response: Response ) => response.json() as any )
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
