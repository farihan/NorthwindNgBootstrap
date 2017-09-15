import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NotificationService } from './../../services/notification.service';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string,
        private loadingBarService: SlimLoadingBarService,
        private notificationService: NotificationService) {
        this.loadingBarService.start(() => {
            console.log('Loading complete');
        });

        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
            this.loadingBarService.complete();
            this.notificationService.info('Weather forecast list loaded...');
        }, error => {
            this.loadingBarService.complete();
            this.notificationService.error(error);
            console.error(error);
        });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
