import { Button, Group } from "@mantine/core";
import { useAuthService } from "../hooks/useAuthRoles";

const Header = () => {
  const { user, handleLogout } = useAuthService();
  return (
    <Group position="apart">
      <h1>Welcome {user?.name}</h1>
      <Button color="red" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </Group>
  );
};

export default Header;
