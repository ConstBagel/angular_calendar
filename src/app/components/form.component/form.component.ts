import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import { UserInfo } from '../../services/user_info.interface';


@Component({
    selector: 'form-app',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
    userNames: string[];
    data: UserInfo | null;
    statusList: string[];
    isNotPastDate: boolean;
    allowEditor: boolean;
    pickedOption: string;
    pickData: { date: string, userId: string};
    restDays: {};
    currentSratus: string;
    daysByStatus: number[];
  
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private calendarServie: CalendarService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const result = this.calendarServie.getDataByDateAndUserId(params['date'], params['user']);
            this.data = Boolean(result) ? result.pop() : null;
            this.pickData = { date: params['date'], userId: params['user']};
            this.statusList = this.calendarServie.getListOfStatusItems(params['date'], params['user']);
            this.isNotPastDate = params['date'] >= new Date().toLocaleDateString('fr-ca');
            this.allowEditor = !this.data && this.isNotPastDate;
            this.pickedOption = this.data ? this.statusList.find(el => el == this.data.status) : this.statusList[0];
            this.currentSratus = this.statusList[this.statusList.indexOf(this.pickedOption)];
            this.restDays = this.calendarServie.getUserDays(params['user']);
            console.log(this.restDays);
            this.daysByStatus = this.createStatusList(this.data ? 1 :this.restDays[this.currentSratus]);
            console.log(this.daysByStatus);
        }); 
    }
    
    onEditItem() {
        this.allowEditor = !this.allowEditor;
    }

    onDeleteItem() {
        this.calendarServie.deleteItemByDateAndId(this.pickData.date, this.pickData.userId, this.data.status);
        this.router.navigate(['/calendar'],{ queryParams: { user: this.pickData.userId } });
    }

    createStatusList(len: number) {
        return Array(len).fill(1).map((el,ind) => el+ind);
    }

    changeStatus() {
        this.daysByStatus = this.createStatusList(this.restDays[this.pickedOption]);
        console.log(this.daysByStatus);
    }

    onSubmit(form: NgForm) {
            console.log(form.value);
            this.calendarServie.createOrUpdateByDateAndId(
                this.pickData.date,
                {
                    id: this.pickData.userId,
                    title: 'Hello',
                    status: form.value.status,
                    text: form.value.comment
                }, form.value.dayAmount)
            this.router.navigate(['/calendar'],{ queryParams: { user: this.pickData.userId } });
    }

    onCancel() {
        this.router.navigate(['/calendar'],{ queryParams: { user: this.pickData.userId } });
    }
}