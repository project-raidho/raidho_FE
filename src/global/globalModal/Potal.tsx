import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

function Potal({ children }: Props) {
  const elementId = 'modal';
  const element: HTMLElement | null = document.getElementById(elementId);
  return reactDom.createPortal(children, element);
}

export default Potal;
