import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
import { GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth,
    private route: Router) { }

  signInWithGoogle() {
    this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      console.log(res);
      console.log(res.user?.email);
      console.log('sign in success');
      this.route.navigate(['dashboard']);
    }).catch(error => {
      console.log('Error in signin', error);
    })
  }
}
