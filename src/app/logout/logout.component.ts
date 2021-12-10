import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  clearLoginData(): void {
    sessionStorage.clear();
    window.location.href = '';
  }

  ngOnInit(): void {
  }

}
