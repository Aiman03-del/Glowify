"use client";

import NewsletterModal from "@/components/sections/NewsletterModal";
import ChatWidget from "@/components/layout/ChatWidget";
import CompareBar from "@/components/layout/CompareBar";

export default function ClientInjections() {
  return (
    <>
      <NewsletterModal />
      <ChatWidget />
      <CompareBar />
    </>
  );
}
