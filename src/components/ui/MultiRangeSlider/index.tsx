import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/ui';
import debounce from 'lodash.debounce';

// const ThumbWithTooltip = React.memo(({ value }: { value: number }) => (
//     <TooltipPrimitive.Provider delayDuration={100}>
//         <TooltipPrimitive.Root>
//             <TooltipPrimitive.Trigger asChild>
//                 <motion.div whileTap={{ scale: 1.2, transition: { duration: 0.1 } }}>
//                     <SliderPrimitive.Thumb className="block -translate-y-[10px] h-4 w-6 rounded-full border-2 border-black dark:bg-black bg-white dark:border-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" />
//                 </motion.div>
//             </TooltipPrimitive.Trigger>
//             <TooltipPrimitive.Portal>
//                 <TooltipPrimitive.Content
//                     sideOffset={5}
//                     className="z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-white dark:bg-white dark:text-black animate-in fade-in-0 zoom-in-95"
//                 >
//                     {value.toLocaleString()}
//                     <TooltipPrimitive.Arrow className="fill-black dark:fill-white" />
//                 </TooltipPrimitive.Content>
//             </TooltipPrimitive.Portal>
//         </TooltipPrimitive.Root>
//     </TooltipPrimitive.Provider>
// ));

const MultiRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, value, ...props }, ref) => {

    const [localValue, setLocalValue] = React.useState(value || props.defaultValue || [0, 100]);

    const debouncedOnValueChange = React.useMemo(
        () => debounce((newValue: number[]) => {
            if (onValueChange) {
                onValueChange(newValue);
            }
        }, 150), 
        [onValueChange]
    );

    const handleValueChange = (newValue: number[]) => {
        setLocalValue(newValue); 
        debouncedOnValueChange(newValue); 
    };

   React.useEffect(() => {
        if(value) {
            setLocalValue(value);
        }
    }, [value]);

    return (
        <>
            <SliderPrimitive.Root
                ref={ref}
                className={cn('relative flex w-full touch-none select-none items-center py-2', className)}
                value={localValue}
                onValueChange={handleValueChange}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <SliderPrimitive.Range className="absolute h-full bg-black dark:bg-white" />
                </SliderPrimitive.Track>
                {/* <ThumbWithTooltip value={localValue[0]} />
                <ThumbWithTooltip value={localValue[1]} /> */}
            </SliderPrimitive.Root>
           <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{localValue[0].toLocaleString()} NOT</span>
                <span>{localValue[1].toLocaleString()} NOT</span>
            </div>
        </>
    );
});

MultiRangeSlider.displayName = SliderPrimitive.Root.displayName;

export { MultiRangeSlider };