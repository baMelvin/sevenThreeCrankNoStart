import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphTraversalService } from './services/graph-traversal.service';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SavedDiagnosis } from './services/graph-traversal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    CardComponent,
    FormsModule
  ],
  providers: [
    GraphTraversalService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes$: Observable<string>;
  savedDiagnoses$: Observable<SavedDiagnosis[]>;
  notes: string = '';

  constructor(private graphService: GraphTraversalService) {
    this.notes$ = this.graphService.notes$;
    this.savedDiagnoses$ = this.graphService.savedDiagnoses$;
  }

  ngOnInit(): void {
    this.notes$.subscribe((notes) => {
      this.notes = notes || ''; 
    });
  }

  updateNotes(value: string) {
    this.graphService.updateNotes(value); 
  }

  saveDiagnosis() {
    this.graphService.saveDiagnosis();
  }
}
