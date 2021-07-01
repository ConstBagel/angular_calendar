import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "calendar-app",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  years: number[] = null;
  months: string[] = null;
  weekDay: string[] = null;
  calendar: number[][] = null;
  pickYear: number;
  pickMonth: number;
  teamMembers: string[];
  currentUserId: number;
  
  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.years = this.calendarService.getArrayOfYears();
    this.months = this.calendarService.getArrayOfMonths();
    this.weekDay = this.calendarService.getArrayOfWeekDays();
    this.pickYear = +this.calendarService.getCurrenDate().getFullYear();
    this.pickMonth = +this.calendarService.getCurrenDate().getMonth();
    this.changeCalendar();
    this.teamMembers = this.calendarService.getUsers()
      .map(el => el.name);
    this.route.queryParams.subscribe(param => {
      this.currentUserId = this.calendarService.getUsers()
      .findIndex(user => user.id === param['user']);
    });
  }

  getIndexOfYear(): number {
    return this.years.indexOf(this.pickYear);
  }

  onPickYear(val: number) {
    this.pickYear = this.calendarService.getYearByIndex(val);
    this.changeCalendar();
  }

  onPickMonth(val: number) {
    this.pickMonth = val;
    this.changeCalendar();
  }

  onPickTeamMember(val: number) {
    this.router.navigate(['/calendar'], 
    {queryParams: { user: this.calendarService.getUserByIndex(val).id}});
  } 

  private changeCalendar() {
    this.calendar = this.calendarService.getCalendar(
      this.pickYear,
      this.pickMonth
    );
    console.log(this.calendar);
  }
}
