export const ProtectRoute = ({ children }: any) => {
  if (localStorage.role == "ADMIN") {
    return <div>{children}</div>;
  } else return <div></div>;
};
