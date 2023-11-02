import { HTMLAttributes } from "react";

interface Sidebar extends HTMLAttributes<HTMLElement> {

}
const Sidebar: React.FC<Sidebar> = ({ className }) => {
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col mx-auto px-4">
        <h1 className="text-2xl font-medium">My Order</h1>
        <p>Select category you&apos;d like to eat from.</p>
        
          

        <button className="btn btn-success">{'Checkout'}</button>
      </aside>
    </>
  );
};

export default Sidebar;