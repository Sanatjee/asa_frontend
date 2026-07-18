import  useAuth  from '../hooks/useAuth';

const Permission = ({
  permission,
  children,
}) => {
  const { hasPermission } = useAuth();

  return hasPermission(
    permission
  )
    ? children
    : null;
};

export default Permission;