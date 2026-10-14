import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardBodyComponent } from './components/dashboard-body/dashboard-body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {AccountSettingsModule} from './components/account-settings/account-settings.module';
import { ToastrModule } from 'ngx-toastr';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CourseListComponent } from './components/dashboard-courses/course-list/course-list.component';
import { VideoPlayerComponent } from './components/dashboard-courses/course-list/video-player/video-player.component';
import { CourseProgressComponent } from './components/course-progress/course-progress.component';
import { ChangeBgDirective } from './change-bg-directive';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { QuizzesListComponent } from './components/quizzes/quizzes-list/quizzes-list.component';
import { QuestionComponent } from './components/quizzes/quizzes-list/quiz/question/question.component';
import { QuizComponent } from './components/quizzes/quizzes-list/quiz/quiz.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    DashboardBodyComponent,
    DashboardComponent,
    DashboardCoursesComponent,
    HomeComponent,
    LandingPageComponent,
    CourseListComponent,
    VideoPlayerComponent,
    CourseProgressComponent,
    ChangeBgDirective,
    QuizzesComponent,
    QuizzesListComponent,
    QuestionComponent,
    QuizComponent,
    AboutUsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AccountSettingsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
