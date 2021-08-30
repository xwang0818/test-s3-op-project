import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

* const config = new pulumi.Config();
* const vpcTag1 = config.requireObject("xw-cluster-4.k8s.local");
* const vpcTag2 = config.requireObject("xw-cluster-3.k8s.local");

const firstVpc = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-4.k8s.local",
    },
});

const secVpc = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-3.k8s.local",
    },
});

export const firstVpcId = firstVpc
export const secVpcId = secVpc
