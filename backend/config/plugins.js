module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'amazon-ses',
      providerOptions: {
        key: env('AWS_SES_KEY'),
        secret: env('AWS_SES_SECRET'),
        amazon: 'https://email.eu-west-1.amazonaws.com',
      },
      settings: {
        defaultFrom: 'no-reply-sender@trustlist.uk',
        defaultReplyTo: 'contact@trustlist.uk',
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options:{
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: 'ap-south-1',
          params: {
            Bucket: 'fypdev2',
          },
        }
      },
      sizeLimit:40 * 1024 * 1024 // Now
    },
  },
});
