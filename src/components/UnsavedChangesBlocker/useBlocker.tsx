import * as React from "react";
import history from "./History";

export function useBlocker(blocker:any, when = true): void {
  

  React.useEffect(() => {
    if (!when) return;
    const unblock = history.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [ blocker, when]);
}
