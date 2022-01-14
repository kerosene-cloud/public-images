"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const fs = __importStar(require("fs"));
const app = new aws_cdk_lib_1.App();
// logo url magic string
const logoUrl = 'https://d3g9o9u8re44ak.cloudfront.net/logo/9ebf47fe-41a9-48f0-82f7-8d13f7b223f7/3100bf82-0de4-4fb2-9465-195fccaaeb6b.png';
const p = '..';
function dirToPublicRepositoryProps(d) {
    const path = `${p}/${d}`;
    const metadata = require(`${path}/catalog-data.json`);
    // extend catalog data
    metadata.logoUrl = logoUrl;
    metadata.aboutText = fs.readFileSync(`${path}/about.md`, 'utf-8');
    metadata.usageText = fs.readFileSync(`${path}/usage.md`, 'utf-8');
    return {
        repositoryName: d,
        repositoryCatalogData: metadata,
    };
}
// scan directories and map
const repos = fs.readdirSync(p)
    .filter(f => fs.statSync(`${p}/${f}`).isDirectory())
    .filter(f => f.charAt(0) !== '.')
    .filter(f => f !== 'cdk')
    .map(dirToPublicRepositoryProps);
class EcrRepositoryStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id);
        // Add repositories
        props.forEach(repoProps => {
            console.log(repoProps);
            new aws_cdk_lib_1.aws_ecr.CfnPublicRepository(this, repoProps.repositoryName || '', repoProps);
        });
    }
}
new EcrRepositoryStack(app, 'ecrRepository', repos);
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUlvQjtBQUNwQix1Q0FBeUI7QUFFekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUE7QUFFckIsd0JBQXdCO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLDBIQUEwSCxDQUFBO0FBRTFJLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQTtBQUNkLFNBQVMsMEJBQTBCLENBQUMsQ0FBUztJQUN6QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUN4QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUE7SUFFckQsc0JBQXNCO0lBQ3RCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQzFCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ2pFLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRWpFLE9BQU87UUFDSCxjQUFjLEVBQUUsQ0FBQztRQUNqQixxQkFBcUIsRUFBRSxRQUFRO0tBQ2xDLENBQUE7QUFDTCxDQUFDO0FBRUQsMkJBQTJCO0FBQzNCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ25ELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0tBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUM7S0FDeEIsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFFaEQsTUFBTSxrQkFBbUIsU0FBUSxtQkFBSztJQUNsQyxZQUFZLEtBQVUsRUFBRSxFQUFVLEVBQUUsS0FBcUM7UUFDckUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVoQixtQkFBbUI7UUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3RCLElBQUkscUJBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLGNBQWMsSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDaEYsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUFFRCxJQUFJLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbkQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBIn0=