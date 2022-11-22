import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userid = new BehaviorSubject<Number>(0);
  loggedIn = new BehaviorSubject<boolean>(false);
  temp: boolean = false;
  public userList: any;

  constructor(private db: AngularFireDatabase,
    private route: Router,
    private toastr: ToastrService,
    private fireauth: AngularFireAuth) {
  }

  async signup(obj: any) {
    return new Promise(async (resolve, reject) => {
      await this.fireauth.createUserWithEmailAndPassword(obj.email, obj.password)
        .then(res => {
          console.log(res);
          let id;
          this.userid.subscribe(res => {
            id = res;
          })
          id = Number(id) + 1;
          obj.id = id;
          this.db.object(`userData/${id}`).set(obj);
          this.route.navigate(['signin']);
          this.toastr.success('User Added Successdully');
        })
        .catch(error => {
          reject(error.code)
        })
    })

  }

  async signin(obj: any) {
    this.loggedIn.next(true);
    return new Promise(async (resolve, reject) => {
      await this.fireauth.signInWithEmailAndPassword(obj.email, obj.password)
        .then(res => {
          console.log(res);
          localStorage.setItem('LoginUser', JSON.stringify(res))
          this.route.navigate(['main/dashboard']);
          this.toastr.success('User Login Successdully');
        })
        .catch(error => {
          // console.log(error.message);
          reject(error.code);
        })
    })

  }

  async getList() {
    let user;
    await this.getUserData().then(value => {
      user = value as [];
      this.userList = user;
      this.userid.next(this.userList[this.userList.length - 1].id);
    }).catch(error => {
      // console.log(error);
    })

  }

  getUserData() {
    return new Promise((resolve, reject) => {
      this.db.list('userData').valueChanges().subscribe(res => {
        if (res === undefined) {
          reject('data is empty');
        } else {
          resolve(res);
        }
      })

    });
  }
}
