import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <app-header />

    <div class="user-page">
        <router-outlet></router-outlet>
    </div>

    <app-footer />
  `,
  styles: `
    :host { 
      display: flex;
      flex-direction: column;
      height: 100%; 
      width: 100%;
    }
    .user-page { flex: 1 1 auto; padding: 0 20px 30px 20px;}

    @media screen and (max-width: 650px) {.user-page { padding: 24px 20px }}
  `
})
export class UserComponent {

}
