import {
  GoogleMapsLoader,
  GoogleMapsLoaderStatus,
} from "google-maps-js-api-loader";
import noop from "lodash.noop";
import { useLayoutEffect, useState } from "react";

const useGoogleMapsLoader = (options?: {
  onLoaded?(): void;
  onError?(err: Error): void;
  /**
   * if `true` - starts loading the script if it hasn't been loaded yet, otherwise just waits for the script to load
   * @default true
   */
  load?: boolean;
}) => {
  let isUnmounted: true | undefined;

  useLayoutEffect(
    () => () => {
      isUnmounted = true;
    },
    []
  );

  const [status, setStatus] = useState<GoogleMapsLoaderStatus>(() => {
    if (GoogleMapsLoader.status < 2) {
      options ||= {};

      (options.load == false
        ? GoogleMapsLoader.completion
        : GoogleMapsLoader.load()
      ).then(
        () => {
          if (!isUnmounted) {
            setStatus(2);

            (options!.onLoaded || noop)();
          }
        },
        (err) => {
          if (!isUnmounted) {
            setStatus(3);

            (options!.onError || noop)(err);
          }
        }
      );
    }

    return GoogleMapsLoader.status;
  });

  return status;
};

export { GoogleMapsLoader, GoogleMapsLoaderStatus };

export type {
  GoogleMapsLibrary,
  GoogleMapsLoaderOptions,
} from "google-maps-js-api-loader";

export default useGoogleMapsLoader;
