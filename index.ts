import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

/**
* const config = new pulumi.Config();
* const vpcTag1 = config.requireObject("xw-cluster-4.k8s.local");
* const vpcTag2 = config.requireObject("xw-cluster-3.k8s.local");
*/

/** https://github.com/pulumi/pulumi-aws/blob/d26fdf80632ded25a926f9d4ed2f5e7234dc4cf8/sdk/nodejs/ec2/getVpc.ts */
const firstVpc: GetVpcResult = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-4.k8s.local",
    },
});

const secondVpc: GetVpcResult = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-3.k8s.local",
    },
});

/** https://github.com/pulumi/pulumi-aws/blob/d26fdf80632ded25a926f9d4ed2f5e7234dc4cf8/sdk/nodejs/ec2/getRouteTables.ts */
const rtsFirst = aws.ec2.getRouteTables({
    tags: {
        KubernetesCluster: "xw-cluster-4.k8s.local",
    },
});

const rtsSec = aws.ec2.getRouteTables({
    tags: {
        KubernetesCluster: "xw-cluster-3.k8s.local",
    },
});

/** https://github.com/pulumi/pulumi-aws/blob/52989a7f8b5fced978aff841d067ae702eac13a2/sdk/nodejs/ec2/vpcPeeringConnection.ts */
const vpcPeeringConnection = new aws.ec2.VpcPeeringConnection("vpcPeeringConnection", {
    peerVpcId: firstVpc.id,
    vpcId: secondVpc.id,
    autoAccept: true,
    tags: {
        Name: "VPC Peering between fistVpc and secVpc",
    },
});

export const fVpcId = firstVpc
export const sVpcId = secondVpc
export const firstRTs = rtsFirst
export const secRTs = rtsSec
/** export const vpcPC = vpcPeeringConnection */

