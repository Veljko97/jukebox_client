import {Deserializable} from './deserializable.model';

export class VotingSongModel implements Deserializable {


songId: number;
songName: string;
songVotes: number;

deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}