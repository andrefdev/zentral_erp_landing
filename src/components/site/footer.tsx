import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export function Footer({ locale }: { locale: string }) {
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  return (
    <footer className="bg-black text-[#A3A3A3] pt-16 pb-10 border-t border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <Link href={L("/")} className="flex items-center gap-2.5 text-white mb-4">
            <Image src={logo} alt="Zentral" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-lg">Zentral Suite</span>
          </Link>
          <p className="max-w-xs">El ERP + CRM para mypes B2B de LATAM. Hecho en Perú, para LATAM.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-white">LinkedIn</a><span>·</span>
            <a href="#" className="hover:text-white">X</a><span>·</span>
            <a href="#" className="hover:text-white">YouTube</a>
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Producto</div>
          <ul className="space-y-2">
            <li><Link href={L("/#erp")} className="hover:text-white">Zentral ERP</Link></li>
            <li><Link href={L("/#crm")} className="hover:text-white">Zentral CRM</Link></li>
            <li><Link href={L("/#suite")} className="hover:text-white">Zentral Suite</Link></li>
            <li><Link href={L("/precios")} className="hover:text-white">Precios</Link></li>
            <li><Link href={L("/comparativa")} className="hover:text-white">Comparativa</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Recursos</div>
          <ul className="space-y-2">
            <li><Link href={L("/recursos/blog")} className="hover:text-white">Blog</Link></li>
            <li><Link href={L("/recursos/casos")} className="hover:text-white">Casos de éxito</Link></li>
            <li><Link href={L("/recursos/documentacion")} className="hover:text-white">Documentación</Link></li>
            <li><Link href={L("/recursos/changelog")} className="hover:text-white">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Empresa</div>
          <ul className="space-y-2">
            <li><a href="https://indrox.com" className="hover:text-white">Sobre Indrox</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
            <li><a href="#" className="hover:text-white">Partners</a></li>
            <li><a href="#" className="hover:text-white">Trabaja con nosotros</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 mt-12 pt-6 border-t border-[#262626] flex flex-wrap justify-between items-center gap-3 text-xs text-[#888]">
        <div>© 2026 Indrox · Zentral Suite · Zentral CRM powered by Indrox</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacidad</a>
          <a href="#" className="hover:text-white">Términos</a>
          <a href="#" className="hover:text-white">Seguridad</a>
          <a href="#" className="hover:text-white">SLA</a>
        </div>
      </div>
    </footer>
  );
}
