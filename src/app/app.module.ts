import { NgModule, APP_INITIALIZER } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxNotificationComponent } from 'ngx-notification';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './app-config.service';

import { HomeModule } from '../home/home.module';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthTokenInterceptor } from '../auth/auth-token.interceptor';
import { ServerOfflineInterceptor } from '../auth/server-offline.interceptor';

import { ProgressColorService } from '../shared/services/progress-color.service';
import { ProgressLoadingService } from '../shared/services/loading-response-progress.service';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { NotFoundModule } from '../404/not-found.module';
import { BlockUIModule } from 'primeng/blockui';
import { LoggedInGuard } from 'src/account/logged.in.guard';
const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

const ServerOfflineInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerOfflineInterceptor,
  multi: true,
};

const AuthTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};

const AppConfigServiceProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFn,
  multi: true,
  deps: [AppConfigService]
};

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BlockUIModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    MaintenanceModule,
    NotFoundModule
  ],
  declarations: [ 
    AppComponent,
    NgxNotificationComponent 
  ],
  providers: [
    AppConfigService,
    AppConfigServiceProvider,
    AuthService, 
    AuthGuard,
    LoggedInGuard,
    ServerOfflineInterceptorProvider,
    AuthTokenInterceptorProvider,
    ProgressColorService,
    ProgressLoadingService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule {}
