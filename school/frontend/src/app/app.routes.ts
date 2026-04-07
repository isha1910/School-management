import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { AdmissionComponent } from './features/admission/admission';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Notices } from './features/notices/notices';
import { Teachers } from './features/teachers/teachers';

import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Disclaimer } from './pages/disclaimer/disclaimer';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { Dashboard } from './dashboard/dashboard';
import { TeacherDashboard } from './teacher-dashboard/teacher-dashboard';

import { authGuard } from './guards/auth-guard';

// ✅ TEACHER MODULE COMPONENTS
import { StudentComponent } from './teacher-pages/student.component';
import { AttendanceComponent } from './teacher-pages/attendance.component';
import { AssignmentComponent } from './teacher-pages/assignment.component';

export const routes: Routes = [

  // 🌐 PUBLIC PAGES
  { path: '', component: Home },
  { path: 'admission', component: AdmissionComponent },
  { path: 'events', component: Events },
  { path: 'gallery', component: Gallery },
  { path: 'notices', component: Notices },
  { path: 'teachers', component: Teachers },

  { path: 'contact-us', component: Contact },
  { path: 'about-us', component: About },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'disclaimer', component: Disclaimer },

  // 🔐 AUTH
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // 🛠 ADMIN
  { path: 'admin-dashboard', component: Dashboard, canActivate: [authGuard] },

  // 🧑‍🏫 TEACHER DASHBOARD (MAIN FIX HERE 🔥)
  {
    path: 'teacher-dashboard',
    component: TeacherDashboard,
    canActivate: [authGuard], // optional but good
    children: [

      // 👉 DEFAULT OPEN STUDENTS
      { path: '', redirectTo: 'students', pathMatch: 'full' },

      // 👉 CHILD ROUTES
      { path: 'students', component: StudentComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'assignments', component: AssignmentComponent }
    ]
  },

  // 👨‍🎓 STUDENT PANEL
  { path: 'student-dashboard', component: Dashboard, canActivate: [authGuard] },

  // ❌ NOT FOUND
  { path: '**', redirectTo: '' }
];