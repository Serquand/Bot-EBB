import muteUtil from "./Mute";
import unmuteUtil from "./Unmute";

const muteTemp : (member: any, timing: any, channel: any) => void = (member: any, timing: any, channel: any) => {
    muteUtil(member, channel);
    setTimeout(() => {
        unmuteUtil(member, timing);
    }, timing * 60_000)
}

export default muteTemp;