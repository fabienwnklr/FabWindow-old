import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    const availableBG = ['Web-Header-Background-1', 'Black-Animation-Background', 'Bubble-Background'];
    const randomIndex = Math.round(Math.random() * (availableBG.length - 1) + 0);
    const randomBG = availableBG[randomIndex];
    console.log(availableBG);
    console.log(randomIndex);
    console.log(randomBG);
    return (
        <header className='bg-gray-900' style={{ background: `url('/img/${randomBG}.svg') no-repeat`, backgroundSize: 'cover'}}>
            <div className='container px-6 mx-auto'>
                <div className='flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row'>
                    <div className='lg:w-1/2'>
                        <h2 className='text-3xl font-semibold text-gray-100 lg:text-4xl'>Brand</h2>

                        <h3 className='mt-2 text-2xl font-semibold text-gray-100'>
                            Hello <span className='text-blue-400'>Guest</span>
                        </h3>

                        <p className='mt-4 text-gray-100'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, eum modi incidunt adipisci quod porro et non exercitationem quasi,
                            maxime culpa ut nemo ab delectus saepe iste nostrum explicabo a?
                        </p>
                    </div>

                    <div className='flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0'>
                        <div className='w-full max-w-md'>
                            <div className='px-6 py-8 text-center'>
                                <div className='flex items-center mt-2 -mx-2 sm:mt-0'>
                                    <a
                                        href='#'
                                        className='px-3 py-1 text-lg font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700'
                                    >
                                        Demos
                                    </a>
                                    <a
                                        href='#'
                                        className='px-3 py-2 mx-2 text-lg font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800'
                                    >
                                        Get started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title={`Hello from ${siteConfig.title}`} description='Description will go into a meta tag in <head />'>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
