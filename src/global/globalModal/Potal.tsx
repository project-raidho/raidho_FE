import reactDom from "react-dom";

interface PotalProps {
  children: React.ReactNode;
}

const Potal = ({ children }: PotalProps) => {
  const element = document.getElementById("modal");

  return reactDom.createPortal(children, element as HTMLElement);
};

export default Potal;
