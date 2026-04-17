import StarDisplay from './StarDisplay'

const CORNER_COLORS = {
  'A코너': 'bg-red-400',
  'B코너': 'bg-orange-400',
  'C코너': 'bg-yellow-400',
  '특식': 'bg-purple-400',
}

export default function MenuCard({ menuId, name, corner, imageUrl, averageRating, reviewCount, onClick }) {
  const fallbackBg = CORNER_COLORS[corner] ?? 'bg-gray-300'

  return (
    <div
      className="rounded-2xl overflow-hidden bg-surface cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
      onClick={() => onClick?.(menuId)}
    >
      {/* 이미지 영역 */}
      <div className={`relative w-full aspect-[4/3] ${!imageUrl ? fallbackBg : ''}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold opacity-60">{name[0]}</span>
          </div>
        )}
        {/* 코너 뱃지 */}
        <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {corner}
        </span>
      </div>

      {/* 텍스트 영역 */}
      <div className="p-3 space-y-1">
        <p className="font-bold text-sm text-gray-900 leading-tight line-clamp-2">{name}</p>
        <div className="flex items-center gap-1.5">
          <StarDisplay rating={averageRating ?? 0} size="sm" />
          {averageRating != null ? (
            <span className="text-xs text-gray-500">
              {averageRating.toFixed(1)}
              <span className="ml-1 text-gray-400">({reviewCount})</span>
            </span>
          ) : (
            <span className="text-xs text-gray-400">리뷰 없음</span>
          )}
        </div>
      </div>
    </div>
  )
}
