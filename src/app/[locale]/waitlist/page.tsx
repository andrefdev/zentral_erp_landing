import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getWaitlistCount } from '@/lib/resend';
import WaitlistForm from '@/components/form/waitlist/WaitlistForm';
import type { Metadata } from 'next';

export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'waitlist' });
  const baseUrl = 'https://zentral.indrox.com';
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}/waitlist`,
      languages: {
        en: `${baseUrl}/en/waitlist`,
        es: `${baseUrl}/es/waitlist`,
        'x-default': `${baseUrl}/es/waitlist`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Zentral',
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${baseUrl}/${locale}/waitlist`,
      locale: locale === 'es' ? 'es_PE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default async function WaitlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  let initialCount = 0;
  try { initialCount = await getWaitlistCount(); } catch { initialCount = 0; }

  return (
    <WaitlistForm
      initialCount={initialCount}
      locale={locale === 'en' ? 'en' : 'es'}
    />
  );
}
