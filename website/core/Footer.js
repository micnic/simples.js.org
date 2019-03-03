const React = require('react');

class Footer extends React.Component {
	docUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		const docsUrl = this.props.config.docsUrl;
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
		const langPart = `${language ? `${language}/` : ''}`;
		return `${baseUrl}${docsPart}${langPart}${doc}`;
	}

	pageUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		return baseUrl + (language ? `${language}/` : '') + doc;
	}

	render() {
		return (
			<footer className="nav-footer" id="footer">
				<section className="sitemap">
					<a href={this.props.config.baseUrl} className="nav-home">
						{this.props.config.footerIcon && (
							<img
								src={this.props.config.baseUrl + this.props.config.footerIcon}
								alt={this.props.config.title}
								width="66"
								height="58"
							/>
						)}
					</a>
					<div>
						<h5>Docs</h5>
						<a href={this.docUrl('index', this.props.language)}>
							Index
						</a>
						<a href={this.docUrl('start', this.props.language)}>
							Get Started
						</a>
					</div>
					<div>
						<h5>More</h5>
						<a href="https://npmjs.org/package/simples">npm</a>
						<a href="https://github.com/micnic/simpleS">GitHub</a>
						<a
							className="github-button"
							href={this.props.config.repoUrl}
							data-icon="octicon-star"
							data-count-href="/micnic/simples/stargazers"
							data-show-count="true"
							data-count-aria-label="# stargazers on GitHub"
							aria-label="Star this project on GitHub">
							Star
						</a>
					</div>
				</section>

				<section className="copyright">{this.props.config.copyright}</section>
			</footer>
		);
	}
}

module.exports = Footer;