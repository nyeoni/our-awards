import { Grid } from '@mui/material';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <main css={main_wrapper}>{children}</main>;
};

const main_wrapper = css`
  display: flex;
`;

export default Wrapper;
