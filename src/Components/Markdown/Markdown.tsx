import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { useEffect, useState , useCallback, useRef } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useLocation } from "react-router-dom";
import "./Markdown.css";

const useResize = (myRef: React.RefObject<HTMLDivElement>) => {
	const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);	
	const [width, setWidth] = useState<number | undefined>(undefined);

	useEffect(() => {
		let maxWidth = getWidth();
		maxWidth = maxWidth === undefined ? 20 : maxWidth - 20;
		const handleResize = () => {
			setWidth(maxWidth);
		};	
		if (myRef.current) {
			setWidth(maxWidth);
		}
	
		window.addEventListener('resize', handleResize);

		return () => {	
			window.removeEventListener('resize', handleResize);
		};
	}, [myRef, getWidth]);
	
	return width && width > 25 ? width - 25 : width;
};

const Markdown = ({ mdFile }: { mdFile: string, }) => {
	const location = useLocation();
	const divRef = useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
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
		),	
		code:({node, inline, className, children, ...props}:{node:any, inline?:any, className?:any, children:any}) => {
			const match = /language-(\w+)/.exec(className || '');
			return !inline && match ? (
				<SyntaxHighlighter
				  children={String(children).replace(/\n$/, '')}
				  language={match[1]}
				  PreTag="div"
				  {...props}
				/>
			  ) : (
				<code className={className} {...props}>
				  {children}
				</code>
			  )
			  }
	};
	
	const transformUri = function(uri: string, image:boolean){
		if(uri.startsWith("http")){
			return uri;
		}
		let url = uri;
		while(url.startsWith("/")){
			url = url.substring(1);
		}
		if(image){
			return process.env.PUBLIC_URL + "/"+ url;
		}
		if(url.startsWith('#')){
			let base = window.location.href;
			const hashNum = (base.match(/#/g) || []).length;
			if(hashNum > 1){
				base = base.substring(0, base.lastIndexOf('#'));
			}
			return base + url;
		}
		return process.env.PUBLIC_URL + "#/"+ url;
	}

	useEffect(() => {
		/*import(`../../markdown/${mdFile}`)
		.then(res => {
			fetch(res.default)
			.then(res => res.text())
			.then(res => setInput(res))
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));*/
		scrollTo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	  useEffect(() => {scrollTo()}, [location]);

	const scrollTo = function(){
		let base = window.location.href;
		const hashNum = (base.match(/#/g) || []).length;
		if(hashNum > 1){
			const lastHash = base.substring(base.lastIndexOf('#')+1);
			const jumps = document.getElementsByName(lastHash);
			if(jumps.length > 0){
				const jump = jumps[0];
				jump.scrollIntoView();
			}
			else{
				const jump = document.getElementById(lastHash);
				if(jump !== undefined && jump !== null){
					jump.scrollIntoView();
				}
			}
			
		}
	}

    return (
		<div className='markdownContainer' ref={divRef}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={markdownComponent}
				children={mdFile}
				transformImageUri={
					uri => {
						return transformUri(uri, true);
					}
				}
				transformLinkUri={
					uri => {
						return transformUri(uri, false);
					}
				}
			/>
		</div>
	);
}

 export default Markdown;