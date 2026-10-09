import Link from "next/link";
import { BrandMark } from "./BrandMark";

const Footer = () => (
  <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
      <Link href="/" aria-label="NewsGist home"><BrandMark /></Link>
      <p className="text-sm text-[var(--ink-muted)]">A calmer, clearer way to keep up with the world.</p>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-faint)]">© 2025 NewsGist</p>
    </div>
  </footer>
);

export default Footer;
