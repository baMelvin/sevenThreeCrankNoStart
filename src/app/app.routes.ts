import { Routes } from '@angular/router';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { GraphTraversalService } from './services/graph-traversal.service';

export const routes: Routes = [
  { path: '',
     component: DiagnosisComponent,
        providers: [
          { provide: 'graphService', useClass: GraphTraversalService }
        ]
    }, // Default route
  { path: '**', redirectTo: '' } // Redirect any unknown paths to default
];
