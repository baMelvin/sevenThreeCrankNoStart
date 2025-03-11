import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphTraversalService } from '../../services/graph-traversal.service';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DiagnosticStepFormatPipe } from '../../diagnostic-step-format.pipe';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, DiagnosticStepFormatPipe],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit {
  question: string = '';
  isFinal: boolean = false;
  notes: string = '';
  currentStep: number = 1;

  private notesSubscription!: Subscription;

  constructor(private graphService: GraphTraversalService) {}

  ngOnInit(): void {
    this.graphService.loadGraph().subscribe((graph) => {
      const node = this.graphService.startTraversal(graph);
      this.updateQuestion(node);
    });

    this.graphService.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }

  move(answer: 'yes' | 'no') {
    const nextNode = this.graphService.moveToNext(answer);
    if (nextNode) {
      this.updateQuestion(nextNode);
    }
  }

  private updateQuestion(node: { question: string; final?: boolean }) {
    this.question = node.question;
    this.isFinal = node.final || false;
  }

  restart() {
    this.graphService.loadGraph().subscribe((graph) => {
      const node = this.graphService.startTraversal(graph);
      this.updateQuestion(node);
    });
  }

  updateNotes() {
    this.graphService.updateNotes(this.notes);
  }
  
  saveDiagnosis() {
    this.graphService.saveDiagnosis();
  }

  ngOnDestroy(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
