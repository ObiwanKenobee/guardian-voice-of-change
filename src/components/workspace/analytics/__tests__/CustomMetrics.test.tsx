import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomMetrics } from '../CustomMetrics';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
    })),
  },
}));

describe('CustomMetrics', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CustomMetrics />
      </QueryClientProvider>
    );
  });

  it('renders the custom metrics section', () => {
    expect(screen.getByText('Custom Metrics')).toBeInTheDocument();
    expect(screen.getByText('Add Metric')).toBeInTheDocument();
  });

  it('opens the add metric dialog when clicking the add button', async () => {
    const addButton = screen.getByText('Add Metric');
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});