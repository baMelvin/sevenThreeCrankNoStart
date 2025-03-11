import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphTraversalService } from '../../services/graph-traversal.service';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit {
  question: string = '';
  isFinal: boolean = false;
  constructor(private graphService: GraphTraversalService) {}

  ngOnInit(): void {
    this.graphService.loadGraph().subscribe((graph: any) => {
      const node = this.graphService.startTraversal(graph);
      this.updateQuestion(node);
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
    this.graphService.loadGraph().subscribe((graph: any) => {
      const node = this.graphService.startTraversal(graph);
      this.updateQuestion(node);
    });
  }
}
