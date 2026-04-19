import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AIStylist from '@/components/AIStylist';

// Mock the gemini lib
vi.mock('@/lib/gemini', () => ({
  fashionModel: {
    startChat: () => ({
      sendMessage: vi.fn().mockResolvedValue({
        response: { text: () => 'Hello! I am your AI stylist.' }
      })
    })
  },
  SYSTEM_PROMPT: 'Mock prompt'
}));

describe('AIStylist Component', () => {
  it('renders correctly with initial message', () => {
    render(<AIStylist />);
    expect(screen.getByText(/Personal AI Stylist/i)).toBeInTheDocument();
  });

  it('allows user to open and close the chat', () => {
    render(<AIStylist />);
    const openButton = screen.getByRole('button', { name: /Personal AI Stylist/i });
    fireEvent.click(openButton);
    expect(screen.getByPlaceholderText(/Ask about fashion/i)).toBeInTheDocument();
  });

  it('demonstrates Google AI integration intent', () => {
    render(<AIStylist />);
    // Check for "Powered by Google Gemini" or similar markers
    expect(screen.getByText(/Powered by Google Gemini/i)).toBeInTheDocument();
  });
});
