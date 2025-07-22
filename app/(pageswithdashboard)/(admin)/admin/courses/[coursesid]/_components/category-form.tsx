"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Combobox } from "@/components/ui/combobox" // custom Combobox

const categories = [
  { id: 1, name: "Accounting" },
  { id: 2, name: "Computer Science" },
  { id: 3, name: "Engineering" },
  { id: 4, name: "Fishing" },
  { id: 5, name: "Fitness" },
  { id: 6, name: "Music" },
  { id: 7, name: "Photography" },
]

const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
})

export const CategoryForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  })

  const selectedCategory = categories.find(
    (cat) => cat.id.toString() === form.watch("category")
  )

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selected = categories.find(cat => cat.id.toString() === values.category)
    toast.success(`Saved ${selected?.name}`)
    toggleEdit()
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {selectedCategory?.name || "No category selected"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Select Category</FormLabel>
                  <Combobox value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CategoryForm
