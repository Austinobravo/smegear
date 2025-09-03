import { usePathname } from 'next/navigation'
import React from 'react'

const useNavigation = () => {
    const pathname = usePathname()

    const navLinks = React.useMemo(() => [
        {
            name: "Home",
            href: "/",
            isActive: pathname === "/",
        },
        {
            name: "Courses",
            href: "/courses",
            isActive: pathname.includes("courses"),
        },
        {
            name: "About",
            href: "/about",
            isActive: pathname.includes("about"),
        },
        {
            name: "login",
            href: "/login",
            isActive: pathname.includes("login"),
        },
        {
            name: "register",
            href: "/register",
            isActive: pathname.includes("register"),
        },
       
    ], [pathname])
  return (
    navLinks
  )
}

export default useNavigation
