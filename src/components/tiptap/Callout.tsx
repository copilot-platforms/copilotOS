import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export const Callout =  () => {
  return (
    <NodeViewWrapper className="callout-container">
      <span className="label" contentEditable={false}>Callout</span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  )
}