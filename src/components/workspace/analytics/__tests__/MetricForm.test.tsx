import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MetricForm } from '../MetricForm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      update: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } }, error: null }),
    },
  },
}));

describe('MetricForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    render(<MetricForm onSuccess={mockOnSuccess} />);
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText(/metric name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/metric type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/visualization type/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const nameInput = screen.getByLabelText(/metric name/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(nameInput, { target: { value: 'Test Metric' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    const submitButton = screen.getByRole('button', { name: /create metric/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});