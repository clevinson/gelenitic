import React from "react";
import { Sa, Slink, Link } from "../components/link";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { SmallMediaQuery, MediumMediaQuery } from "../global-variables";

const ReleaseList = styled.ul`
  width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 15px;

  @media only screen and ${MediumMediaQuery} {
    width: 520px;
  }

  @media only screen and ${SmallMediaQuery} {
    width: 100%;
  }

  li.left-to-right {
    flex-direction: row;
    text-align: left;
  }

  li.right-to-left {
    flex-direction: row-reverse;
    text-align: right;
  }

  @media only screen and ${SmallMediaQuery} {
    li {
      flex-direction: column !important;
      padding-top: 0;
    }
  }
`;

const Release = styled.li`
  list-style-type: none;
  padding: 80px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 1.5em;
`;

const Art = styled.div`
  width: 45%;
  position: relative;

  @media only screen and ${SmallMediaQuery} {
    width: 100%;
  }
`;

const CoverArt = styled.img`
  width: 100%;
`;
const HoverArt = styled.img`
  width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  transition: opacity 0.7s ease-in-out;

  :hover {
    opacity: 1;
  }
`;

const Info = styled.div`
  width: 45%;

  @media only screen and ${SmallMediaQuery} {
    width: 100%;
    padding-top: 15px;
    box-sizing: border-box;
  }
`;

const Header = styled.h2`
  margin-top: 0;
  color: black;
`;

let isEven = (num) => {
  if (num % 2 === 0) {
    return "left-to-right";
  } else {
    return "right-to-left";
  }
};

export default ({ data }) => {
  return (
    <Layout>
      <ReleaseList>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          let release = node.frontmatter;

          let digitalUrl = release.bandcamp_url
            ? release.bandcamp_url
            : "/digital/" + release.cat_no + "/";

          return (
            <Release key={i} className={isEven(i)}>
              <Art>
                <Link href={node.fields.slug}>
                  <CoverArt src={release.cover_art} />
                  <HoverArt src={release.hover_art} />
                </Link>
              </Art>
              <Info>
                <Header>{release.artist}</Header>
                <Header>{release.title}</Header>
                <div>{release.cat_no}</div>
                <div>{release.release_date}</div>
                <div>
                  <Sa href={digitalUrl} target="_blank">
                    listen
                  </Sa>
                  <span> / </span>
                  <Slink to={node.fields.slug}>{release.format}</Slink>
                </div>
              </Info>
            </Release>
          );
        })}
      </ReleaseList>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___release_date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            artist
            release_date
            cat_no
            cover_art
            hover_art
            format
            bandcamp_url
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
