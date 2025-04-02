
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

// Generate a unique session ID for analytics
const sessionId = crypto.randomUUID();

// Configure query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Initialize performance monitoring
if (import.meta.env.PROD) {
  // This would normally connect to an analytics service
  console.info('Performance monitoring initialized');
  
  // Report Core Web Vitals
  // Using dynamic import to ensure the code doesn't break in development
  try {
    import('web-vitals')
      .then(({ getCLS, getFID, getLCP }) => {
        getCLS(console.log);
        getFID(console.log);
        getLCP(console.log);
      })
      .catch(error => {
        console.warn('Web Vitals could not be loaded:', error);
      });
  } catch (error) {
    console.warn('Error importing web-vitals:', error);
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AnalyticsProvider>
            <BrowserRouter>
              <App />
              <Toaster />
            </BrowserRouter>
          </AnalyticsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
