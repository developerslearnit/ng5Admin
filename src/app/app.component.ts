import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `<div id="page-preloader" style="display:none">
  <span class="spinner"></span>
</div><router-outlet></router-outlet>`
})
export class AppComponent { }
