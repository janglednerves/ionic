import {Component} from '@angular/core';
import {ionicBootstrap} from '../../../../../src';


@Component({
  templateUrl: 'main.html'
})
class E2EPage {}

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
class E2EApp {
  rootPage = E2EPage;
}

ionicBootstrap(E2EApp);
