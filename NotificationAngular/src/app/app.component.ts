import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NotificationAngular';

  ngOnInit() {
    navigator.serviceWorker.register('./ngsw-worker.js')
      .then(event => console.log(event));


    if ('Notification' in window) {
      // Notifications are supported
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // Permission has been granted

          }
        });
      }
    }
    if (Notification.permission === 'granted') {
      // navigator.serviceWorker.getRegistration().then(function (reg: any) {
      //   reg.showNotification("Hello world!");

      //   reg.showNotification("Hello world 2!", {
      //     serviceWorkerRegistration: reg,
      //     body: "Notification Text...",
      //     icon: "my-icon.ico",
      //     actions: [
      //       {
      //         action: "Start",
      //         title: "Start"
      //       },
      //       {
      //         action: "Stop",
      //         title: "Stop"
      //       }
      //     ],
      //     autoClose: 4000
      //   });

      //   console.log(self);
      //   self.addEventListener("notificationclick", function (event) {
      //     console.log("clicked event", event);
      //   });
      // });
      if ("serviceWorker" in navigator) {
        // Supported!
        navigator.serviceWorker.ready.then(function (registration) {
          const title = 'Hello MoonTech';

          const options = {
            body: 'Taking a short break can do wonders for your productivity.So please take a moment to recharge yourself and come back ready to conquer your tasks.',
            icon: 'assets/moon_app_logo.svg',
            actions: [
              {
                action: 'yes',
                type: 'button',
                title: '👍 Yes',
              },
              {
                action: 'no',
                type: 'button',
                title: '👎 No',
              },
            ],
          };
          // Promise.all([this.swRegistration]).then((registration: any) => {
          registration.showNotification(title, options);
          // ServiceWorkerRegistration.prototype.showNotification(title, options);
          // })
        });
      }
      // const notification = new Notification(`Hello`, {
      //   body: 'Taking a short break can do wonders for your productivity.So please take a moment to recharge yourself and come back ready to conquer your tasks.',
      //   // icon: 'assets/images/moon_app_logo.svg',
      //   // actions: [
      //   //   { action: 'view', title: 'View' },
      //   //   { action: 'dismiss', title: 'Dismiss' }
      //   // ]
      // });

      // notification.onclick = () => {
      //   // Handle click event
      //   alert('hii')
      // };

      // notification.addEventListener('action', (event: any) => {
      //   if (event.action === 'view') {
      //     // handle the view action
      //   } else if (event.action === 'dismiss') {
      //     // handle the dismiss action
      //   }
      // });

      // setTimeout(() => {
      //   notification.close();
      // }, 5000); // Close the notification after 5 seconds

    }
  }
}
