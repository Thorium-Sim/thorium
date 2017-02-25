import s3 from 's3';
import { secretAccessKey, accessKeyId, bucket } from '../../secrets';

const options = {
  secretAccessKey,
  accessKeyId,
  bucket,
};

const client = s3.createClient({
  s3Options: options,
});

export default client;
