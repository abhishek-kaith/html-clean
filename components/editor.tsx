'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});
const HEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
});

import 'react-quill/dist/quill.snow.css';

function Editor() {
    const [value, setValue] = useState('<h1>hello</h1>');
    const [code, setCode] = useState('<h1>hello</h1>');

    return (
        <section className='container'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <ReactQuill
                    value={value}
                    onChange={(value) => {
                        setValue(value);
                    }}
                    onKeyDown={() => {
                        setCode(value);
                    }}
                    placeholder='Hello World!'
                    modules={modules}
                    className='h-[600px]'
                />
                <HEditor
                    height='643px'
                    defaultLanguage='html'
                    value={code}
                    onChange={(value) => {
                        if (!value) return;
                        setCode(value);
                        setValue(value);
                    }}
                    className='border border-gray-400/65 py-4'
                />
            </div>
            <button
                className='bg-black text-white px-4 py-2 rounded-md mt-4'
                onClick={() => {
                    const clean = sanitizeHtml(code);
                    setValue(clean);
                    setCode(clean);
                }}
            >
                Clean HTML
            </button>
        </section>
    );
}

const modules = {
    toolbar: [
        [
            { header: [1, 2, 3, 4, 5, 6, false] },
            { header: '1' },
            { header: '2' },
        ],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: ['right', 'center', 'justify'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
    ],
};

export default Editor;
