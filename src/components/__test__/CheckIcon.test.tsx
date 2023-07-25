import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CheckIcon from '../CheckIcon';

describe('(component) CheckIcon', () => {
  it('should contain an tailwind CSS', () => {
    const twCSS = 'h-6 w-6';
    render(<CheckIcon className={twCSS} />);

    const svgElement = screen.getByTestId('check-icon');
    expect(svgElement).toHaveClass(twCSS);
  });
});
