import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
const title = 'sunil';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html'
})
export class IotComponent implements OnInit {
  iot$: Observable<{}>;
  constructor(
    private http: Http
  ) { }
  public ngOnInit(){
  this.getIot().subscribe(
            res => {
              this.iot$ = res
                console.log(res)
            },
            err => {
                console.log(err);
            }
        );
  }
  private getIot(){
    return this.http.get('/api/awsiot/ping')
                .map((res: Response) => res.json())
  }
}
