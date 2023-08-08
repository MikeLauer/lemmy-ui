import { isBrowser } from "@utils/browser";
import { getSecure } from "@utils/env";

export default function substituteImageUrl(src: string): string {

    /**
     * TODO: Is there a way to get the instance domain in the frontend?
     */
    const instance = "postit.quantentoast.de"

    // Don't substitute federated/foreign links
    if (src.startsWith('https://' + instance + '/pictrs/image/') == false)
        return src

    const split = src.split("/pictrs/image/");
    // If theres not multiple, then its not a pictrs image
    if (split.length === 1) {
        return src;
    }

    let hostname = ""
    if (isBrowser()) {
        hostname = window.location.host
    } else {
        hostname = process.env.LEMMY_UI_LEMMY_EXTERNAL_HOST
    }

    const proto = "http" + getSecure() + "://"
    const parameter = "/pictrs/image/" + split[1];
    const uri = proto + hostname + parameter
    return uri
}