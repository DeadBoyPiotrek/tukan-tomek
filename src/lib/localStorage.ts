export function saveGraphId(id: string): void {
  let graphIds: string[] = JSON.parse(localStorage.getItem('graphIds') || '[]');
  if (!graphIds.includes(id)) {
    graphIds.push(id);
    localStorage.setItem('graphIds', JSON.stringify(graphIds));
  }
}

export function getGraphIds(): string[] {
  return JSON.parse(localStorage.getItem('graphIds') || '[]');
}

export function removeGraphId(id: string): void {
  let graphIds: string[] = JSON.parse(localStorage.getItem('graphIds') || '[]');
  graphIds = graphIds.filter(graphId => graphId !== id);
  localStorage.setItem('graphIds', JSON.stringify(graphIds));
}
