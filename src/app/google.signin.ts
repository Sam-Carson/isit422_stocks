// this login scheme was dervied from this article
//  https://stackoverflow.com/questions/42279585/how-to-use-google-api-from-different-components-of-angular


import {Component, ElementRef, AfterViewInit} from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button mat-raised-button id="googleBtn">Google Sign-In</button>'
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '325106435628-sa9a541jbifm7jo9pl88oha204ius96h.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element: any) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser: { getBasicProfile: () => any; }) {

        let profile = googleUser.getBasicProfile();
       // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

          // save 2 to this session's strorage
         sessionStorage.setItem('ID:', profile.getId() );
          sessionStorage.setItem('Name:', profile.getName() );
        window.location.href = '/stockwatch';


      }, function (error: any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}