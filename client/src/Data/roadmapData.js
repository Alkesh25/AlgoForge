export const roadmapNodes = [

    { id: "arrays", label: "Arrays & Hashing", progress: 0, position: { x: 400, y: 0 } },
  
    { id: "twopointers", label: "Two Pointers", progress: 0, position: { x: 200, y: 150 } },
  
    { id: "stack", label: "Stack", progress: 0, position: { x: 600, y: 150 } },
  
    { id: "linkedlist", label: "Linked List", progress: 0, position: { x: 100, y: 320 } },
  
    { id: "slidingwindow", label: "Sliding Window", progress: 0, position: { x: 400, y: 320 } },
  
    { id: "binarysearch", label: "Binary Search", progress: 0, position: { x: 700, y: 320 } },
  
    { id: "trees", label: "Trees", progress: 0, position: { x: 400, y: 500 } },
  
    { id: "tries", label: "Tries", progress: 0, position: { x: 150, y: 700 } },
  
    { id: "heap", label: "Heap / Priority Queue", progress: 0, position: { x: 400, y: 700 } },
  
    { id: "backtracking", label: "Backtracking", progress: 0, position: { x: 650, y: 700 } }
  
  ];
  
  
  export const roadmapEdges = [
  
    { id: "e1", source: "arrays", target: "twopointers" },
    { id: "e2", source: "arrays", target: "stack" },
  
    { id: "e3", source: "twopointers", target: "linkedlist" },
    { id: "e4", source: "twopointers", target: "slidingwindow" },
    { id: "e5", source: "stack", target: "binarysearch" },
  
    { id: "e6", source: "linkedlist", target: "trees" },
    { id: "e7", source: "slidingwindow", target: "trees" },
    { id: "e8", source: "binarysearch", target: "trees" },
  
    { id: "e9", source: "trees", target: "tries" },
    { id: "e10", source: "trees", target: "heap" },
    { id: "e11", source: "trees", target: "backtracking" }
  
  ];