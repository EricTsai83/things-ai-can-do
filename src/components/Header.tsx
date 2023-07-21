import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
import { GiArtificialHive } from 'react-icons/gi';

const iconStyle = `text-4xl text-gray-600 text-teal-700`;

function Header() {
  return (
    <nav
      className="
        fixed left-0 right-0 z-50
        flex h-16 items-center
        justify-between border-b border-gray-200 bg-white
        px-8 text-zinc-700">
      <Link href={'/'}>
        <div className="flex items-center pl-12 xl:pl-0">
          <GiArtificialHive className={iconStyle} />
          <h1 className="pl-2 text-2xl font-semibold">Things AI Can Do</h1>
        </div>
      </Link>

      <ProfileIcon />
    </nav>
  );
}

export default Header;
