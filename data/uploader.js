import s3 from 's3';

const options = {
  secretAccessKey: 'JdFM9L1VSmKMOQ4dHn0MkqxMdl5NogdNPW6tYBmO',
  accessKeyId: 'AKIAJK7NJKV6DM4YGKBA',
  bucket: 'thorium-assets',
};

const client = s3.createClient({
  s3Options: options,
});

export default client;
