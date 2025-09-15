import { NavLink } from 'react-router-dom';

type CommonProps = {
  icon: string;
  text: string;
  state?: any;
  exact?: boolean;        
  onClick?: () => void;  
  disabled?: boolean;      
  className?: string;
};

type LinkItemProps  = CommonProps & { to: string };
type PlainItemProps = CommonProps & { to?: undefined };

export type ItemProps = LinkItemProps | PlainItemProps;

export default function Item(props: ItemProps) {
  const { icon, text, className, disabled } = props;
  const base =
    `flex items-center gap-2 rounded-lg px-3 py-2 w-full text-left
     ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20'}`;

  if ('to' in props && props.to) {
    const { to, exact = false, state } = props;
    return (
      <li>
        <NavLink
          to={to}
          state={state}
          end={exact}
          className={({ isActive }) =>
            `${base} ${isActive ? '' : ''} ${className ?? ''} ${disabled ? 'pointer-events-none' : ''}`
          }
        >
          <i className={icon} />
          <span>{text}</span>
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
