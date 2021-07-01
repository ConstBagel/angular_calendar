import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'table-app',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {
    @Input() weekDayName: string[];
    @Input() month: number[][];
  /* constructor(private router: Router) {}
   passToCell(id: string) {
        this.router.navigate(['/cell', `${id}`]);
    }*/
}