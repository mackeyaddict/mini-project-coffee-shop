import { motion } from "framer-motion";
import companyDescBg from '../../assets/images/company-desc-bg.jpg';
import companyLogo from '../../assets/images/company-logo.png';

export default function HomeCompanyDesc() {
  return (
    <section className='pb-12 px-4'>
      <div className="container mx-auto rounded-[30px] items-center justify-center relative" style={{ backgroundImage: `url(${companyDescBg})`}}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col md:flex-row gap-4 md:gap-[82px] py-5 items-center justify-center'
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={companyLogo} 
            className='w-[172px]'
            alt="Company Logo"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-white text-xl text-center px-4 md:px-0 font-normal max-w-[745px]'
          >
            At Homie Coffee House, we&rsquo;re dedicated to handcrafting every cup of coffee with care and expertise. Our talented baristas select premium beans from around the world to create a diverse range of specialty coffees, guaranteeing a flavorful experience that delights your senses with every sip.
          </motion.p>
        </motion.div>
      </div>
    </section>
  ) 
}
