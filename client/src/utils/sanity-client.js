import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '87dh3qiy',
    dataset: 'production',
    apiVersion: '2023-02-03',
    useCdn: false,
    token: process.env.REACT_APP_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
    if (source) return builder.image(source);
};
