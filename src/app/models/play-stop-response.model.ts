import { Deserializable } from './deserializable.model';

export class PlayStopResponseModel implements Deserializable {

    isPlaying: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
