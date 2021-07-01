import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';
@Component({
    selector: 'reg-app',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    @ViewChild('form', {static: false}) formComponent: NgForm;
    invalid: boolean;
    constructor(private router: Router,
        private calendarService: CalendarService) {
    }
    ngOnInit() { 
        this.invalid = false;
    }

    onSubmit() {
        const data: { login: string, password: string} = this.formComponent.value;
        const id = this.calendarService.getIdByCreds(data.login, data.password);
        //const isValid = Object.values(data).every(el => el === 'test');
        if(id) {
            console.log('Success');
            this.router.navigate(['/calendar'], { queryParams: { user: id } });
        }
        else {
            this.invalid = !id;
        }
    }
}