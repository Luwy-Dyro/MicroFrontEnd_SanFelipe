import { NavLink } from 'react-router-dom';

type CommonProps = {
  icon: string;
  text: string;
  state?: any;
  exact?: boolean;        
  onClick?: () => void;  
  disabled?: boolean;
  hover?: boolean;        
  className?: string;
};

type LinkItemProps  = CommonProps & { to: string };
type PlainItemProps = CommonProps & { to?: undefined };

export type ItemProps = LinkItemProps | PlainItemProps;

export default function Item(props: ItemProps) {
  const { icon, text, className, disabled, hover } = props;
  // const base = `
  //   relative overflow-hidden group z-0 flex items-center gap-2 rounded-r-lg px-5 py-3 w-full text-left border-transparent border-l-4 border-0
  //   before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-blue-600/60
  //   before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:border-l-csf-verde group-hover:before:scale-x-100 transition-all duration-300 ease-in-out
  //   ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  //   ${hover ? 'hover:border-l-csf-verde group-hover:before:scale-x-100 transition-all duration-300 ease-in-out' : ''}`;
  const base = `
  relative overflow-hidden group z-0 flex items-center gap-2 rounded-r-lg px-5 py-3 w-full text-left 
  border-transparent border-l-4 border-0 hover:border-l-csf-verde hover:bg-b hover:bg-blue-600/60 transition-all duration-300 ease-in-out
`;
  if ('to' in props && props.to) {
    const { to, exact = false, state } = props;
    return (
      <li>
        <NavLink
          to={to}
          state={state}
          end={exact}
          className={({ isActive }) =>
            `${base} ${isActive ? '' : ''} ${className ?? ''} ${disabled ? 'pointer-events-none' : ''} `
          }
        >
          <i className={`${icon} relative z-10`} />
          <span className='relative z-10'>{text}</span>
        </NavLink>
      </li>
    );
  }

  
  return (
    <li>
      <button
        type="button"
        onClick={props.onClick}
        disabled={disabled}
        className={`${base} ${className ?? ''}`}
      >
        <i className={icon} />
        <span>{text}</span>
      </button>
    </li>
  );
}
