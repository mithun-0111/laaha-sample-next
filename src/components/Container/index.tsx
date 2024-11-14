type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children } : Props) => (
  <div className={`container ${className ? className : ''}`}>{children}</div>
);

export default Container;
