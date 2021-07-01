import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarService } from '../../../services/calendar.service'
import { UserInfo } from '../../../services/user_info.interface';
@Component({
    selector: 'cell-app',
    templateUrl: './cell.component.html'
})
export class CellComponent implements OnInit {
    @Input() day: number;
    @Input() dateId: string;
    userId: string;
    data: UserInfo[];
    constructor(
        private calendarService: CalendarService,
        private router: Router,
        private route: ActivatedRoute) {
        }
    ngOnInit() {
        //this.data = this.calendarService.getDataByDate(this.id);
        this.route.queryParams.subscribe(params => {
            this.userId = params['user'];
            this.data = this.calendarService.getDataByDateAndUserId(this.dateId, this.userId);
        });
    }

    redirectToInfo() {
        if(Boolean(+this.userId)) {
        this.router.navigate(['form'], { queryParams: { user: this.userId, date: this.dateId } })
        }
    }
}