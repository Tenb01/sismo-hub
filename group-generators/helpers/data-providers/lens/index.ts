import {
  exploreProfilesQuery,
  exploreRankedProfilesQuery,
  getDefaultProfileWithEthAddressQuery,
  getFollowersCountQuery,
  getFollowersQuery,
  getProfileWithHandleQuery,
  getPublicationStatsQuery,
  getWhoCollectedPublicationQuery,
  getWhoMirroredPublicationQuery,
} from "./queries";
import {
  ExploreProfileType,
  FollowerType,
  GetFollowersType,
  GetWhoCollectedPublicationType,
  GetWhoMirroredPublicationType,
  ProfileType,
  ProfileId,
  PublicationId,
  Wallet,
} from "./types";
import { EnsProvider } from "@group-generators/helpers/data-providers/ens";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";
import console from "console";

export class LensProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }

  public async getFollowers(profileId: ProfileId): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getFollowers(profileId)) {
      dataProfiles[item.wallet.address] = 1;
    }
    return dataProfiles;
  }

  public async getFollowersCount(profileId: ProfileId): Promise<number> {
    const resolvedProfileId = await this._getProfileIdFromAnySources(
      profileId.profileId
    );
    const lensFollowers = await getFollowersCountQuery(this, resolvedProfileId);
    return lensFollowers.profile.stats.totalFollowers;
  }

  public async getWhoCollectedPublication(
    publication: PublicationId
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getWhoCollectedPublication(publication)) {
      dataProfiles[item.address] = 1;
    }
    return dataProfiles;
  }

  public async getPublicationCollectorsCount(
    publication: PublicationId
  ): Promise<number> {
    const publicationStats = await getPublicationStatsQuery(
      this,
      publication.publicationId
    );
    return publicationStats.publication.stats.totalAmountOfCollects;
  }

  public async getWhoMirroredPublication(
    publication: PublicationId
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getWhoMirroredPublication(publication)) {
      dataProfiles[item.ownedBy] = 1;
    }
    return dataProfiles;
  }

  public async getPublicationMirrorsCount(
    publication: PublicationId
  ): Promise<number> {
    const publicationStats = await getPublicationStatsQuery(
      this,
      publication.publicationId
    );
    return publicationStats.publication.stats.totalAmountOfMirrors;
  }

  private async *_getFollowers({
    profileId,
  }: ProfileId): AsyncGenerator<FollowerType, void, undefined> {
    let cursor = "";
    let lensFollowers: GetFollowersType;

    const resolvedProfileId = await this._getProfileIdFromAnySources(profileId);

    do {
      lensFollowers = await getFollowersQuery(this, resolvedProfileId, cursor);
      yield* lensFollowers.followers.items;
      cursor = lensFollowers.followers.pageInfo.next;
    } while (lensFollowers.followers.items.length > 0);
  }

  public async getProfiles(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const globalProfileChunks = [];
    let profileChunks = [];
    let j = 0;
    for (let i = 0; i <= 120000; i += 50) {
      const chunk = "{\"offset\":"+i+"}";
      profileChunks.push(chunk);
      if(i == 500 || i == j+500) {
        j = i;
        globalProfileChunks.push(profileChunks);
        profileChunks = [];
      }
    }

    const retryRequest = async (cursor: string, numberOfRetry=5) => {
      let i;
      for (i = 0; i < numberOfRetry; i++) {
        try {
          return await this.exploreProfiles(cursor);
        } catch (error) {
          console.log(error);
          await new Promise((resolve: any) => setTimeout(resolve, 1000))
        }
      }
      if(i == numberOfRetry) {
        throw new Error('Max retry reached: cursor=' + cursor);
      }
    }

    for (const profileChunks of globalProfileChunks) {
      console.log(profileChunks[0]);
      const prom = profileChunks.map(chunk => retryRequest(chunk));
      await Promise.all(prom).then(profiles => {
        for (const profile of profiles) {
          if(profile == null || profile.exploreProfiles == null || profile.exploreProfiles.items == null) {
            return dataProfiles;
          }
          // if(profile == undefined || profile.exploreProfiles == undefined || profile.exploreProfiles.items == undefined) {
          //   return dataProfiles;
          // }
          // console.log(profile);
          // console.log(profile.exploreProfiles);
          // console.log(profile.exploreProfiles.items);
          // if(chunk === "{\"offset\":106000}"){
          //   console.log(profile);
          //   console.log(profile.exploreProfiles);
          //   console.log(profile.exploreProfiles.items);
          // }
          for (const item of profile.exploreProfiles.items) {
            dataProfiles[item.ownedBy] = 1;
          }
        }
      }).catch(error => console.log(error));
    }

    return dataProfiles;
  }

  public async exploreProfiles(cursor: string): Promise<ExploreProfileType> {
    return await exploreProfilesQuery(this, cursor);
  }

  public async *exploreProfilesWithMaxRank(
    maxRank: number
  ): AsyncGenerator<ProfileType, void, undefined> {
    let cursor = "";
    let counter = 0;
    let lensProfiles: ExploreProfileType;
    do {
      lensProfiles = await exploreRankedProfilesQuery(this, cursor);
      yield* lensProfiles.exploreProfiles.items;
      cursor = lensProfiles.exploreProfiles.pageInfo.next;
      counter++;
    } while (counter < maxRank / 50);
  }

  private async *_getWhoCollectedPublication({
    publicationId,
  }: PublicationId): AsyncGenerator<Wallet, void, undefined> {
    let cursor = "";
    let lensCollectors: GetWhoCollectedPublicationType;
    do {
      lensCollectors = await getWhoCollectedPublicationQuery(
        this,
        publicationId,
        cursor
      );
      yield* lensCollectors.whoCollectedPublication.items;
      cursor = lensCollectors.whoCollectedPublication.pageInfo.next;
    } while (lensCollectors.whoCollectedPublication.items.length > 0);
  }

  private async *_getWhoMirroredPublication({
    publicationId,
  }: PublicationId): AsyncGenerator<ProfileType, void, undefined> {
    let cursor = "";
    let lensMirrorers: GetWhoMirroredPublicationType;
    do {
      lensMirrorers = await getWhoMirroredPublicationQuery(
        this,
        publicationId,
        cursor
      );
      yield* lensMirrorers.profiles.items;
      cursor = lensMirrorers.profiles.pageInfo.next;
    } while (lensMirrorers.profiles.items.length > 0);
  }

  public async *getProfileWithHandles(
    handles: string[]
  ): AsyncGenerator<ProfileType, void, undefined> {
    for (const handle of handles) {
      const profile = await getProfileWithHandleQuery(this, handle);
      yield profile.profile;
    }
  }

  private async _getDefaultProfileWithEthAddress(
    ethereumAddress: string
  ): Promise<ProfileType> {
    const response = await getDefaultProfileWithEthAddressQuery(
      this,
      ethereumAddress
    );
    return response.defaultProfile;
  }

  /**
   * Use this method to resolve a lens profile id from either an ethereum address, a lens profile id, a lens handle, a ens name.
   * @param input A string from either a ethereum address, a lens profile id, a lens handle, a ens name.
   * @returns The lens profile id as a string.
   */
  public async _getProfileIdFromAnySources(input: string): Promise<string> {
    try {
      // Check if input is a valid eth address
      if (input.match(/^0x[a-fA-F0-9]{40}$/g)) {
        const profile = await this._getDefaultProfileWithEthAddress(input);
        if (profile?.id) {
          return profile.id;
        } else {
          throw new Error("No profile found for this ethereum address");
        }
      }
      // Check if input is a valid lens profile id
      if (input.match(/^0x[a-fA-F0-9]{0,39}$/g)) {
        return input;
      }
      // Check if input is a valid lens handle
      if (input.includes(".lens")) {
        const response = await getProfileWithHandleQuery(this, input);
        if (response?.profile?.id) {
          return response.profile.id;
        } else {
          throw new Error("No profile found for this Lens handle");
        }
      }
      // Check if input is a valid ens name
      if (input.includes(".eth")) {
        const ensProvider = new EnsProvider();
        const ethAddress = await ensProvider.resolveEnsFromJsonRpc(input);
        const profile = await this._getDefaultProfileWithEthAddress(ethAddress);

        if (profile?.id) {
          return profile.id;
        } else {
          throw new Error("No profile found for this ENS");
        }
      } else {
        throw new Error("Invalid input format");
      }
    } catch (err) {
      throw new Error("Invalid input");
    }
  }
}
