
import { cn } from "../../utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const TransVariants = cva(
  'min-h-screen w-screen overflow-hidden fixed start-0 top-0 z-50 flex justify-center items-center',
  {
    variants: {
      variant: {
        black: 'bg-black',
        white: 'bg-white',
      },
      opacity: {
        op50: 'opacity-50',
        op30: 'opacity-30'
      }
    },
    defaultVariants: {
      variant: 'black',
      opacity: 'op50'
    }
  }
)


interface TransparentProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof TransVariants> {
  children: React.ReactNode;
}

const Transparent: React.FC<TransparentProps> = ({
  children, 
  className, 
  variant,
  opacity,
  ...props}) => {
  return (
    <>
        <div className={cn(TransVariants({variant, opacity,className}))} {...props}>
        </div>
        <div className="min-h-screen w-screen overflow-hidden fixed start-0 top-0 z-50 flex justify-center items-center">
          {children}
        </div>
    </>
  );
};


export { Transparent, TransVariants};