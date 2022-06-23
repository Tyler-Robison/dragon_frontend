import { useState, useEffect, Dispatch, SetStateAction } from "react";

 /** custom hook that displays a msg for a specified amount of time  */
const useTimedMessage = (millisecs: number = 4000) => {
    const [active, setActive] = useState<Boolean>(false);

    useEffect(
        function showSavedMessage() {
            if (active) {
                setTimeout(function removeMessage() {
                    setActive(false);
                }, millisecs);
            }
        },
        [active, millisecs]

    );

    const outputArray: [Boolean, Dispatch<SetStateAction<Boolean>>] = [active, setActive]
    return outputArray
}

export default useTimedMessage;