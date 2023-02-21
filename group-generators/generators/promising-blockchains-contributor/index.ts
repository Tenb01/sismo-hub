
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "aptos-labs/aptos-core", "mystenlabs/sui" ],
    });

+ const jsonListData1 = {
+  "0x708796e46B7204FbBDa072FE6980991F1B99C392": "1",
+  "0x14ff0bc9417b6796f79768729002a793b51205b8": "1",
+  "0x0b833666706f6a77b1e28077882e35201072605f": "1",
+  "0x0d6e94d085a597f316be1833649e05a45103e873": "1",
+  "0x1b7a0da1d9c63d9b8209fa5ce98ac0d148960800": "1",
+  "0x0a6a6b05a7ae2dfc140d7999c5ae08a5bf171053": "1",
+  "0x2300f68064bfaafa381cd36f2695cdfeaac09231": "1",
+  "0x9e4295de9d09de1e75e1d2ff369f27237ca46de8": "1",
+  "0xa561a833a904b5fc777764ad993b7688dfcc07f4": "1",
+  "0x53618fa426688be0dead4cd9116518d4f319b243": "1",
+  "0x1028e9f9bc8bce25eb476fc08c8bcf4ea9222cda": "1",
+  "0x907b332f4d2190027b115224a0ba7c8ef9f30273": "1",
+  "0x867df8ae5fbe11bdeb0c6ca5f116dbb8a57b51d3": "1",
+  "0x7d64e59464430bff5ca2d2d4a9643ca59e66bda9": "1",
+  "0x1a5f8687ae4290c21c867c8e09496c4a83f9e981": "1",
+  "0x93f71ded1c6ceb67c121306494f68580327cf3ec": "1",
+  "0x9de2ff856d00941f328edbc58f0ba3fff10f6116": "1",
+  "0x38d24dc0a7d2e703bfce8b42ff736b8d9f2a15a9": "1",
+  "0x9C53a8C73B0C7D52Af2f0FA6180a9349d11c748b": "1",
+  "0x4b84C7ddC8c295FB3d2bfDe393B17D1c2e2Bd17d": "1",
+  "0x30A6a0931195EC35aeEA531E74015a959CA73f9e": "1",
+  "0xcF9225A613a03D405A1b8182FfCDEF9682fb59EC": "1",
+  "0x79D6b65b48651D4D03cbe42Ca0B55C567593e67F": "1",
+  "0x23b4c21e96BB213C1563F6f189131A570BA94718": "1",
+  "0xc1377ebD880217969d662C23067Ca9F1674163f0": "1",
+  "0xF11C19Ae9390392763Ed8E4c51BA4055e7C7C6f3": "1",
+  "0x12Ed17d0061C89362A1fd0ba9aA960d68B97bD79": "1",
+  "0x34b049931A5F75Aa77A1efc2A26c0B3cc03b85ab": "1",
+  "0x79ce80e90bd630b0d98e99a66ac74a951391b7b1": "1",
+  "0x1252cE90ad6a743ce9dddF41CB99d6319750d769": "1",
+  "0xB5dF4f3AE95bEF6Ec11484f4CD8a6c5f939B2D55": "1",
+  "0xc22Fa161047135dD0A0bAd933e85c20020B69023": "1",
+  "0x4B192cA3BFdD9b27ef9D26b56d366842fBc813C4": "1",
+  "0x45E1050507038A3773e3b4d4697330E58238BF86": "1",
+  "0xFF6f8Df2Ee37B5a3835acE99F3Fe04f5dc40638E": "1",
+  "0xB07de04404ABccdaDb5c12A4Ee00cB3b48A786C2": "1",
+  "0x85332be5e648e37a6470e0e7cbf73df41852c7d6": "1",
+  "0x0B72E905eD48beb207eC29bFac83b2b0Bc6f56f2": "1",
+  "0x1028e9f9bC8Bce25eb476FC08c8BCF4Ea9222CDA": "1",
+  "0xD512e0AeeA0228a35253ECE18e40192E434C61fd": "1",
+  "0x49d1978DCe1a788A0e33Ac59C004e5fEe4093e95": "1",
+  "0x9eB47A8C7D1fC465739597E6Ac46b2E86d736d76": "1",
+  "0x09e3Ab1Ce8126bc411d7132cb4673409a60023cD": "1",
+  "0x2Fea9De9fC21Fbd56D42Cf4dEA594E3E8F8287a6": "1",
+  "0xC5b1ddB34cB01E3CA9Ae6dd7cD90DFf5606cb508": "1",
+  "0x3FE0401E6758C5e0EC8c3EDa6bd85127E81124Ac": "1",
+  "0x48a0096B26fe285138b294aFe0Eb1DD705071dcA": "1",
+  "0xDf2eaf037782Dd5a32b01AAed579e3AA94eE8575": "1",
+  "0x58113f3a846B4BC21330Bc49b71fFAF0dd029eda": "1",
+  "0x7465a22BA37d72eD2995BE8D5e94AB1A39338F30": "1",
+  "0xE398DE8393e15714BdD173Df9D8cf38546cdCBAD": "1",
+  "0xB4f43c8c869928b09Af69F42e055934aF21a04CF": "1",
+  "0xEE64a3e1088f9804c35346D3dE477c3133dFeBff": "1",
+  "0x532744d3ee047210Bde929fac52751739784aB42": "1",
+  "0xf85ceCcFe2112E88be58162C43f5Ec959672AB54": "1",
+  "0x2Ba9B338a883621f3ebE882251a8Ff0A6612B9F6": "1",
+  "0xa93d1fBeeE5E8ECE6be862Ab3bC65F643158b103": "1",
+  "0x0fb20260d3E8b9D3023Ca3A5d3423Da7C316e6a8": "1",
+  "0x50Cb26A76c60A20e29e560ECD35A2C4cea59fb65": "1",
+  "0x374acc8f1b7e115b34cecb7edf84ec468e79e994": "1",
+  "0x1111a00ded4e8a1858dd44a96c978478dfe9b191": "1",
+  "0x2984f446e87c916b20497260eea3144f82781ea6": "1",
+  "0x7c3deb993d4b150630540753920659717fd808ea": "1",
+    };
+
   return [
      {
        name: "promising-blockchains-contributor",
        timestamp: context.timestamp,
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
