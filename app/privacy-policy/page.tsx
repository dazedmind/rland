"use client";
import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import MobileNavBar from '@/components/MobileNavBar'
import { useState } from 'react'

function PrivacyPolicyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className='pt-20 md:pt-30'>
        <header>
            <NavBar 
            isScrolled={true} 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            />
            <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </header>
        <main>
            {/* PAGE BANNER */}
            <PageBanner
		          title="Privacy Policy"
		          description="This privacy policy explains how we collect, use, and share your personal information."
		          breadcrumb="Privacy Policy"
		        />

            {/* ABOUT US SECTION */}
            <section className='flex flex-col items-start px-44 justify-center py-16 space-y-8'>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-4xl font-bold'>Rooted in Nature, Designed for the Future</h1>

                    <p className='leading-relaxed'>
                    R Land Development Inc., a subsidiary of RMR Capital Inc., is dedicated to transforming landscapes into thriving centers of growth. The company is committed to creating thoughtfully-designed communities that lead to new opportunities and a promising future.

                    <br />
                    <br />  

                    Guided by the motto "Our Bright Future Together," R Land focuses on improving land and enriching lives through responsible and sustainable real estate projects that offer exceptional living experiences.
                    </p>
                </span>
            </section>
        </main>
        <footer>
            <Footer />
        </footer>

    </div>
  )
}

export default PrivacyPolicyPage