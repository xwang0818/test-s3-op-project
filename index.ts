import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

/**
* const config = new pulumi.Config();
* const firstTag = config.requireObject("firstVpc");
* const secondTag = config.requireObject("secondVpc");
*/

/** https://github.com/pulumi/pulumi-aws/blob/d26fdf80632ded25a926f9d4ed2f5e7234dc4cf8/sdk/nodejs/ec2/getVpc.ts */
const firstVpc = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-4.k8s.local", // firstTag,
    },
});

const secondVpc = aws.ec2.getVpc({
    tags: {
        Name: "xw-cluster-3.k8s.local", // secondTag,
    },
});

/** https://github.com/pulumi/pulumi-aws/blob/d26fdf80632ded25a926f9d4ed2f5e7234dc4cf8/sdk/nodejs/ec2/getRouteTables.ts */
const firstRTs = aws.ec2.getRouteTables({
    tags: {
        KubernetesCluster: "xw-cluster-4.k8s.local",
    },
});

const secondRTs = aws.ec2.getRouteTables({
    tags: {
        KubernetesCluster: "xw-cluster-3.k8s.local",
    },
});

/** https://github.com/pulumi/pulumi-aws/blob/52989a7f8b5fced978aff841d067ae702eac13a2/sdk/nodejs/ec2/vpcPeeringConnection.ts */
const vpcPC = new aws.ec2.VpcPeeringConnection("vpcPeeringConnection", {
    peerVpcId: firstVpc.then(firstVpc => firstVpc.id), 
    vpcId: secondVpc.then(secondVpc => secondVpc.id),
    autoAccept: true,
    tags: {
        Name: "VPC Peering Connection Pulumi Test",
    },
});

let firstVpcCidr = firstVpc.then(firstVpc => firstVpc.cidrBlock)
let secondVpcCidr = secondVpc.then(secondVpc => secondVpc.cidrBlock)

for (var rtId of firstRTs.then(firstRTs => firstRTs).ids) {

}

for (var rtId of firstRTs.then(firstRTs => firstRTs).ids) {

}

/**
const route = new aws.ec2.Route("route", {
    routeTableId: "rtb-059b3e7c2ad544eef",
    destinationCidrBlock: "10.124.0.0/16",
    vpcPeeringConnectionId: vpcPC.id,
});
*/

export const vpcFirst  = firstVpc
export const vpcSecond = secondVpc
export const rtsFirst  = firstRTs
export const rtsSecond = secondRTs
export const vpcPeerConnection = vpcPC

