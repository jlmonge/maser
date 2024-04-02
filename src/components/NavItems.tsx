"use client";

import { PRODUCT_CATEGORIES } from '@/config';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const isAnyOpen = activeIndex !== null;
    const navRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(navRef, () => setActiveIndex(null));

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveIndex(null);
            }
        }

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        }
    }, [])

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {
                const isOpen = activeIndex === i;
                
                const handleOpen = () => {
                    if (isOpen) {
                        setActiveIndex(null);
                    } else {
                        setActiveIndex(i);
                    }
                }

                return (
                    <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen} />
                );
            })}
            <Link href="/products"></Link>
        </div>
    );
};

export default NavItems;