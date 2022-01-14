import {
    App,
    Stack,
    aws_ecr as ecr,
} from 'aws-cdk-lib'
import * as fs from "fs";

const app = new App()

// logo url magic string
const logoUrl = 'https://d3g9o9u8re44ak.cloudfront.net/logo/9ebf47fe-41a9-48f0-82f7-8d13f7b223f7/3100bf82-0de4-4fb2-9465-195fccaaeb6b.png'

const p = '..'
function dirToPublicRepositoryProps(d: string): ecr.CfnPublicRepositoryProps {
    const path = `${p}/${d}`
    const metadata = require(`${path}/catalog-data.json`)

    // extend catalog data
    metadata.logoUrl = logoUrl
    metadata.aboutText = fs.readFileSync(`${path}/about.md`, 'utf-8')
    metadata.usageText = fs.readFileSync(`${path}/usage.md`, 'utf-8')

    return {
        repositoryName: d,
        repositoryCatalogData: metadata,
    }
}

// scan directories and map
const repos = fs.readdirSync(p)
                .filter(f => fs.statSync(`${p}/${f}`).isDirectory())
                .filter(f => f.charAt(0) !== '.')
                .filter(f => f !== 'cdk')
                .map(dirToPublicRepositoryProps)

class EcrRepositoryStack extends Stack {
    constructor(scope: App, id: string, props: ecr.CfnPublicRepositoryProps[]) {
        super(scope, id)

        // Add repositories
        props.forEach(repoProps => {
            console.log(repoProps)
            new ecr.CfnPublicRepository(this, repoProps.repositoryName || '', repoProps)
        })
    }
}

new EcrRepositoryStack(app, 'ecrRepository', repos)
app.synth()