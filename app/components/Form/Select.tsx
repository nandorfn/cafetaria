import { cn } from '@/app/utils/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, SelectHTMLAttributes, useRef } from 'react';
const selectVariants = cva(
  'input font-normal',
  {
    variants: {
      variant: {
        border: 'select-bordered',
        ghost: 'select-ghost',
      },
      wide: {
        full: 'w-full'
      }
    },

  }
)

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>,
  VariantProps<typeof selectVariants> {
  data: any;
}

const Select: React.FC<SelectProps> = forwardRef(({
  variant,
  data,
  className,
  wide,
  ...props
}, ref) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <>
      <select
        ref={selectRef}
        aria-label="Default select example"
        className={cn(selectVariants({ variant, wide, className }))} {...props}>
        {data.length > 0 && data?.map((option: any) => (
          <option key={option?.id} value={option.value || option.iso2}>
            {option.label || option.name}
          </option>
        ))}
      </select>
    </>
  );
});

Select.displayName = 'Select'
export { Select, selectVariants };