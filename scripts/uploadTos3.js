var s3 = require("s3");
var ProgressBar = require("progress");
const fs = require("fs"); //Load the filesystem module

var client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 500 * 1024 * 1024, // 500 MB
  multipartUploadSize: 500 * 1024 * 1024 // 500 MB
});

[
  "./zips/thorium-macos.zip",
  "./zips/thorium-win.exe.zip",
  "./zips/thorium-linux.zip"
].reduce((promise, path) => {
  return promise.then(
    () =>
      new Promise((resolve, reject) => {
        const key = path.replace("./zips/", "");
        var params = {
          localFile: path,

          s3Params: {
            Bucket: "thoriumsim",
            Key: key,
            ACL: "public-read"
            // other options supported by putObject, except Body and ContentLength.
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
          }
        };

        // Set up our progress bar
        const stats = fs.statSync(path);
        const fileSizeInBytes = stats.size;
        var bar = new ProgressBar(
          `${key}: [:bar] :rate/bps :percent Elapsed: :elapseds ETA: :etas`,
          {
            total: fileSizeInBytes,
            complete: "=",
            incomplete: " ",
            width: 20
          }
        );
        var uploader = client.uploadFile(params);
        uploader.on("error", function(err) {
          console.error("unable to upload:", key, err.stack);
          reject();
        });
        let previousProgress = 0;

        uploader.on("progress", function() {
          const progress = uploader.progressAmount - previousProgress;
          previousProgress = uploader.progressAmount;
          bar.tick(progress);
        });
        uploader.on("end", function() {
          console.log("done uploading " + key);
          resolve();
        });
      })
  );
}, Promise.resolve());
