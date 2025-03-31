const defaultClassName = "";

export const Loader = ({ isLoading = true, className = defaultClassName}) => {
  return (
    <div className={className}>
      {isLoading ? (<div>"Loading..."</div>) : ({children})}
    </div>
  );
}

export default Loader;