import { NextIntlClientProvider, useMessages } from 'next-intl';
import Header from '@/src/components/Header';
import Container from '@/src/components/Container';
import Head from 'next/head';
import '@/src/styles/globals.css';
import Menu from '@/src/components/Menu';
// import { Laila } from 'next/font/google'
// export const laila = Laila({weight: ['300', '400', '600', '700'], subsets: ['latin']})
import Footer from '@/src/components/Footer';
import GlobalSticky from '@/src/components/GlobalSticky';

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) => {
  const messages = useMessages();

  return (
    <html lang={locale}>
      {/* <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Laila:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head> */}
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div>
            <Header>
              <Menu />
            </Header>
            <main>
              <Container>{children}</Container>
              <GlobalSticky />
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
