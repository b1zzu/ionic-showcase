import {Component, OnInit} from '@angular/core';
// import {CheckResultMetrics, DeviceCheckResult, DeviceCheckType, SecurityService} from '@aerogear/security';
// import {Dialogs} from '@ionic-native/dialogs/ngx';
import {Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {MetricsService} from '@aerogear/core';
// import {OpenShiftService, Service} from '../../services/openshift.service';
import { SecurityService } from '../../services/security.service';


declare var navigator: any;
@Component({
    selector: 'apptrust',
    templateUrl: './apptrust.page.html',
    styleUrls: ['./apptrust.page.scss'],
})

export class AppTrustPage implements OnInit {
  private static readonly METRICS_KEY = 'security';
  private platform: Platform;
  public serverUrl;

  constructor(private securityService: SecurityService, private alertController: AlertController) {

  }

  public clientInit() {
    this.securityService.clientInit()
    .then(clientData => {
      if (clientData.data.disabled) {
        const disableAlert = this.alertController.create({
          header: 'Application Trust',
          subHeader: 'Mobile Security Service',
          message: clientData.data.disabledMessage,
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
      } else {
        const activeAlert = this .alertController.create({
        header: 'Application Trust',
          subHeader: 'Mobile Security Service',
          message: 'This application is currently enabled',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
      }
    })
    .catch(Error => {
      const disconnectAlert = this .alertController.create({
        header: 'Application Trust',
          subHeader: 'Mobile Security Service',
          message: 'Unable to connect to the Mobile Security Service, Check your internet connection',
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
    });
  }

  ngOnInit() {
  }

  public ionViewWillEnter(): void {
    this.serverUrl = this.securityService.getURL();
  }
}
