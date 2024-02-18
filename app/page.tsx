import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <section className="grid items-center space-y-4 text-center">
      <div className="space-y-2">
        <p className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Hi, I&apos;m Yoshinoki 🦊
        </p>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">Markup & Front-end Engineer</p>
      </div>
      <div className="space-x-4 space-y-4">
        <Button size="lg" asChild>
          <Link href="/profile">プロフィール</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/projects">作ったもの・書いた記事</Link>
        </Button>
      </div>
    </section>
  );
}
