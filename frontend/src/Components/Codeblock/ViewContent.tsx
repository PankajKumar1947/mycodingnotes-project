import { useEffect } from 'react';
import hljs from 'highlight.js';
import './viewcontent.css'

interface MarkdownViewerProps {
    content: string;
}

const ViewContent = ({ content }: MarkdownViewerProps) => {
    useEffect(() => {
        // Highlight all code blocks
        hljs.highlightAll();

        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            // Check if a copy button already exists
            const parent = block.parentElement;
            if (!parent?.querySelector('.copy-button')) {
                // Create a copy button element
                const copyButton = document.createElement('button');
                copyButton.innerText = 'Copy';
                copyButton.className = 'copy-button';

                parent?.appendChild(copyButton);

                // event listener to copy code
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(block.textContent || '');

                    copyButton.innerText = 'Copied!';
                    setTimeout(() => (copyButton.innerText = 'Copy'), 2000);
                });
            }
        });

        // Cleanup event listeners when content changes
        return () => {
            codeBlocks.forEach((block) => {
                const copyButton = block.parentElement?.querySelector('.copy-button');
                copyButton?.removeEventListener('click', () => {});
            });
        };
    }, [content]);

    return (
        <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
};

export default ViewContent;