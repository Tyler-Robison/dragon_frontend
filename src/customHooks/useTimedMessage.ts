import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";

/** custom hook that displays a msg for a specified amount of time  */
const useTimedMessage = (millisecs: number = 4000) => {
    const [active, setActive] = useState<boolean>(false);

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

    const outputArray: [Boolean, Dispatch<SetStateAction<boolean>>] = [active, setActive]
    return outputArray
}

const useTimedMessage2 = (millisecs: number = 4000) => {
    const [active, setActive] = useState<boolean>(false);
    const timerId = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (active) {
            timerId.current = setTimeout(() => {
                setActive(false);
            }, millisecs);
            return () => clearInterval(timerId.current!);
        }
    }, [active, millisecs]

    );

    const outputArray: [Boolean, Dispatch<SetStateAction<boolean>>] = [active, setActive]
    return outputArray
}

export default useTimedMessage;