import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { useEffect, useState } from 'react';


const Markdown = ({ mdFile, maxWidth, linkToPage }: { mdFile?: string, maxWidth?: number, linkToPage?: string }) => {
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
	
	const transformUri = function(uri: string){
		if(uri.startsWith("http")){
			return uri;
		}
		let url = window.location.href;
		const newurl = url.split(/\?|#/).shift();
		url = newurl === undefined ? "" :newurl;
		if(url.endsWith("/")){
			return `${url}${uri}`;							
		}
		if(url.endsWith("html")){
			url = url.slice(0, url.lastIndexOf('/'));
		}
		if(uri.startsWith("#")){
			return `${url}/${linkToPage}${uri}`
		}
		return `${url}/${uri}`;
	}
	
	function getHashtag() {
		const url = new URL(window.location.href);
		return url.hash.substring(1);
	}

	useEffect(() => {
        import(`./${mdFile}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setInput(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
			const id = getHashtag();
			console.log(id);
			const jump = document.getElementById(id) as HTMLInputElement | null;
			if(jump != null){
				jump.scrollIntoView();
			}
			
    });

    return <ReactMarkdown 
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={markdownComponent}
				children={input}
				transformImageUri={uri => {
						return transformUri(uri);
					}
				}
				transformLinkUri={uri => {
						return transformUri(uri);
					}
				}
			/>
};

 export default Markdown