'use client'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill' // Import ReactQuill component
import 'react-quill/dist/quill.snow.css' // Import Quill styles

const HtmlEditor = () => {
  const [editorHtml, setEditorHtml] = useState('')

  const handleChange = (value: any) => {
    setEditorHtml(value) // Update the state with the editor content
  }

  return (
    <div>
      <Typography>Answer</Typography>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        theme='snow'
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean']
          ]
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'list',
          'bullet',
          'align',
          'color',
          'background',
          'link',
          'image'
        ]}
      />

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
        <h3>Output</h3>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
      <style jsx>{`
        :global(.ql-editor) {
          white-space: pre-line;
          min-height: 200px;
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

export default HtmlEditor
