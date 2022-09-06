import Markdown from '../Components/Markdown/Markdown';

function MarkdownContent({input} : {input:string}) {
    return (
        <Markdown 
          mdFile={input}
        />
      )
}

export default MarkdownContent;