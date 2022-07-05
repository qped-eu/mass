import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { useEffect, useState } from 'react';

const transformUri = function(uri: string){
	if(uri.startsWith("http")){
		return uri;
	}
	let url = window.location.href;
	let newurl = url.split(/\?|#/).shift();
	url = newurl === undefined ? "" :newurl;
	if(url.endsWith("/")){
		return `${url}${uri}`;							
	}
	if(url.endsWith("html")){
		url = url.slice(0, url.lastIndexOf('/'));
	}
	return `${url}/${uri}`;
}

const Markdown = ({ mdFile, maxWidth, transformLinks }: { mdFile?: string, maxWidth?: number, transformLinks?: boolean }) => {
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
				transformImageUri={uri => {
						if(transformLinks){
							return transformUri(uri);
						}
						return uri;
					}
				}
				transformLinkUri={uri => {
						return transformUri(uri);
					}
				}
			/>
};

 export default Markdown