import { useState, useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-dark.css' // Import the style you want

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent
} from 'novel'

import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'

import {
  slashCommand,
  suggestionItems
} from '@/Components/editor/slash-command'
import EditorMenu from '@/Components/editor/editor-menu'
import { uploadFn } from '@/Components/editor/image-upload'
import { defaultExtensions } from '@/Components/editor/extensions'
import { TextButtons } from '@/Components/editor/selectors/text-buttons'
import { LinkSelector } from '@/Components/editor/selectors/link-selector'
import { NodeSelector } from '@/Components/editor/selectors/node-selector'
import { MathSelector } from '@/Components/editor/selectors/math-selector'
import { ColorSelector } from '@/Components/editor/selectors/color-selector'

import { Separator } from '@/Components/ui/separator'

const extensions = [...defaultExtensions, slashCommand]

export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface EditorProps {
  initialValue?: JSONContent
  onChange: (content: string) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

  // Function to apply syntax highlighting
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html')
    doc.querySelectorAll('pre code').forEach(el => {
      //@ts-ignore
      hljs.highlightElement(el)
    })
    return new XMLSerializer().serializeToString(doc)
  }

  // Apply highlighting when the component mounts or content updates
  useEffect(() => {
    const contentElement = document.querySelector('.editor-content') // Adjust selector if necessary
    if (contentElement) {
      highlightCodeblocks(contentElement.innerHTML)
    }
  }, [initialValue]) // Add dependencies as needed

  return (
    <div className='relative w-full bg-gray-700'>
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialValue}
          extensions={extensions}
          className='min-h-96 rounded-b-xl p-4 editor-content'
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-[400px]'
            }
          }}
          onUpdate={({ editor }) => {
            const htmlContent = editor.getHTML()
            onChange(htmlContent)
            highlightCodeblocks(htmlContent) // Apply highlighting after updating
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-white px-1 py-2 shadow-md transition-all text-black'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation='vertical' />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />

            <Separator orientation='vertical' />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation='vertical' />
            <MathSelector />

            <Separator orientation='vertical' />
            <TextButtons />

            <Separator orientation='vertical' />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}