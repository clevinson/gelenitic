import React from "react";
import ReleaseTextBox from "../components/release-textbox";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { SmallMediaQuery, SmallWidth } from "../global-variables";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BackgroundImages = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: scroll;
  z-index: -1;
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  cursor: pointer;

  @media only screen and ${SmallMediaQuery} {
    cursor: auto;
    width: 100%;
    position: static;
    display: block;
  }
`;

class PhysicalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideContent: false,
    };
  }

  backgroundClick = (e) => {
    // only make background clickable on non-mobile sized creens
    if (window.innerWidth > SmallWidth) {
      this.setState((prevState) => ({
        hideContent: !prevState.hideContent,
      }));
    }
  };

  render() {
    let data = this.props.data;
    let release = data.markdownRemark.frontmatter;
    release.description = data.markdownRemark.html;

    const images = data.markdownRemark.frontmatter.background_images;
    return (
      <Layout hideFooter={this.state.hideContent}>
        <div className="container">
          <ReleaseTextBox hideContent={this.state.hideContent} data={release} />
          <BackgroundImages onClick={this.backgroundClick}>
            {images.map((imageNode, i) => {
              let image = getImage(imageNode.src);

              return (
                <GatsbyImage
                  alt=""
                  key={i}
                  image={image}
                  style={{ zIndex: -2 }}
                />
              );
            })}
          </BackgroundImages>
        </div>
      </Layout>
    );
  }
}

export default PhysicalPage;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        artist
        release_date
        cat_no
        format
        width
        position {
          x
          y
        }
        tracklist {
          a
          b
        }
        background_images {
          src {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
            }
          }
        }
        purchase_link
        purchase_links {
          label
          url
        }
        sold_out
        bandcamp_url
      }
    }
  }
`;
