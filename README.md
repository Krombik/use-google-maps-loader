# use-google-maps-loader

A React hook for loading the Google Maps JavaScript API using the [google-maps-js-api-loader](https://github.com/Krombik/google-maps-loader) library.

## Example

```tsx
import useGoogleMapsLoader, {
  GoogleMapsLoader,
  GoogleMapsLoaderStatus,
} from "use-google-maps-loader";

GoogleMapsLoader({ key: API_KEY });

const Component = () => {
  const status = useGoogleMapsLoader();

  if (status === GoogleMapsLoaderStatus.LOADED) {
    return <div>Google maps successfully loaded</div>;
  }

  return null;
};
```

## API

### useGoogleMapsLoader

```ts
const useGoogleMapsLoader: (options?: {
  onLoaded?(): void;
  onError?(err: Error): void;
  /**
   * if `true` - starts loading the script if it hasn't been loaded yet, otherwise just waits for the script to load
   * @default true
   */
  load?: boolean;
}) => GoogleMapsLoaderStatus;
```

Hook for google maps script loading

> Don't forgot to set options to `GoogleMapsLoader`, like in [example](#example)

> You can use [GoogleMapsLoader.load](https://github.com/Krombik/google-maps-loader#load) if you need "silent" loading or loading outside of react.

---

## License

MIT © [Krombik](https://github.com/Krombik)
