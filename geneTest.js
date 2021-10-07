const { AxieGene } = require("agp-npm/dist/axie-gene"); // Defaults to HexType.Bit256
const axieGene = new AxieGene("0x300000001d1032240c2108c20c4308c20c4330c80c6521060cc019080cc418cc");

console.log(axieGene.getGeneQuality())