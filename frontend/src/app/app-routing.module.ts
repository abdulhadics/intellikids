import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardBodyComponent } from './components/dashboard-body/dashboard-body.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { CourseListComponent } from './components/dashboard-courses/course-list/course-list.component';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CourseProgressComponent } from './components/course-progress/course-progress.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { QuizzesListComponent } from './components/quizzes/quizzes-list/quizzes-list.component';
import { QuizComponent } from './components/quizzes/quizzes-list/quiz/quiz.component';
import { QuestionComponent } from './components/quizzes/quizzes-list/quiz/question/question.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },  
  {
    path: 'home',
    component: LandingPageComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardBodyComponent
      },
      {
        path: 'my/progress',
        component: CourseProgressComponent
      },
      {
        path: 'account-settings',
        children: [
          {
            path: '',
            component: AccountSettingsComponent
          }
        ]
      },
      {
        path: 'my/courses',
        children: [
          {
            path: '',
            component: DashboardCoursesComponent
          },
          {
            path: ':id',
            component: CourseListComponent,
          },
        ]
      },
      {
        path: 'my/quizzes',
        children: [
          {
            path: '',
            component: QuizzesComponent
          },
          {
            path: ':id',
            component: QuizzesListComponent,
          },
        ]
      },
      {
        path: 'quiz-attempt',
        component: QuizComponent
      },
      {
        path: 'quiz',
        component: QuestionComponent
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
