import { cn } from '@/app/utils/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { TextareaHTMLAttributes, forwardRef, useRef } from 'react';

const textAreaVariants = cva(
  'textarea font-normal',
  {
    variants: {
      variant: {
        border: 'textarea-bordered',
        ghost: 'textarea-ghost',
      },
      size: {
        standard: 'w-full h-100',
        wide: 'w-full',
      }
    }
  }
)

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textAreaVariants> { }

const Textarea: React.FC<TextAreaProps> = forwardRef(({
  variant,
  className,
  size,
  ...props
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  return (
    <>
      <textarea
        ref={textareaRef}
        className={cn(textAreaVariants({
          variant,
          size,
          className
        }))}
        {...props}
      />
    </>
  );
});

Textarea.displayName = 'Textarea';
export { Textarea, textAreaVariants }