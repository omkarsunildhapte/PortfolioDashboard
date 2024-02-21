import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'About',
  },
  {
    name: 'MySelf',
    url: '/about/myself',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Education',
    url: '/about/education',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Experience',
    url: '/about/experience',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Course',
    url: '/about/course',
    iconComponent: { name: 'cil-pencil' }
  },
];
