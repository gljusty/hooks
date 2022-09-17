import { useCallback, useEffect, useState, useDebugValue } from "react";
import * as R from "ramda";
//todo: use smaller module or only import necessary compose function from ramda

export type WaveForm<T> = {
  identity: () => T;
  compose: <X, Y>(
    f?: X | Y | void | undefined,
    g?: X | Y | void | undefined
  ) => any;
  toggle: () => boolean | void;
  phase?: () => number;
} & T;

const useWaveForm = <T, X, Y>(
  u: T,
  v?: (x?: X | Y | undefined | void) => X | Y | void,
  w?: (x?: X | Y | undefined | void) => Y | X | void,
  p?: () => number
) => {
  const [waveForm, toggleWaveForm] = useState<boolean>(true);
  const _v = useCallback(v!, [v]);
  const _w = useCallback(w!, [w]);
  const c = () => {
    return waveForm
      ? p
        ? setTimeout(() => {
            _v!();
          }, p())
        : _v!()
      : R.values(c);
  };

  c.toggle = () => toggleWaveForm((waveForm) => !waveForm);

  c.identity = () => typeof u;

  c.compose = (
    f?: (u?: X | Y | null | void) => void,
    g?: (u?: X | Y | null | void) => void
  ): any => {
    return f && g
      ? R.compose(g, f)
      : f
      ? R.compose(f, _v!)
      : w
      ? R.compose(_w!, _v!)
      : console.log(
          "Error: Missing w, f, and/or g. Check callbacks" // Please make sure you include a 2nd callback function and that it can take in a param if necessary.
        );
  };

  useEffect(() => {
    Object.assign(c, u);
  }, [u]);

  useDebugValue(c ? c() : "error: c");

  return [c];
};

export default useWaveForm;
