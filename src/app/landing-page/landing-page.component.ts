import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
  
export class LandingPageComponent implements OnInit {

  loggedIn: boolean = false;
  loggedOut: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
   
      if (sessionStorage.getItem('ID:') == null) {
        this.loggedIn = false;
        this.loggedOut = true;
      } else {
        this.loggedIn = true;
        this.loggedOut = false;
      }
      
    })
  }
}
