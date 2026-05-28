import { customers } from "@/config/site";

export function LogoBar() {
  const loop = [...customers, ...customers];
  return (
    <section className="logobar" aria-label="Clientes">
      <div className="logobar-inner">
        <div className="logobar-label">Empresas que ya operan con Zentral</div>
        <div className="logobar-track">
          <div className="logobar-marquee">
            {loop.map((name, i) => (
              <span key={i} className="logobar-org" aria-hidden={i >= customers.length}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
