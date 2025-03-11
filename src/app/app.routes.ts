import { Routes } from '@angular/router';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';

export const routes: Routes = [
  { path: '', component: DiagnosisComponent }, // Default route
  { path: '**', redirectTo: '' } // Redirect any unknown paths to default
];
