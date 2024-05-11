import newsletterBG from '../../assets/images/newsletter-bg.jpg'
import Button from '../../components/button'

export default function HomeNewsletter() {
  return (
    <section className=' pb-12 px-4'>
      <div className="container mx-auto flex flex-col px-10 py-[30px] rounded-[30px] bg-cover bg-center" style={{ backgroundImage: `url(${newsletterBG})`}}>
        <h3 className='text-5xl text-white font-semibold pb-2'>Newsletter</h3>
        <p className='text-xl text-white pb-[65px]'>Subscribe and get 20% off your first purchase</p>
        <div className='relative'>
          <input type="email" placeholder='Your email...' className='w-full h-[44px] px-8 text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-full focus:outline-none'/>
          <div className='absolute top-[4px] right-[8px]'>
            <Button variant='primary' size='sm'>Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  )
}