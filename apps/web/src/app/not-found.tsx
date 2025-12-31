export default function NotFound() {
  return (
    <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-9xl font-bold mb-4 text-gold">404</h1>
        <p className="text-2xl mb-8">Страница не найдена</p>
        <a href="/" className="inline-block px-8 py-4 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors">
          Вернуться на главную
        </a>
      </div>
    </main>
  );
}
