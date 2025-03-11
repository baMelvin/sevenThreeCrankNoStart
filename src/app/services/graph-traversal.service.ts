import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class GraphTraversalService {
  private graph: GraphData | null = null;
  private currentNode: GraphNode | null = null;

  constructor(private http: HttpClient) {}

  loadGraph(): Observable<GraphData> {
    let assets = this.http.get<GraphData>('/assets/sevenThreeDiagnonsis.json');
    console.log("assets: ", assets);
    
    return assets;
  }

  startTraversal(graph: GraphData): GraphNode {
    this.graph = graph;
    this.currentNode = graph.nodes.find(node => node.id === 'start') || null;
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
    return this.currentNode;
  }
}