import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../utils/connectors';

export default function useEagerConnect(): boolean {
    const { activate, active } = useWeb3React();

    const [tried, setTried] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) activate(injected, undefined, true).catch(() => setTried(true));
            else setTried(true);
        });
    }, [activate]);

    useEffect(() => {
        if (!tried && active) setTried(true);
    }, [tried, active]);

    return tried;
}
