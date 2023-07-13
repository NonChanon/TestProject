export const ProtectRoute = ({ children }: any) => {
  for (let i = 1; i <= 4; i++) {
    if (
      localStorage.getItem(`permission${i}`) === "1" ||
      localStorage.getItem(`permission${i}`) === "3"
    )
      return <div>{children}</div>;
    else return <div></div>;
  }
};
