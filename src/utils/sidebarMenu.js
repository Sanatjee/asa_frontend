const sidebarMenu = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'bx bx-home-circle',
    permission: 'dashboard.view',
  },
  {
    title: 'Chats',
    path: '/chats',
    icon: 'bx bx-book-content',
    permission: 'chat.view',
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'bx bx-user',
    permission: 'user.view',
  },
  {
    title: 'Roles & Permissions',
    path: '/roles-and-permissions',
    icon: 'bx bx-shield-quarter',
    permission: 'role.permission.manage',
  },
];

export default sidebarMenu;