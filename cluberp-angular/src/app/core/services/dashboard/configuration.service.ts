import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient
  ) {
  }

  getConfigurationKeyValuePairs() {
    return this.http.get('events/configurations/key-value-pairs/');
  }
}
