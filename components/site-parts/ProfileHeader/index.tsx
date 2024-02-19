import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Image
        alt="プロフィール画像：はっきりとした線で描かれたポップなイラスト。男性が前方を見上げて口角を上げている。空をイメージした青い背景。"
        className="size-48 rounded-full"
        height={192}
        src="/images/icon.webp"
        width={192}
      />
      <p className="text-2xl font-bold">Yoshinoki</p>
      <ul className="flex space-x-4">
        {[
          {
            href: 'https://github.com/ynoki10',
            text: 'GitHub',
          },
          {
            href: 'https://twitter.com/4noki10',
            text: 'Twitter(X)',
          },
          {
            href: 'https://www.yoshinoki.dev/',
            text: 'Blog',
          },
          {
            href: 'https://zenn.dev/yoshinoki',
            text: 'Zenn',
          },
        ].map(({ href, text }) => (
          <li key={text}>
            <Link className="font-medium text-indigo-800 underline" href={href}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileHeader;
