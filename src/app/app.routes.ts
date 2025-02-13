import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DuplicateDetectorComponent } from './components/duplicate-detector/duplicate-detector.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { UploadModalComponent } from './components/upload/upload.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'upload', component: UploadModalComponent },
    { path: 'duplicates', component: DuplicateDetectorComponent },
];