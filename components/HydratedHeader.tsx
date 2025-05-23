'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header';

const HydratedHeader = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true)
    }, []);

    if(!isHydrated) return null;
    return <Header />
}

export default HydratedHeader