'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GetQuoteModal from './GetQuoteModal';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onGetQuote={() => setQuoteOpen(true)} />
      <main>{children}</main>
      <Footer />
      <GetQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
