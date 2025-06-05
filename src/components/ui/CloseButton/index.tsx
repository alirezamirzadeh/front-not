import { cn } from '../../../lib/ui'
import CloseIcon from '../../icon/CloseIcon'

export default function CloseButton({ className,ClassNameIcon }: { className?: string,ClassNameIcon?: string }) {
    return (
        <div className={cn(className, "absolute  flex justify-center items-center rounded-full bg-black/8 dark:bg-white/8")}>

            <CloseIcon className={ClassNameIcon} />
        </div>)
}
