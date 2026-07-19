export function statusPill(status) {
  const map = {
    'Evaluated': 'pill--green',
    'Verified': 'pill--sky',
    'Pending Evaluation': 'pill--amber',
    'Correction Requested': 'pill--red',
    'Document Review': 'pill--gray',
    'Pending': 'pill--amber',
    'Correction': 'pill--red',
    'Active': 'pill--green',
    'Blocked': 'pill--red',
  }
  return map[status] || 'pill--gray'
}

export function scoreClass(score) {
  if (score >= 82) return 'score--hi'
  if (score >= 72) return 'score--mid'
  return 'score--lo'
}
