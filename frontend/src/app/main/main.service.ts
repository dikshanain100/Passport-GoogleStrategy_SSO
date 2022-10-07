import { Injectable } from '@angular/core';
import { InternalHttpService } from '../shared/services/internal-http.service';
import { URLConstants } from '../shared/URLConstants';
import { OfflineService } from '../shared/services/offline.service';
import { DexieService } from '../shared/services/dexie.service';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private _httpClient: InternalHttpService
    ) {
  }







  //get all todos from the mongodb
  login(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.call(data, URLConstants.ssoLogin, 'GET').subscribe(
        res => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }



}
