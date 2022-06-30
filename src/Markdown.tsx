import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { useEffect, useState } from 'react';

const Markdown = ({ mdFile, maxWidth }: { mdFile?: string, maxWidth?: number }) => {
    const [input, setInput] = useState<any>();
	const markdownComponent = {
	img: ({
		alt,
		src,
		title,
	}: {
		alt?: string;
		src?: string;
		title?: string;
	}) => (
		<img 
			alt={alt} 
			src={src} 
			title={title} 
			style={{ maxWidth: maxWidth }} 
		/>
	)
  };

    useEffect(() => {
        import(`./${mdFile}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setInput(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    return <ReactMarkdown 
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={markdownComponent}
				children={input}
				transformImageUri={uri =>
					uri.startsWith("http") ? uri : `${window.location.href}/${uri}` 
				}
			/>
};

 export default Markdown