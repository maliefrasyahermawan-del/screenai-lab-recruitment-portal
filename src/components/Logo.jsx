// Scan / cyber-security lab logo mark
export default function Logo({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6H6.5A1.5 1.5 0 0 0 5 7.5V10" />
      <path d="M23 6h2.5A1.5 1.5 0 0 1 27 7.5V10" />
      <path d="M9 26H6.5A1.5 1.5 0 0 1 5 24.5V22" />
      <path d="M23 26h2.5a1.5 1.5 0 0 0 1.5-1.5V22" />
      <circle cx="16" cy="14.5" r="3.4" />
      <path d="M10.5 23c1.2-2.9 3.2-4.3 5.5-4.3s4.3 1.4 5.5 4.3" />
    </svg>
  )
}
