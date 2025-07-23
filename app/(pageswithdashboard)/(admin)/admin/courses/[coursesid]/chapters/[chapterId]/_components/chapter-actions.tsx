"use client"

import ConfirmModal from '@/components/modals/confirm-modals';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React from 'react'


interface ChapterActionsProps {
  disabled: boolean;
  chaptersId: string;
  checkPublished: boolean;
}

const ChapterActions = ({ disabled, chaptersId, checkPublished }: ChapterActionsProps) => {
  return (
    <div className='flex items-center gap-x-2'>
      <Button onClick={() => { }}
        disabled={disabled}
        variant="outline"
        size="sm">
        {checkPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={() => { }}>
        <Button>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>

    </div>
  )
}

export default ChapterActions