import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  apiUrl = 'http://api.github.com/users/';

  getData(user: string): Observable<any> {

    return new Observable<any>((x)=>{
      var request = new XMLHttpRequest();
      request.open('get', this.apiUrl + user, true);
      request.send();
      request.onload = function () {
        var data = JSON.parse(this.response);
        x.next(data)
      }
    })

  }
}
