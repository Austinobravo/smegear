export const handleSmoothScrolling = (event:any, path: string) => {
    event.preventDefault()

    const desktopNavHeight = document.getElementById("desktopNav")?.offsetHeight || 0
    const mobileNavHeight = document.getElementById("mobileNav")?.offsetHeight || 0
    const sectionElement = path.startsWith("#") ? path.substring(1) : null

    const navHeight = desktopNavHeight + mobileNavHeight
    
    if (sectionElement){
        const sectionId = document.getElementById(sectionElement)
        if(sectionId){
            const sectionPosition = sectionId?.offsetTop - navHeight
            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth"
            })
        }
    }
    else{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}