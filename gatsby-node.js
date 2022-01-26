const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug =
      "/physical" + createFilePath({ node, getNode, basePath: `releases` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/physical.js`),
          context: {
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /soundcloud-audio/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onCreateDevServer = ({ app, store }) => {
  const { program } = store.getState();
  const serveStaticHtml = (urlPath) => {
    app.get(urlPath, function (req, res) {
      res.sendFile(
        path.join(program.directory, "public" + urlPath + "/index.html"),
        (err) => {
          if (err) {
            res.status(500).end(err.message);
          }
        }
      );
    });
  };

  serveStaticHtml(`/digital/WIP-001`);
  serveStaticHtml(`/digital/WIP-002`);
  serveStaticHtml("/digital/WIP-003");
  serveStaticHtml("/digital/WIP-004");
};
