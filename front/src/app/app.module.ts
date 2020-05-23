import { AlertsService } from './toastr/toastr.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './messages/message/message.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageInputComponent } from './messages/message-input/message-input.component';
import { MessageRecentComponent } from './messages/message-recent/message-recent.component';
import { MessageService } from './messages/service/message.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HeaderComponent,
    HomeComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent,
    MessageRecentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
    MessageService,
    AlertsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
