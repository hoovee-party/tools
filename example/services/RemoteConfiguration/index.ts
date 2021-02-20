export type RemoteConfiguration = {
  color: string;
};

function createRemoteConfiguation(): Promise<RemoteConfiguration> {
  return new Promise<RemoteConfiguration>((resolve) => {
    setTimeout(() => {
      resolve({ color: "blue" });
    }, 1000);
  });
}

export default createRemoteConfiguation;
