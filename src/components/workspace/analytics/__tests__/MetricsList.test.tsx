import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MetricsList } from '../MetricsList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    })),
  },
}));

describe('MetricsList', () => {
  const queryClient = new QueryClient();
  const mockMetrics = [
    {
      id: '1',
      name: 'Test Metric',
      description: 'Test Description',
      metric_type: 'wildlife',
      visualization_type: 'bar',
      data_source: 'Test Source',
    },
  ];

  beforeEach(() => {
    vi.mocked(supabase.from).mockImplementation(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockMetrics, error: null }),
      eq: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MetricsList />
      </QueryClientProvider>
    );
  });

  it('renders metrics list', async () => {
    await waitFor(() => {
      expect(screen.getByText('Test Metric')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('shows edit and delete buttons for each metric', async () => {
    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: /edit/i });
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      expect(editButtons.length).toBeGreaterThan(0);
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });
});