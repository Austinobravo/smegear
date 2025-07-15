"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function LatestNewsHeader() {
  return (
    <section className="w-full py-20 px-4 md:px-28 bg-[#FEFFFE]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        <div>
          <div className="flex items-center gap-2 text-smegear-accent text-sm md:text-base font-medium uppercase">
            <FileText size={20} />
            <span>Our News & Blogs</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
            Latest News & Blogs
          </h2>
        </div>

        <Button
          size="lg"
          className="bg-smegear-secondary hover:bg-smegear-accent text-white px-8 py-6 text-sm md:text-base font-semibold rounded-md"
        >
          View All Posts →
        </Button>
      </div>
    </section>
  )
}
