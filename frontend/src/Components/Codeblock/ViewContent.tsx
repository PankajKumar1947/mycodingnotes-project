import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

interface MarkdownViewerProps {
    content: string;
}

const ViewContent = ({ content }: MarkdownViewerProps) => {
    useEffect(() => {
        hljs.highlightAll(); // Highlight all code blocks
    }, [content]);
    return (
        <div
            className='prose max-w-full'
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    )
}

export default ViewContent