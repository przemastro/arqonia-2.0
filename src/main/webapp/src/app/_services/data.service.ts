import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Environment} from '../environment';
import {ObjectInfo} from "../_domain-objects/objects";
import {List} from 'immutable';
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/publishLast'

@Injectable()
export class DataService {

  flag: boolean;

  constructor(
    private http: HttpClient) {
  }

  object: any = [];
  objectName: string = '';

  private apiUrl = Environment.baseUrl;

  //declare BehaviorSubject _searchData with initial empty List
  private _searchData: BehaviorSubject<List<string>> = new BehaviorSubject(List([]));

  //expose an observable on _searchData, which listens if there are new emits
  get searchData() {
    return this._searchData.asObservable();
  }

  // TODO Add error handling e.g. for 404-Not-Found and so on...
  searchObject(object: ObjectInfo): Observable<any> {
    let data = this.getDataFromBackend(object);

    //emit latest response
    data.subscribe(response => {
        this._searchData.next(response);

        console.log('adamo success response = ' + response);
      },
      (error) => {
        // this._searchData.next(error);

        console.log('adamo failed response = ' + JSON.stringify(error));

      });

    return data;
  }

  private getDataFromBackend(object: ObjectInfo): Observable<any> {
    let formData = [object].map(object => "objectName=" + object.objectName + "&objectType=" + object.objectType).pop();

    return this.http.post(`${this.apiUrl}/search`, formData, {
      responseType: 'json',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    }).share();
  }
}

