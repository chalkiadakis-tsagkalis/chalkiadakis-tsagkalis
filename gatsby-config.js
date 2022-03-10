/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
      siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options:{
        name:'excel',
        path: `${__dirname}/excel`,
      }
    }

  ]
}
