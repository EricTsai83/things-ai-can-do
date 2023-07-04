import Link from 'next/link';
import ProfileIcon from './ProfileIcon';

export default function Navbar() {
  return (
    <nav
      className="fixed left-0 right-0
     flex h-14 items-center justify-between bg-blue-500 
     px-8 text-white">
      <Link className="font-bold" href={'/'}>
        Things AI Can Do...
      </Link>
      <ProfileIcon />
    </nav>
  );
}
