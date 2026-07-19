// Pentagon competency radar
export default function RadarChart({ dimensions, size = 320 }) {
  const cx = size / 2
  const cy = size / 2
  const R = size / 2 - 58
  const n = dimensions.length
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2

  const point = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r]
  const rings = [0.25, 0.5, 0.75, 1]

  const dataPts = dimensions.map((d, i) => point(i, (d.score / 100) * R))
  const dataPath = dataPts.map((p) => p.join(',')).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: '100%' }}>
      {/* grid rings */}
      {rings.map((rr, ri) => (
        <polygon
          key={ri}
          points={dimensions.map((_, i) => point(i, R * rr).join(',')).join(' ')}
          fill="none" stroke="#f0dede" strokeWidth="1"
        />
      ))}
      {/* spokes */}
      {dimensions.map((_, i) => {
        const [x, y] = point(i, R)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#f0dede" strokeWidth="1" />
      })}
      {/* data area */}
      <polygon points={dataPath} fill="rgba(220,38,38,0.16)" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round" />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill="#b91c1c" stroke="#fff" strokeWidth="1.5" />
      ))}
      {/* labels */}
      {dimensions.map((d, i) => {
        const [x, y] = point(i, R + 30)
        const anchor = Math.abs(x - cx) < 12 ? 'middle' : x > cx ? 'start' : 'end'
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
            fontSize="11.5" fontWeight="600" fill="#6b5b60" style={{ fontFamily: 'Inter, sans-serif' }}>
            {d.name.length > 16 ? d.name.split(' ').slice(0, 2).join(' ') : d.name}
          </text>
        )
      })}
    </svg>
  )
}
