import {Deserializable} from './deserializable.model';

export class SongDescriptionModel implements Deserializable {


songId: number;
timestamp: number;
name: string;
songCurrentSample: number;
songMaxSample: number;
sampleRate: number;

deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
