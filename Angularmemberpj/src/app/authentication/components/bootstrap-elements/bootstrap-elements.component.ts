import { Component, OnInit } from '@angular/core';
declare const $;

@Component({
    selector: 'app-bootstrap-elements',
    templateUrl: './bootstrap-elements.component.html',
    styleUrls: ['./bootstrap-elements.component.css']
})
export class BootstrapElementsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        $('.bs-component [data-toggle="popover"]').popover();
        $('.bs-component [data-toggle="tooltip"]').tooltip();
    }

}
