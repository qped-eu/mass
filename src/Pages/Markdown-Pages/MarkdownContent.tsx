import Markdown from '../../Components/Markdown/Markdown';
import './MarkdownContent.css';

function MarkdownContent({input, center = false} : {input:string, center?:boolean}) {
    return (
        <div className={center ? 'center' : 'flush-left'}>
          <Markdown 
            mdFile={input}
          />
        </div>
      )
}

export default MarkdownContent;