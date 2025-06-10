import  { useMemo } from 'react'
import Button from '../Button'
import { useCartStore } from '@/store/cartStore';

export default function FooterButton() {
    const { items } = useCartStore();
    const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
  return (
    <>
           {total > 0 &&
            <div className="fixed left-0 right-0 bottom-[30px] z-[60] px-4 ">
                <Button className='w-full'>
                    {`Buy for ${total.toLocaleString()} NOT`}
                </Button>
            </div>
        }
    </>
  )
}
