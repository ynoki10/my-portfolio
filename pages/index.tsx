import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <h1>Yoshinoki&apos;s PortFolio</h1>
      <div>
        <Button variant="outline" size="lg">
          Click me
        </Button>
      </div>
    </main>
  );
}
