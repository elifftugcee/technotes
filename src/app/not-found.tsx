import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">Sayfa bulunamadı</h1>
      <p className="mt-3 max-w-md text-muted">Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/" size="lg">
          Ana Sayfa
        </Button>
        <Button href="/yazilar" variant="outline" size="lg">
          Yazılar
        </Button>
      </div>
    </Container>
  );
}
