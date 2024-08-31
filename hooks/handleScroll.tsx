export const handleSmoothScrolling = (event:any, path: string, navHeight: number) => {
    event.preventDefault()

    const sectionElement = path.startsWith("#") ? path.substring(1) : null
    
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