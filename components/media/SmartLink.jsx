import Link from "next/link";

export default function SmartLink({ href, children, ...props }) {
  if (!href) return <div {...props}>{children}</div>;
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
