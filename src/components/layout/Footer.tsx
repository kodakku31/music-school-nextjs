import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <span><Link href="/#story">story</Link></span> • 
          <span><Link href="/news">news</Link></span> • 
          <span><Link href="/lesson">lesson</Link></span> • 
          <span><Link href="/teacher">teacher</Link></span> • 
          <span><Link href="/access">access</Link></span> • 
          <span><Link href="/contact">contact</Link></span> • 
          <span><Link href="/blog">blog</Link></span>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} MUSIC SCHOOL All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
