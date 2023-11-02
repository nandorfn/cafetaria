import { cn } from "../../utils/utils";
import { AllHTMLAttributes } from "react";
import { VariantProps, cva } from 'class-variance-authority';

const FlexVariants = cva(
  'flex w-full',
  {
    variants: {
      variant: {
        col: 'flex-col',
        row: 'flex-row',
        colToRow: 'flex-col md:flex-row',
        colToRowReverse: 'flex-col-reverse md:flex-row'
      },
      clr: {
        white: 'bg-base-100',
        base2: 'bg-base-200',
        grey: 'text-[#9FA0A2]'
      },
      align: {
        center: 'justify-center items-center',
        iCenter: 'items-center',
        between: 'justify-between'
      },
      rounded: {
        xl: 'rounded-xl',
        full: 'rounded-full'
      },
      gap: {
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        
      }
    }
  }
)

interface FlexProps extends AllHTMLAttributes<HTMLDivElement>,
VariantProps<typeof FlexVariants> {}

const Flex: React.FC<FlexProps> = ({
  className,
  variant,
  clr,
  align,
  rounded,
  ...props
}) => {
    return (
        <>
          <div className={cn(FlexVariants({variant, clr, align, rounded, className}))}{...props} />
        </>
    );
};

export { Flex, FlexVariants};