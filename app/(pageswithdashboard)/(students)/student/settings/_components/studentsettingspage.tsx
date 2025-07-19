'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

// ✅ Zod Schema (Defined on the same page)
const studentSettingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional()
})

type StudentSettingsValues = z.infer<typeof studentSettingsSchema>

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState(true)

  const form = useForm<StudentSettingsValues>({
    resolver: zodResolver(studentSettingsSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: StudentSettingsValues) => {
    console.log('Settings saved:', data)
    toast.success('Settings updated!')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
     

      {/* Profile Settings */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl bold'>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <div>
              <Label htmlFor="name"  className="text-lg">Name</Label>
              <Input id="name" placeholder="John Doe" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-lg">Change Password</Label>
              <Input id="password" type="password" placeholder="New password" {...form.register('password')} />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto bg-smegear-secondary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl bold'>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Course Updates</p>
            <p className="text-muted-foreground text-lg">Receive updates about course progress and deadlines.</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 text-xl">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-4">
            Deleting your account is irreversible. You will lose all your data, course progress, and access.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  )
}
