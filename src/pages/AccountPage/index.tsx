import profile from '/images/profile.png'
import product from '/images/product.png'
import ThemeToggle from '../../components/ui/ThemeToggle'
import { motion } from 'framer-motion';

export default function AccountPage() {
  const items = [1, 2, 3]
  return (
    <motion.div
    initial={{ opacity: 0 ,y : -10}}
    animate={{ x: 0, opacity: 1, y:0 }}

    exit={{ opacity: 0 }}
    transition={{ duration: 0.5
      , ease: "easeInOut" }}
className='px-4 flex flex-col pb-[83px]   w-screen pt-4 min-h-screen'>
      <div className='flex flex-col w-full items-center mt-10  gap-2 '>
        <img src={profile} className='rounded-full' alt="profile" width={120} height={120} />
        <h1 className='text-[26px] font-[590]'>Alex</h1>
      </div>
      <ThemeToggle />

      {items.length > 0 ?

        (
          <div className='flex flex-col font-[590]'>
            <p className='py-4  text-xl'>History</p>
            <div className='flex flex-col gap-3 '>
              {items.map(item => (
                <div key={item} className='flex gap-3 items-center h-[68px] py-2  aspect-square '>
                  <img className='rounded-xl' src={product} alt="product" width={60} height={60} />
                  <div className='flex-1'>
                    <p className=' text-xs  opacity-50'>t-shirt</p>
                    <p className=' text-[17px]'>boxlogo</p>
                  </div>
                  <div>
                    <p className=' text-xs  opacity-50'>31 May ‘25</p>
                    <p className=' text-[17px]'>1000 NOT</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) :

        <div className='flex flex-col gap-2 justify-center text-center items-center flex-1 '>
          <h1 className='text-[26px] font-[600]'>No history yet</h1> <p className='opacity-50 text-[17px] font-normal'>Let’s change that</p></div>
      }
    </motion.div >
  )
}
