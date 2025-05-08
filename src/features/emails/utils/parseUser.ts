export const parseUser = (addressString: string) => {
  const search = /"(.*)" <(.*)>/.exec(addressString);
  if (!search) {
    return {
      username: addressString,
      email: undefined,
    };
  }
  return {
    username: search[1]!,
    email: search[2]!,
  };
};
