/**
 * SmartImage
 * Renders an <img> from /src/assets/images/<name>.
 * If the image file hasn't been added yet (or fails to load),
 * it falls back to a premium gradient placeholder labelled with `alt`,
 * so the layout always looks correct even before real photography is dropped in.
 */
export default function SmartImage({ src, alt, className = '', imgClassName = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextElementSibling.style.display = 'flex'
        }}
      />
      <div className="img-placeholder absolute inset-0" style={{ display: 'none' }}>
        <span className="px-4 text-center text-xs font-medium uppercase tracking-widest2 text-white/25">
          {alt}
        </span>
      </div>
    </div>
  )
}
