import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphTraversalService } from './services/graph-traversal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  providers: [GraphTraversalService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
}
