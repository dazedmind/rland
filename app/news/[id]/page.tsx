import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import Image from 'next/image'
import Link from 'next/link'
import { MoveLeft, Calendar, User, Share2 } from 'lucide-react'

function NewsArticle() {
  return (
    <div className='pt-20 md:pt-30'>
      <header>
        <NavBar isScrolled={true} />
      </header>
      
      <main>
        {/* PAGE BANNER - Dynamic Title */}
        <PageBanner
          title="R LAND DEVELOPMENT INC. JOINS PAG-IBIG HOUSING FAIR EXPO 2025"
          description=""
          breadcrumb="News / Article"
        />

        {/* ARTICLE CONTENT SECTION */}
        <section className='px-8 md:px-16 lg:px-44 py-16 bg-white'>
          <div className='max-w-4xl mx-auto'>
            
            {/* Back to News & Metadata */}
            <div className='flex flex-col gap-6 mb-12'>
              <Link href="/news" className='flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold'>
                <MoveLeft size={20} /> Back to News
              </Link>
              
              <div className='flex flex-wrap items-center gap-6 text-sm text-neutral-500 border-b border-neutral-100 pb-6'>
                <span className='flex items-center gap-2'><Calendar size={16} /> October 15, 2025</span>
                <span className='flex items-center gap-2'><User size={16} /> Corporate Communications</span>
                <span className='px-3 py-1 bg-secondary/10 text-secondary rounded-full font-bold text-xs'>EVENT</span>
              </div>
            </div>

            {/* Main Article Body */}
            <article className='space-y-8'>
              <h1 className='text-4xl md:text-5xl font-bold leading-tight text-primary'>
                Making Homeownership Accessible for the Filipino Family
              </h1>

              {/* Featured Image Placeholder */}
              <div className='relative w-full h-[400px] rounded-2xl overflow-hidden bg-neutral-200 shadow-inner'>
                {/* <Image src="/fair-expo.jpg" alt="Pag-IBIG Fair" fill className="object-cover" /> */}
                <div className='absolute inset-0 flex items-center justify-center text-neutral-400 italic'>
                  [Event Photo: R Land Booth at Pag-IBIG Expo]
                </div>
              </div>

              <div className='prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-6'>
                <p>
                  <strong>MAKATI CITY, Philippines</strong> — R Land Development Inc., a premier name in sustainable community building, successfully participated in the recently concluded Pag-IBIG Housing Fair Expo. The event, which gathered thousands of aspiring homeowners, served as a platform for R Land to showcase its newest residential developments.
                </p>

                <p>
                  In alignment with the Pag-IBIG Fund’s mission to provide affordable housing finance, R Land highlighted its flexible payment schemes and specialized units designed for middle-income Filipino families. 
                </p>

                <blockquote className='border-l-4 border-secondary pl-6 py-2 italic text-2xl text-primary font-medium'>
                  "Our participation in this expo is not just about selling houses; it’s about fulfilling our promise of 'Our Bright Future Together' by making quality living spaces reachable."
                </blockquote>

                <p>
                  Visitors at the R Land booth were given exclusive tours of project scale models, including the latest eco-friendly residential phases. Representatives were on-site to assist with pre-qualification checks and to explain the long-term benefits of investing in sustainable R Land communities.
                </p>
                
                <h3 className='text-2xl font-bold text-primary pt-4'>Empowering the Modern Buyer</h3>
                <p>
                  Beyond the properties, R Land provided free consultations on real estate investment and home loan processing. This holistic approach ensures that buyers are not only getting a house but are also financially prepared for the journey of homeownership.
                </p>
              </div>

              {/* Share and Tags */}
              <div className='mt-16 pt-8 border-t border-neutral-100 flex justify-between items-center'>
                <div className='flex gap-2'>
                  <span className='bg-neutral-100 px-3 py-1 rounded text-sm'>#RealEstate</span>
                  <span className='bg-neutral-100 px-3 py-1 rounded text-sm'>#PagIBIG</span>
                  <span className='bg-neutral-100 px-3 py-1 rounded text-sm'>#HomeOwnership</span>
                </div>
                <button className='flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-opacity'>
                  <Share2 size={20} /> Share Article
                </button>
              </div>
            </article>

          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default NewsArticle