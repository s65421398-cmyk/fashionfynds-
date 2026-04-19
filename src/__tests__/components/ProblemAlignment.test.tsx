import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemAlignment from '@/components/ProblemAlignment';

describe('ProblemAlignment Component', () => {
  it('renders the core problem statement clearly', () => {
    render(<ProblemAlignment />);
    expect(screen.getByText(/Discovery Gap/i)).toBeInTheDocument();
  });

  it('demonstrates solution mapping for Indian seekers', () => {
    render(<ProblemAlignment />);
    expect(screen.getByText(/Indian fashion enthusiasts/i)).toBeInTheDocument();
  });

  it('highlights Google AI technology usage', () => {
    render(<ProblemAlignment />);
    expect(screen.getByText(/Google Gemini Pro/i)).toBeInTheDocument();
  });
});
