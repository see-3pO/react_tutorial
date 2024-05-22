import styles from './Button.module.css';

interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, onClick, color }: Props) => {
  return (
    <button className={[styles.button, styles['button-' +color]].join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
