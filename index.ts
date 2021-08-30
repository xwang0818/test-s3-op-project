import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const vpc = new aws.ec2.Vpc("xw-pulumi-vpc", {
    cidrBlock: "10.129.0.0/16",
});
