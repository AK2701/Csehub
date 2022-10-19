const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: process.env.SANITY_PROJECTID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_APIVERSION,
    token: process.env.SANITY_TOKEN,
    useCdn: true,
})

export default client