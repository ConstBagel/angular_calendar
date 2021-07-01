import { User } from './user.interface';
import { UserInfo } from './user_info.interface';

export class CalendarService {
  private years: number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2019, 2020];
  private daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  private monthes: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  private statusItems = [
    { pastTime: false, status: 'Day-Off'},
    { pastTime: false, status: 'Vacation'},
    { pastTime: true, status: 'Sick leave'}
  ];
  private permission = [
    {
      id: '0',
      login: 'test',
      password: 'test'
    }
  ];

  private users: User[] = [
    {
      id: '0',
      name: 'Admin',
      days: null
    },
    {
      id: '1',
      name: 'Saga',
      days: { 'Day-Off': 2, 'Sick leave': 10, 'Vacation': 24 }
    },
    {
      id: '2',
      name: 'Tosha',
      days: { 'Day-Off': 2, 'Sick leave': 10, 'Vacation': 24 }
    }
  ];
  private informationPerDate: {[key: string]: UserInfo[] } = {
    [`2020-04-30`]: [{
      id: '1',
      title: 'Hello',
      status: 'Day-Off',
      text: 'Just in case'
    },
    {
      id: '2',
      title: 'Hello',
      status: 'Day-Off',
      text: 'Hello my case'
    }],
    [`2020-04-29`]: [{
      id: '1',
      title: 'Hello',
      status: 'Day-Off',
      text: 'Just in case'
    },
    {
      id: '2',
      title: 'Hello',
      status: 'Sick leave',
      text: 'Hello my case'
    }],
    [`2020-04-28`]: [{
      id: '1',
      title: 'Hi',
      status: 'Sick leave',
      text: 'Just reminder'
    },
    {
      id: '2',
      title: 'Hello',
      status: 'Day-Off',
      text: 'Just reminder'
    }],
    [`2020-04-27`]: [{
      id: '1',
      title: 'Hi',
      status: 'Sick leave',
      text: 'Just reminder'
    },
    {
      id: '2',
      title: 'Hello',
      status: 'Day-Off',
      text: 'Just reminder'
    }]
  };

  private CONST_DATA  = {
	      LENGTH_WEEK: 7,
        FIRST_MONTH_DATE: 1,
        FIRST_DAY_WEEK: 0,
  	    CURRENT_DATE: new Date()
    };
  
  constructor() { }

  getCurrenDate(): Date {
    return this.CONST_DATA.CURRENT_DATE;
  }

  getYearByIndex(index: number): number {
    return this.years[index];
  }

  getArrayOfYears(): number[] {
    return this.years.slice();
  }

  getArrayOfMonths(): string[] {
    return this.monthes.slice();
  }

  getArrayOfWeekDays(): string[] {
    return this.daysOfWeek.slice();
  }

  getCalendar(year: number, month: number): number[][] {
    let date = new Date(year, month, this.CONST_DATA.FIRST_MONTH_DATE);
    const dates: { _id: string, _date: number, _currentMonth: boolean, _currentDate: boolean }[] = [];
    const currentYear = this.CONST_DATA.CURRENT_DATE.getFullYear();
    const currentMonth = this.CONST_DATA.CURRENT_DATE.getMonth()
    const currentDate = this.CONST_DATA.CURRENT_DATE.getDate();
    date.setDate(date.getDate() - date.getDay());
    console.log(date.toJSON());
    while(true) {
      let tempDate = date.getDate();
      let isCurrentYear = date.getFullYear() === currentYear;
      let isCurrenMonth = date.getMonth() === currentMonth;
      let isCurrentDate = date.getDate() === currentDate;
      dates.push({
        _id: date.toLocaleDateString('fr-ca'),
        _date: tempDate,
        _currentMonth: isCurrentYear && isCurrenMonth,
        _currentDate: isCurrentYear && isCurrenMonth && isCurrentDate
      });
      date.setDate(++tempDate);
       if(date.getMonth() != month && date.getDay() === this.CONST_DATA.FIRST_DAY_WEEK) break;
    }
    return dates.reduce((prev, cur, index) =>
    (index % 7 == 0 ? prev.push([cur]) : prev[prev.length - 1].push(cur)) && prev,
     []);

   /* let date = new Date(year, month);
    const currentMonth = this.CONST_DATA.CURRENT_DATE.getMonth();
    const currentDate = this.CONST_DATA.CURRENT_DATE.getDate();               
    date.setDate(this.CONST_DATA.FIRST_MONTH_DATE);
    const dayOfWeekForFirstDate = date.getDay();
    const rawAmount = new Date( , ).getDay() === 6 : 5 
    console.log(rawAmount);
    date.setDate(date.getDate() - dayOfWeekForFirstDate);

    let calendarArr = Array(this.CONST_DATA.LENGTH_WEEK).fill(null);
    calendarArr = calendarArr.map( el => {
      let tempObj = {
        _date: null,
        _currentMonth: false,
        _currentDate: false
      };
      tempObj._date = date.getDate();
      tempObj._currentMonth = (date.getMonth() === currentMonth);
      tempObj._currentDate = tempObj._currentMonth && tempObj._date === currentDate;
      let tempObj = (function(date, curMonth, curDate) {
        let el: { _date: number, _currentMonth: boolean, _currentDate: boolean};
        el._date = date.getDate();
        el._currentMonth = (date.getMonth() === curMonth); 
        el._currentDate = (el._currentMonth && el._date === curDate);
        return el;
      })(date, currentMonth, currentDate);
      date.setDate(tempObj._date+1);
      console.log(tempObj);
      return tempObj;
      });*/
      /**
       * return multidimensions array with internal length - 7 elements
       
      return calendarArr.reduce((rows, key, index) => (index % this.CONST_DATA.LENGTH_WEEK == 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows, []);*/
  }

  getIdByCreds(_login: string, _password: string): string | null {
    const result = this.permission.find(el => el.login === _login && el.password === _password);
    return result ? result.id : null;
  }

  getNameById(_id: string): string | null {
    return this.users.find(el => el.id === _id).name;
  }

  getDataByDate(_date: string): UserInfo[] {
    return this.informationPerDate[_date];
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  getUserByIndex(ind: number): User {
    return this.users[ind];
  }
  
  getDataByDateAndUserId(date: string, userId: string): UserInfo[] | null {
    if(this.informationPerDate[date]) {
      return this.informationPerDate[date].filter(el => el.id === userId);
    }
      return null;
  }

  getListOfStatusItems(date: string, id: string): string[] {
     if(this.informationPerDate[date]) {
        //const userStatus = this.informationPerDate[date].find(obj => obj.id === id);
        //console.log('user is', userStatus);
        //return userStatus ? this.statusItems.filter(el => el.text !== userStatus) : this.statusItems;
     }
     const isPast = date < this.CONST_DATA.CURRENT_DATE.toLocaleDateString('fr-ca');
     console.log('Is present or future', isPast);
     return this.statusItems
        .filter(el => el.pastTime === isPast)
        .map(el => el.status);
  }
  
  getNumberByType(userId: string, type: string): number {
    return this.users.find(user => user.id === userId).days[type];
  }

  setAmountOfDaysAfterChange(userId: string, type: string, amount: string) {
    this.users.find(user => user.id === userId).days[type] -= +amount;
  }
  
  increaseAmountOfDaysToOne(userId: string, type: string) {
    this.users.find(user => user.id === userId).days[type] += 1;
  }
  
  deleteItemByDateAndId(date: string, id: string, status: string): boolean {
    if(date in this.informationPerDate) {
      this.informationPerDate[date] = this.informationPerDate[date].filter(el => el.id !== id);
      this.users = this.users.map(user => {
        if(user.id === id) {
          user.days[status] += 1;
        }
        return user;
      })
      return true;
    }
    return false;
  }
  
  createOrUpdateByDateAndId(date: string, data: UserInfo, count: number) {
      console.log('Received obj', date);
      if(date in this.informationPerDate) {
        const isPresent = this.informationPerDate[date].some(el => el.id === data.id);
        if(isPresent) {
        this.informationPerDate[date] = this.informationPerDate[date].map(el =>
          el.id === data.id ? data  : el
          );
          return;
         }
        this.informationPerDate[date].push(data);
        return;
      }
      Array(count).fill(1).forEach(el => {
        this.informationPerDate[date] = [data];
        this.users = this.users.map(user => {
          if(user.id === data.id) {
              user.days[data.status] -= el;
          }
          return user;
        });
        const tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate()+el);
        date = tempDate.toLocaleDateString('fr-ca');
       });
      //this.informationPerDate[date] = [data];
      return;
  }

  getUserDays(id: string): {} {
    return this.users[id].days;
  }
}