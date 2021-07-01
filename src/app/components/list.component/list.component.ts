import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'list-app',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit  {
    @Input() data: string[] | number[];
    @Input() idItems: string[] | number[];
    @Input() pickItem: number;
    @Output() val: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}
    
    ngOnInit() {
    }

    onChangeData(data: string) {
        this.val.emit(+data);
    }
}
