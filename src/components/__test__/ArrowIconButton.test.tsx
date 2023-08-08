import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArrowIconButton from '../ArrowIconButton';

describe('(component) ArrowIconButton', () => {
  it('Should render properly', () => {
    const buttonText = 'button content';
    render(<ArrowIconButton text={buttonText} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(buttonText);
  });
});
