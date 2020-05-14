import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const names = [];
for (let i = 0; i < 3; i++) {
    const bucket = new aws.s3.Bucket(`my-bucket-${i}`);
    names.push(bucket.id);
}

// Export the name of the buckets
export const bucketNames = names;
