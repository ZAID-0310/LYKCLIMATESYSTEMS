export default function Button({ href, small = false, className = "", children, ...props }) {
  const cls = `inline-block rounded-lg bg-brand font-bold text-white hover:brightness-110 ${
    small ? "px-4 py-2 text-sm" : "px-6 py-3"
  } ${className}`;
  return href ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <button className={cls} {...props}>{children}</button>
  );
}
