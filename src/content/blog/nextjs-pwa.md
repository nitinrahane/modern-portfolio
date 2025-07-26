---
title: "Building a Progressive Web App with Next.js and Service Workers"
description: "Learn how to transform your Next.js application into a fully-featured Progressive Web App with offline capabilities, push notifications, and app-like experience."
date: "2025-01-08"
author: "Your Name"
tags: ["nextjs", "pwa", "service-workers", "offline", "web-app"]
category: "Web Development"
readTime: "12 min read"
featured: true
---

# Building a Progressive Web App with Next.js and Service Workers

Progressive Web Apps (PWAs) bridge the gap between web and native applications, offering app-like experiences with offline capabilities, push notifications, and installation prompts. Let's build a complete PWA with Next.js.

## What You'll Build

By the end of this tutorial, you'll have a Next.js PWA with:
- ✅ Offline functionality
- ✅ App installation prompt
- ✅ Push notifications
- ✅ Background sync
- ✅ App-like navigation

## Setting Up the Project

First, create a new Next.js project:

```bash
npx create-next-app@latest my-pwa --typescript --tailwind --eslint
cd my-pwa
npm install next-pwa
```

## 1. Configuring Next.js for PWA

Create `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});
```

## 2. Creating the Web App Manifest

Create `public/manifest.json`:

```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A powerful PWA built with Next.js",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```

## 3. Updating the HTML Head

Update `pages/_document.tsx`:

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="MyPWA" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MyPWA" />
        <meta name="description" content="A powerful PWA built with Next.js" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="MyPWA" />
        <meta name="twitter:description" content="A powerful PWA built with Next.js" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/icon-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MyPWA" />
        <meta property="og:description" content="A powerful PWA built with Next.js" />
        <meta property="og:site_name" content="MyPWA" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/icons/icon-192x192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## 4. Creating Custom Service Worker Features

Create `public/sw.js` for custom service worker functionality:

```javascript
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore this new world',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      },
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PWA Notification', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    clients.openWindow('/explore');
  } else if (event.action === 'close') {
    // Do nothing, notification already closed
  } else {
    clients.openWindow('/');
  }
});

async function doBackgroundSync() {
  // Implement background sync logic
  console.log('Background sync triggered');
}
```

## 5. Building Offline Support

Create `pages/offline.tsx`:

```typescript
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Offline() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Offline - MyPWA</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            {isOnline ? (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {isOnline ? 'Back Online!' : 'You\'re Offline'}
          </h1>

          <p className="text-gray-600 mb-8">
            {isOnline 
              ? 'Your internet connection has been restored.' 
              : 'Some features may not be available while offline, but you can still browse cached content.'
            }
          </p>

          {isOnline && (
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Homepage
            </button>
          )}
        </div>
      </div>
    </>
  );
}
```

## 6. Install Prompt Component

Create `components/InstallPrompt.tsx`:

```typescript
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      setInstallPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !installPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            Install MyPWA
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add this app to your home screen for quick access and a better experience.
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-1 px-3 rounded"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Dismiss</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

## 7. Push Notifications Setup

Create `hooks/useNotifications.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
      });
    }
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const subscribeToPush = async (): Promise<PushSubscription | null> => {
    if (!registration) {
      throw new Error('Service worker not registered');
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
    });

    // Send subscription to your server
    await fetch('/api/push-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    return subscription;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && registration) {
      return registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options,
      });
    }
  };

  return {
    permission,
    requestPermission,
    subscribeToPush,
    sendNotification,
  };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

## 8. Main App Implementation

Update `pages/index.tsx`:

```typescript
import Head from 'next/head';
import { useEffect } from 'react';
import InstallPrompt from '../components/InstallPrompt';
import { useNotifications } from '../hooks/useNotifications';

export default function Home() {
  const { permission, requestPermission, sendNotification } = useNotifications();

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  const handleNotificationRequest = async () => {
    try {
      const result = await requestPermission();
      if (result === 'granted') {
        sendNotification('Welcome to MyPWA!', {
          body: 'Notifications are now enabled.',
          tag: 'welcome',
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <>
      <Head>
        <title>MyPWA - Progressive Web App</title>
        <meta name="description" content="A powerful PWA built with Next.js" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to MyPWA
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A Progressive Web App built with Next.js
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Offline Ready</h3>
                <p className="opacity-90">Works even when you're offline</p>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Installable</h3>
                <p className="opacity-90">Add to home screen for app-like experience</p>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Push Notifications</h3>
                <p className="opacity-90">Stay updated with real-time notifications</p>
              </div>
            </div>

            <div className="mt-8">
              {permission !== 'granted' && (
                <button
                  onClick={handleNotificationRequest}
                  className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
                >
                  Enable Notifications
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <InstallPrompt />
    </>
  );
}
```

## Building and Testing

1. **Build the app:**
```bash
npm run build
npm start
```

2. **Test PWA features:**
   - Open Chrome DevTools → Application tab
   - Check Service Workers, Manifest, and Storage
   - Use Lighthouse to audit PWA score

3. **Test installation:**
   - Visit in Chrome on mobile or desktop
   - Look for install prompt in address bar

## Key PWA Features Implemented

✅ **App Manifest** - Defines app metadata and appearance  
✅ **Service Worker** - Enables offline functionality and caching  
✅ **Install Prompt** - Allows users to install the app  
✅ **Push Notifications** - Real-time communication  
✅ **Offline Page** - Graceful offline experience  
✅ **Responsive Design** - Works on all devices

## Best Practices

1. **Cache Strategy**: Use appropriate caching strategies for different resources
2. **Performance**: Optimize for fast loading and smooth interactions
3. **Accessibility**: Ensure your PWA is accessible to all users
4. **Security**: Always serve PWAs over HTTPS
5. **Testing**: Test on various devices and network conditions

Your Next.js PWA is now ready to provide users with a native app-like experience on the web!
