interface HeaderProps {
  user: Record<string, unknown>;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div>
      <span className="mr-1">Hi:</span>
      <span>{String(user.name)}</span>
    </div>
  );
};

export default Header;
