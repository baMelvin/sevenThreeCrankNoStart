import { TestBed } from '@angular/core/testing';

import { GraphTraversalService } from './graph-traversal.service';

describe('GraphTraversalService', () => {
  let service: GraphTraversalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphTraversalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
