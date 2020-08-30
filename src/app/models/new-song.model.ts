import {Deserializable} from './deserializable.model';
import { SongDescriptionModel } from './song-descrioption.model';
import { VotingSongModel } from './voting-song.model';

export class NewSongModel implements Deserializable {


nextSong: SongDescriptionModel;
votingList: Array<VotingSongModel>;

deserialize(input: any) {
    if(input.nextSong){
        this.nextSong = new SongDescriptionModel().deserialize(input.nextSong);
    }
    if(input.votingList){
        this.votingList = input.votingList.map(song => new VotingSongModel().deserialize(song));
    }
    return this;
  }

}