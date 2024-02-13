export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full py-24">
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}
