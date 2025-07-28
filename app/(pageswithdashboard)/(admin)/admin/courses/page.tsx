import { columns } from './_components/columns'
import React from 'react'
import { DataTable } from './_components/data-table'
import Items from '@/Data/items'



const CoursesPage = async () => {

  return (
    <div>  <DataTable columns={columns} data={Items} />
    </div>
  )
}

export default CoursesPage