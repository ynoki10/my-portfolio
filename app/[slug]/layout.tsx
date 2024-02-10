export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48">
      <div className="container px-4 md:px-6">
        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}
