'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_ID, gaEnabled, trackEvent } from './analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaEnabled) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!window.__viehouseGaInitialized) {
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      window.__viehouseGaInitialized = true;
    }
    // Path changes only: anchor clicks must not inflate pageviews.
    if (window.__viehouseGaPath !== pathname) {
      window.__viehouseGaPath = pathname;
      trackEvent('page_view', {
        page_location: window.location.origin + pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (!gaEnabled) return;
    const handleClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href === '#reserve' || href === '/#reserve') {
        const section = link.closest('header') ? 'header'
          : link.closest('footer') ? 'footer'
          : link.closest('.heroPanel') ? 'hero_model'
          : link.closest('.hero') ? 'hero'
          : link.closest('.doubleCta') ? 'model'
          : link.closest('.bottom') ? 'bottom' : 'other';
        trackEvent('reservation_click', { cta_location: section });
      } else if (/^https:\/\/(youtu.be\/|www.youtube.com\/)/.test(href)) {
        trackEvent('youtube_click', {
          content_type: link.classList.contains('youtubeCard') ? 'video' : 'channel',
        });
      }
    };
    document.addEventListener('click', handleClick);
    const form = document.querySelector('.vhStepForm');
    let observer;
    if (form && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          trackEvent('reservation_form_view');
          observer.disconnect();
        }
      }, { threshold: 0.15 });
      observer.observe(form);
    }
    return () => {
      document.removeEventListener('click', handleClick);
      observer?.disconnect();
    };
  }, [pathname]);

  if (!gaEnabled) return null;
  return <Script src={'https://www.googletagmanager.com/gtag/js?id=' + GA_ID} strategy="afterInteractive" />;
}
