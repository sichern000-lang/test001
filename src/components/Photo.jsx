import { usePhotos } from '../lib/usePhotos'

// Pixabay 에서 q 로 검색한 결과 중 i 번째 사진을 배경으로 채우는 박스.
// 사진을 못 불러오면(키 미설정 등) 그라디언트로 대체됩니다.
export default function Photo({ q, i = 0, size = 'thumb', className = '', children }) {
  const hits = usePhotos(q)
  const hit = hits.length ? hits[i % hits.length] : null

  return (
    <div className={`photo ${hit ? '' : 'ph'} ${className}`}>
      {hit && <img src={hit[size]} alt={hit.tags} loading="lazy" />}
      {children}
    </div>
  )
}
