import Image from "next/image";

export default function CoverImage({ src, alt, className = "object-cover", sizes, priority = false }) {
  if (!src) return null;

  const optimized =
    src.startsWith("/") ||
    /^https:\/\/(images\.unsplash\.com|storage\.googleapis\.com|firebasestorage\.googleapis\.com|i\.ytimg\.com)\//.test(src);
  if (optimized) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        sizes={sizes}
      />
    );
  }

  return <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} />;
}
