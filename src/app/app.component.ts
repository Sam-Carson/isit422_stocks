import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn: boolean = false;
  loggedOut: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) { }
  
  clearLoginData(): void {
    sessionStorage.clear();
    window.location.href = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
   
      if( sessionStorage.getItem('ID:') == null ) {
        this.loggedIn = false;
        this.loggedOut = true;
      } else {
        this.loggedIn = true;
        this.loggedOut = false;
      }
      // else if( sessionStorage.getItem('ID:').length < 5 ){
      //   this.loggedIn = false;
      //   console.log( sessionStorage.getItem('ID:') );
      //   console.log(this.loggedIn);
      // }
      console.log(sessionStorage);
      console.log('logged in: ' + this.loggedIn);
      console.log('logged out: ' + this.loggedOut);
      
      }
    )};

}
