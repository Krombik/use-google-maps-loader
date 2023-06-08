import {
  GoogleMapsLoader,
  GoogleMapsLoaderStatus,
} from "google-maps-js-api-loader";
import noop from "lodash.noop";
import { useLayoutEffect, useState } from "react";

export type UseGoogleMapsLoaderOptions = {
  onLoaded?(): void;
  onError?(err: Error): void;
  /**
   * if `true` - starts loading the script if it hasn't been loaded yet, otherwise just waits for the script to load
   * @default true
   */
  load?: boolean;
};

const useGoogleMapsLoader = (options?: UseGoogleMapsLoaderOptions) => {
  const [status, setStatus] = useState(GoogleMapsLoader.status);

  useLayoutEffect(() => {
    if (status < 2) {
      let isAlive = true;

      options ||= {};

      (options.load == false
        ? GoogleMapsLoader.completion
        : GoogleMapsLoader.load()
      ).then(
        () => {
          if (isAlive) {
            setStatus(2);

            (options!.onLoaded || noop)();
          }
        },
        (err) => {
          if (isAlive) {
            setStatus(3);

            (options!.onError || noop)(err);
          }
        }
      );

      return () => {
        isAlive = false;
      };
    }
  }, []);

  return status;
};

export { GoogleMapsLoader, GoogleMapsLoaderStatus };

export type {
  GoogleMapsLibrary,
  GoogleMapsLoaderOptions,
} from "google-maps-js-api-loader";

export default useGoogleMapsLoader;
