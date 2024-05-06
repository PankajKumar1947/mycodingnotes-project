import { Codeblock } from "../Components/Codeblock/Codeblock";
import PostNabar from "../Components/Header/PostNabar";


const ViewPost = () => {
  const input=`
  **bold**

  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam id cumque, voluptates inventore in ea recusandae explicabo reprehenderit quo quisquam qui quos voluptatibus ad earum ipsum repudiandae ipsa quod mollitia magnam suscipit. Tenetur, dolorum in nemo non a explicabo sit enim quos hic illum dolorem, reiciendis labore quo eius, odio soluta beatae accusantium ipsum repellendus? Deserunt sed temporibus earum quas soluta molestias modi odit nulla! Et dolorem hic quos assumenda soluta excepturi nostrum fuga autem eos voluptate doloribus molestiae architecto repellat, molestias omnis dolorum, fugit unde similique perspiciatis, quisquam velit!
  

  *italic*


  Just a link: www.nasa.gov.

  **code**
  ~~~js
  <div className='min-h-[90vh]  mx-auto'>
      <PostNabar/>

      <div className="w-[90vw] mx-auto">
      <div className=" ">
        <Markdown
            children={input}
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
        </div>
      </div>
    </div>
  ~~~

  # This is Heading
  `
  
  return (
    <div className='min-h-[90vh]  mx-auto'>
      <PostNabar/>

      <div className="w-[90vw] mx-auto ">
        <Codeblock input={input}/>
      </div>
    </div>
  )
}

export default ViewPost