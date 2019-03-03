const React = require('react');

const { Container, GridBlock } = require('../../core/CompLibrary.js');

class HomeSplash extends React.Component {
	render() {
		const {siteConfig, language = ''} = this.props;
		const {baseUrl, docsUrl} = siteConfig;
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
		const langPart = `${language ? `${language}/` : ''}`;
		const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

		const SplashContainer = props => (
			<div className="homeContainer">
				<div className="homeSplashFade">
					<div className="wrapper homeWrapper">{props.children}</div>
				</div>
			</div>
		);

		const ProjectTitle = () => (
			<h2 className="projectTitle">
				<img src={`${baseUrl}img/logo.svg`} />
				<small>{siteConfig.tagline}</small>
			</h2>
		);

		const PromoSection = props => (
			<div className="section promoSection">
				<div className="promoRow">
					<div className="pluginRowBlock">{props.children}</div>
				</div>
			</div>
		);

		const Button = props => (
			<div className="pluginWrapper buttonWrapper">
				<a className="button" href={props.href} target={props.target}>
					{props.children}
				</a>
			</div>
		);

		return (
			<SplashContainer>
				<div className="inner">
					<ProjectTitle siteConfig={siteConfig} />
					<PromoSection>
						<Button href="#install">Installation</Button>
						<Button href={docUrl('start', language)}>Get Started</Button>
						<Button href={docUrl('index', language)}>Documentation</Button>
					</PromoSection>
				</div>
			</SplashContainer>
		);
	}
}

class Index extends React.Component {
	render() {
		const { config: siteConfig, language = '' } = this.props;
		const { baseUrl } = siteConfig;

		const server = `
\`\`\`js
const simples = require('simples');

const server = simples();

server.get('/', (connection) => {
	connection.end('Hello World');
});
\`\`\`
		`;

		const Block = props => (
			<Container
				padding={['bottom', 'top']}
				id={props.id}
				background={props.background}>
				<GridBlock
					align={props.align}
					contents={props.children}
					layout={props.layout}
				/>
			</Container>
		);

		const Features = () => (
			<Block align="center" background="light" layout="threeColumn">
			{[
				{
					content: 'API is focused on simplicity but keeping a high performance',
					image: `${baseUrl}img/graph.svg`,
					imageAlign: 'top',
					title: 'Simplicity and Performance',
				},
				{
					content: 'API for creating servers and clients for the HTTP(S) and WebSocket protocols',
					image: `${baseUrl}img/server-client.svg`,
					imageAlign: 'top',
					title: 'HTTP(S) and WS(S) API',
				},
				{
					content: 'Advanced routing for HTTP requests, static files and errors',
					image: `${baseUrl}img/routing.svg`,
					imageAlign: 'top',
					title: 'Advanced Routing',
				},
				{
					content: 'Every server can serve multiple hosts and on multiple ports',
					image: `${baseUrl}img/hosting.svg`,
					imageAlign: 'top',
					title: 'Virtual Hosting and Mirrors',
				},
				{
					content: 'Support for third-party template engines',
					image: `${baseUrl}img/templating.svg`,
					imageAlign: 'top',
					title: 'Template Engine Support',
				},
				{
					content: 'Includes most common tools out of the box',
					image: `${baseUrl}img/middlewares.svg`,
					imageAlign: 'top',
					title: 'All-In-One Solution',
				}
			]}
			</Block>
		);

		const Installation = () => (
			<Block id="install">
				{[
					{
						content: 'Install latest simpleS version 0.9.0 by running the following command:\n\n`npm i simples@alpha`',
						image: `${baseUrl}img/command-line.svg`,
						imageAlign: 'left',
						title: 'Installation',
					},
				]}
			</Block>
		);

		const TryNow = () => (
			<Block background="light" id="try">
				{[
					{
						content: `Create your own server just by using few lines of code:\n\n${server}`,
						image: `${baseUrl}img/logo-square.svg`,
						imageAlign: 'right',
						title: 'Try now!',
					},
				]}
			</Block>
		);

		const LearnHow = () => (
			<Block>
				{[
					{
						content: 'Read docs, follow tutorial, create apps!',
						image: `${baseUrl}img/learn.svg`,
						imageAlign: 'left',
						title: 'Learn How',
					},
				]}
			</Block>
		);

		return (
			<div>
				<HomeSplash siteConfig={siteConfig} language={language} />
				<div className="mainContainer">
					<Features />
					<Installation />
					<TryNow />
					<LearnHow />
				</div>
			</div>
		);
	}
}

module.exports = Index;