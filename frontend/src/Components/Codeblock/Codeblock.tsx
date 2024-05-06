import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack} from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Codeblock=(props:any)=>{
    return (
        <Markdown
            children={props.input}
            components={{
            code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                <SyntaxHighlighter
                    
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={irBlack}
                />
                ) : (
                <code {...rest} className={className}>
                    {children}
                </code>
                )
            }
            }}
        />
    )
}