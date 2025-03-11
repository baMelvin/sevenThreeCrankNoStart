import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

interface GraphNode {
  id: string;
  question: string;
  yes?: string;
  no?: string;
  final?: boolean;
}

interface GraphData {
  nodes: GraphNode[];
}

export interface SavedDiagnosis {
  question: string;
  notes: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GraphTraversalService {
  private graph: GraphData | null = null;
  private currentNode: GraphNode | null = null;
  private notesSubject = new BehaviorSubject<string>('');
  private currentQuestionSubject = new BehaviorSubject<string>('');
  private savedDiagnosesSubject = new BehaviorSubject<SavedDiagnosis[]>([]);

  notes$ = this.notesSubject.asObservable();
  currentQuestion$ = this.currentQuestionSubject.asObservable();
  savedDiagnoses$ = this.savedDiagnosesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadGraph(): Observable<GraphData> {
    let assets = this.http.get<GraphData>('/assets/sevenThreeDiagnonsis.json');
    
    return assets;
  }

  startTraversal(graph: GraphData): GraphNode {
    this.graph = graph;
    this.currentNode = graph.nodes.find(node => node.id === 'start') || null;
    if (this.currentNode) {
      this.currentQuestionSubject.next(this.currentNode.question);
    }
    return this.currentNode!;
  }

  getCurrentNode(): GraphNode | null {
    return this.currentNode;
  }

  moveToNext(answer: 'yes' | 'no'): GraphNode | null {
    if (!this.graph || !this.currentNode) return null;

    const nextId = this.currentNode[answer];
    if (!nextId) return null;

    this.currentNode = this.graph.nodes.find(node => node.id === nextId) || null;
    if (this.currentNode) {
      this.currentQuestionSubject.next(this.currentNode.question);
    }
    return this.currentNode;
  }

  updateNotes(notes: string) {
    this.notesSubject.next(notes);
  }

  getCurrentNotes(): Observable<string> {
    return this.notes$;
  }

  saveDiagnosis() {
    const savedDiagnoses = this.savedDiagnosesSubject.value;
    const newDiagnosis: SavedDiagnosis = {
      question: this.currentQuestionSubject.value,
      notes: this.notesSubject.value,
      timestamp: new Date()
    };
    this.savedDiagnosesSubject.next([...savedDiagnoses, newDiagnosis]);
  }
}