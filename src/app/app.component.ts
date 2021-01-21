import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './service/loader.service';
import { MessageService } from 'primeng/api';
import { Router, NavigationStart } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoading: Subject<boolean> = this.loaderService.isLoading;


  constructor(
    private loaderService: LoaderService,
    private messageService: MessageService,
    private router: Router
  ) {

    this.router.events.subscribe(() => messageService.clear());
  }

  ngOnInit() {
  }

  onClose() {
    this.messageService.clear();
  }
}
