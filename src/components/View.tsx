'use client'
import React from 'react'
import Edit from '@/app/edit/client';

export function View({ document, name }: { document: string, name: PageName }) {
  return (
    <Edit editable={false} document={document} name={name}/>
  );
}
