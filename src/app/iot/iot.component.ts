import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import * as io from 'socket.io-client';
const title = 'sunil';
@Component({
selector: 'app-iot',
styleUrls: ['./iot.component.css'],
templateUrl: './iot.component.html'
})
export class IotComponent implements OnInit {
    options: Object;
    options1: Object;
    iot$: Observable<{}>;
    chart;
    temperature;
    humidity;
    temp1: string;
    private socket;
    private url = 'http://localhost:3000';
    private temp2: Object = {
        temperature: 0,
        humidity: 0
    };
    msg : any;
    constructor(
        private http: Http,
    ) {
        this.options = {
            chart: { type: 'solidgauge' },
            title: { text : 'Temperature - Device 1'},
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:  '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                    text: 'Temperature'
                },
                labels: {
                    y: 16
                },
                min: 0,
                max: 100
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },

            credits: {
                enabled: false
            },
            series: [{
                name: 'Temperature',
                data: [0],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color: black' +
                    '">{y}</span><br/>' +
                    '<span style="font-size:16px;color:silver">C</span></div>'
                },
                tooltip: {
                    valueSuffix: ' C'
                }
            }]

        };


        this.options1 = {
            chart: { type: 'solidgauge' },
            title: { text : 'Humidity - Device 1'},
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:  '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                    text: 'Humidity'
                },
                labels: {
                    y: 16
                },
                min: 0,
                max: 100
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Humidity',
                data: [0],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color: black' +
                    '">{y}</span><br/>' +
                    '<span style="font-size:16px;color:silver">%</span></div>'
                },
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        };
    }

    public ngOnInit() {
        this
            .getMessage()
            .subscribe(msg => {
                this.processTemp(JSON.parse(msg['text']))
                this.msg = "1st "+msg;
            });
    }

    private getMessage() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    private getIot() {
        return this.http.get('/api/awsiot/ping')
            .map((res: Response) => res.json())
    }

    saveTemperature(chartInstance) {
        this.temperature = chartInstance;
    }
    saveHumidity(chartInstance) {
        this.humidity = chartInstance;
    }
    processTemp(res){
            this.temp1 = res.values.temperature;
            this.temperature.series[0].points[0].update(res.values.temperature);
            this.humidity.series[0].points[0].update(res.values.humidity | 1);
    }
}
