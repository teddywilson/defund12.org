import React from 'react';
import remark from 'remark';
import { StaticQuery, graphql } from 'gatsby';
import remarkHTML from 'remark-html';

interface FooterProps {
    footerText: string;
    contactEmailFooter: string;
}


class _Footer extends React.Component<FooterProps> {
    constructor(props: FooterProps) {
        super(props);
    }
    
    markdownToHTML(value: string) {
        return remark()
        .use(remarkHTML)
        .processSync(value)
        .toString()
    }

    render() {
        return (
            <>
                <p className="divider footer" dangerouslySetInnerHTML={ { __html: this.markdownToHTML(this.props.footerText) } }></p>
                <p className="divider footer" dangerouslySetInnerHTML={ { __html: this.markdownToHTML(this.props.contactEmailFooter) } }></p>
            </>
        );
    }
}

export default function Footer() {
    return (
        <StaticQuery query={graphql`
            query FooterQuery {
                defund12Yaml {
                    footer_text
                    contact_email_footer
                }
            }`
        }
        render={data => <_Footer footerText={data.defund12Yaml.footer_text} contactEmailFooter={data.defund12Yaml.contact_email_footer}/>}
        />
    );
}