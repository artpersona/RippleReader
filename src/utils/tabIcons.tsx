import BillingIcon from '../assets/svg/tab_icons/billing.svg';
import HomeIcon from '../assets/svg/tab_icons/home.svg';
import UserIcon from '../assets/svg/tab_icons/user.svg';
import SettingsIcon from '../assets/svg/tab_icons/settings.svg';
const ICON_SIZE = 20;

export const tabIcons = {
  Home: (color: string) => (
    <HomeIcon fill={color} width={ICON_SIZE} height={ICON_SIZE} />
  ),
  Profile: (color: string) => (
    <UserIcon fill={color} width={ICON_SIZE} height={ICON_SIZE} />
  ),
  Billing: (color: string) => (
    <BillingIcon fill={color} width={ICON_SIZE} height={ICON_SIZE} />
  ),
  More: (color: string) => (
    <SettingsIcon fill={color} width={ICON_SIZE} height={ICON_SIZE} />
  ),
};
